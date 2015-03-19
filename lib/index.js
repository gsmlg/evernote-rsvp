"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Evernote = require("evernote").Evernote;

var Promise = require("rsvp").Promise;

var _ = _interopRequire(require("underscore"));

var NoteApi = (function () {
    function NoteApi(options) {
        _classCallCheck(this, NoteApi);

        this.token = options.token;
        this.serviceHost = options.serviceHost;
        this.client = new Evernote.Client(options);
        this.userStore = this.client.getNoteStore();
        this.noteStore = this.client.getNoteStore();
    }

    _createClass(NoteApi, {
        listNotebooks: {
            value: function listNotebooks() {
                var that = this;
                return new Promise(function (resolve, reject) {
                    that.noteStore.listNotebooks(function (e, notebooks) {
                        if (e) {
                            return reject(e);
                        } else {
                            return resolve(notebooks);
                        }
                    });
                });
            }
        },
        listNotesByNotebook: {
            value: function listNotesByNotebook(guid) {
                var that = this;
                var filter = new Evernote.NoteFilter();
                var resultSpec = new Evernote.NoteStore_findNotesMetadata_result();
                return new Promise(function (resolve, reject) {
                    filter.notebookGuid = guid;
                    that.noteStore.findNotesMetadata(that.token, filter, 0, 9999, resultSpec, function (e, data) {
                        if (e) {
                            return reject(e);
                        } else {
                            return resolve(data);
                        }
                    });
                });
            }
        },
        listTagsByNotebook: {
            value: function listTagsByNotebook(guid) {
                var that = this;
                return new Promise(function (resolve, reject) {
                    that.noteStore.listTagsByNotebook(that.token, guid, function (e, data) {
                        if (e) {
                            console.error("%s %s", e, e.stack);
                            return reject(e);
                        } else {
                            return resolve(data);
                        }
                    });
                });
            }
        },
        findNotes: {
            value: function findNotes(attrs) {
                var offset = arguments[1] === undefined ? 0 : arguments[1];
                var limit = arguments[2] === undefined ? 30 : arguments[2];

                var that = this;
                var filter = new Evernote.NoteFilter();
                var resultSpec = new Evernote.NoteStore_findNotesMetadata_result();
                return new Promise(function (resolve, reject) {
                    _.extend(filter, attrs);
                    that.noteStore.findNotesMetadata(that.token, filter, offset, limit, resultSpec, function (e, data) {
                        if (e) {
                            return reject(e);
                        } else {
                            return resolve(data);
                        }
                    });
                });
            }
        },
        getNote: {
            value: function getNote(guid, withContent, withResourcesData, withResourcesRecognition, withResourcesAlternateData) {
                var that = this;
                return new Promise(function (resolve, reject) {
                    that.noteStore.getNote(that.token, guid, withContent, withResourcesData, withResourcesRecognition, withResourcesAlternateData, function (e, data) {
                        if (e) {
                            return reject(e);
                        } else {
                            return resolve(data);
                        }
                    });
                });
            }
        },
        getTag: {
            value: function getTag(guid) {
                var that = this;
                return new Promise(function (resolve, reject) {
                    that.noteStore.getTag(that.token, guid, function (e, data) {
                        if (e) {
                            return reject(e);
                        } else {
                            return resolve(data);
                        }
                    });
                });
            }
        }
    });

    return NoteApi;
})();

module.exports = NoteApi;