(function () {
  var MOCK_HOST = "http://localhost:3939";
  var _nextPrompts = {};
  var _convIdSeq = 100;
  var _msgIdSeq = 1000;
  var _idbStore = {};
  var _localStore = {};
  var _sessionStore = {};

  function post(path, body) {
    return fetch(MOCK_HOST + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : "{}"
    }).then(function (r) { return r.json(); }).then(function (r) {
      return r.data !== undefined ? r.data : r;
    });
  }

  function sseStream(path, body) {
    var cb = { onmsg: null, ondone: null, onerr: null };

    fetch(MOCK_HOST + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : "{}"
    }).then(function (res) {
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = "";

      function pump() {
        return reader.read().then(function (result) {
          if (result.done) {
            if (cb.ondone) cb.ondone("", 0);
            return;
          }
          buffer += decoder.decode(result.value, { stream: true });
          var lines = buffer.split("\n");
          buffer = lines.pop() || "";
          var currentEvent = "";

          for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.indexOf("event:") === 0) {
              currentEvent = line.substring(6).trim();
            } else if (line.indexOf("data:") === 0) {
              var raw = line.substring(5).trim();
              var parsed = {};
              try { parsed = JSON.parse(raw); } catch (e) { parsed = { content: raw }; }

              if (currentEvent === "done") {
                if (cb.ondone) cb.ondone(parsed.content || "", parsed.id || 0, parsed.extra);
              } else if (currentEvent === "error") {
                if (cb.onerr) cb.onerr(parsed.content || "error");
              } else {
                if (cb.onmsg) cb.onmsg(parsed.content || "");
              }
              currentEvent = "";
            }
          }
          return pump();
        });
      }

      pump();
    }).catch(function (e) {
      if (cb.onerr) cb.onerr(e.message || "fetch failed");
    });

    return cb;
  }

  function idbKey(db, key) { return db + "::" + key; }

  var bridge = {
    conversation: {
      list: function () {
        return post("/api/conversation2/list", { roleId: 1 }).then(function (d) {
          return Array.isArray(d) ? d : [];
        });
      },
      open: function (id) {
        if (id) {
          return Promise.resolve({
            convId: id,
            messages: [
              { id: _msgIdSeq++, role: "assistant", content: "Mock opening message" }
            ],
            last: null
          });
        }
        var newId = ++_convIdSeq;
        return Promise.resolve({ convId: newId, messages: [], last: null });
      },
      rename: function () { return Promise.resolve(); },
      delete: function () { return Promise.resolve(); },
      fork: function () { return Promise.resolve({ id: ++_convIdSeq }); }
    },

    message: {
      send: function (text, model, convId) {
        var useStream = model && model.stream;
        if (useStream) {
          return sseStream("/api/chat2/completions/stream", {
            roleId: 1, content: text, modelId: (model && model.id) || 1,
            conversationId: convId || 1, userId: 1, maxToken: (model && model.token) || 4096
          });
        }
        return post("/api/chat2/completions", {
          roleId: 1, content: text, modelId: (model && model.id) || 1,
          conversationId: convId || 1, userId: 1, maxToken: (model && model.token) || 4096
        }).then(function (d) {
          return {
            id: (d && d.id) || _msgIdSeq++,
            role: "assistant",
            content: (d && d.content) || "Mock reply to: " + text
          };
        });
      },
      edit: function (id, text, regenerate) {
        if (regenerate) {
          return sseStream("/api/message2/regenerate/stream", {
            id: id, roleId: 1, conversationId: 1, modelId: 1
          });
        }
        return post("/api/message2/edit", { id: id, content: text });
      },
      delete: function (id) {
        return post("/api/message2/delete", { id: id });
      },
      regenerate: function (id, stream) {
        if (stream) {
          return sseStream("/api/message2/regenerate/stream", {
            id: id, roleId: 1, conversationId: 1, modelId: 1
          });
        }
        return post("/api/message2/regenerate", { id: id }).then(function (d) {
          return {
            id: (d && d.id) || _msgIdSeq++,
            role: "assistant",
            content: (d && d.content) || "Regenerated reply"
          };
        });
      },
      history: function () {
        return post("/api/message2/history", { roleId: 1, conversationId: 1, page: 1, size: 50 }).then(function (d) {
          return (d && d.list) ? d.list.map(function (m) {
            return { id: m.id, role: m.direction === "send" ? "user" : "assistant", content: m.content };
          }) : [];
        });
      }
    },

    role: {
      query: function () {
        return post("/api/role/query", { id: 1 }).then(function (d) {
          if (!d) return { id: 1, name: "Mock Role" };
          return {
            id: d.id || 1,
            name: d.name || "Mock Role",
            avatar: d.avatar || "",
            beginning: d.openingMessage || "",
            roleDesc: d.description || "",
            prologue: [
              { title: "Say hello", content: "Hello!" },
              { title: "Tell a story", content: "Tell me a story" }
            ]
          };
        });
      }
    },

    model: {
      list: function () {
        return post("/api/model/list").then(function (d) {
          if (!Array.isArray(d)) return [{ id: 1, name: "Mock-GPT", type: "ChatGPT", enableStream: 1, maxToken: 4096 }];
          return d.map(function (m) {
            return {
              id: m.id, name: m.name, type: "ChatGPT",
              enableStream: 1, maxToken: m.maxToken || 4096,
              maxTokenList: [{ maxToken: m.maxToken || 4096 }]
            };
          });
        });
      },
      select: function () {}
    },

    session: {
      init: function () {
        return Promise.all([
          bridge.model.list(),
          bridge.role.query()
        ]).then(function (arr) {
          return { models: arr[0], role: arr[1], context: { roleId: 1, convId: 1, modelId: 1 } };
        });
      },
      get: function () {
        return {
          roleId: 1,
          convId: 1,
          modelId: 1,
          device: {
            width: window.innerWidth,
            height: window.innerHeight,
            dpr: window.devicePixelRatio || 1,
            type: window.innerWidth < 768 ? "mobile" : "pc",
            browser: navigator.userAgent,
            darkMode: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
          }
        };
      }
    },

    prompt: {
      next: {
        add: function (key, value) { _nextPrompts[key] = value; },
        get: function () { return Object.assign({}, _nextPrompts); },
        remove: function (key) { delete _nextPrompts[key]; }
      }
    },

    storage: {
      idb: {
        get: function (db, key) {
          return Promise.resolve(_idbStore[idbKey(db, key)] || null);
        },
        put: function (db, key, value) {
          _idbStore[idbKey(db, key)] = value;
          return Promise.resolve();
        },
        remove: function (db, key) {
          delete _idbStore[idbKey(db, key)];
          return Promise.resolve();
        },
        getAll: function (db) {
          var prefix = db + "::";
          var result = [];
          for (var k in _idbStore) {
            if (k.indexOf(prefix) === 0) result.push(_idbStore[k]);
          }
          return Promise.resolve(result);
        },
        count: function (db) {
          return bridge.storage.idb.getAll(db).then(function (a) { return a.length; });
        },
        keys: function (db) {
          var prefix = db + "::";
          var result = [];
          for (var k in _idbStore) {
            if (k.indexOf(prefix) === 0) result.push(k.substring(prefix.length));
          }
          return Promise.resolve(result);
        },
        deleteDb: function (db) {
          var prefix = db + "::";
          for (var k in _idbStore) {
            if (k.indexOf(prefix) === 0) delete _idbStore[k];
          }
          return Promise.resolve();
        }
      },
      localStorage: {
        setItem: function (key, value) {
          _localStore[key] = value;
          return Promise.resolve();
        },
        getItem: function (key) {
          return Promise.resolve(_localStore[key] || null);
        },
        removeItem: function (key) {
          delete _localStore[key];
          return Promise.resolve();
        },
        length: function () {
          return Promise.resolve(Object.keys(_localStore).length);
        },
        clear: function () {
          _localStore = {};
          return Promise.resolve();
        }
      },
      sessionStorage: {
        setItem: function (key, value) {
          _sessionStore[key] = value;
          return Promise.resolve();
        },
        getItem: function (key) {
          return Promise.resolve(_sessionStore[key] || null);
        },
        removeItem: function (key) {
          delete _sessionStore[key];
          return Promise.resolve();
        }
      },
      opfs: {
        write: function () { return Promise.resolve(); },
        read: function () { return Promise.resolve(""); },
        stat: function () { return Promise.resolve(null); },
        delete: function () { return Promise.resolve(); },
        mkdir: function () { return Promise.resolve(); },
        list: function () { return Promise.resolve([]); }
      }
    },

    save: {
      upload: function () { return Promise.resolve({ ok: true }); },
      download: function () { return Promise.resolve(null); },
      list: function () { return Promise.resolve([]); }
    },

    cache: {
      clear: function () { return Promise.resolve(true); }
    },

    kag: {
      getMergedIds: function () { return Promise.resolve([]); },
      backfillMsg: function () { return Promise.resolve({ merged: false }); }
    },

    clipboard: {
      write: function (text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(text).then(function () { return true; });
        }
        return Promise.resolve(false);
      }
    },

    setting: {
      open: function () { console.log("[mock] setting.open called"); }
    },

    worker: {
      create: function (code) {
        var blob = new Blob([code], { type: "application/javascript" });
        var url = URL.createObjectURL(blob);
        var w = new Worker(url);
        var wrapper = {
          onmessage: null,
          postMessage: function (d) { w.postMessage(d); },
          terminate: function () { w.terminate(); URL.revokeObjectURL(url); return Promise.resolve(); }
        };
        w.onmessage = function (e) { if (wrapper.onmessage) wrapper.onmessage(e.data); };
        return Promise.resolve(wrapper);
      }
    },

    flush: function () { return Promise.resolve(true); },
    close: function () { return Promise.resolve(); },

    _meta: {
      version: "0.0.0-mock",
      cdnPrefix: "https://cdn.mock.local",
      hash: "mock",
      time: new Date().toISOString()
    }
  };

  window.OCS = bridge;
  window.AC_Bridge = bridge;
  window.AC = { VERSION: "0.0.0-mock", BUILD_HASH: "mock", BUILD_TIME: new Date().toISOString() };
})();
