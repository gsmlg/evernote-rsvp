import {Evernote} from 'evernote';
import {Promise} from 'rsvp';
import _ from 'underscore';

export default class NoteApi {
    constructor (options) {
        this.token = options.token;
        this.serviceHost = options.serviceHost;
        this.client = new Evernote.Client(options);
        this.userStore = this.client.getNoteStore();
        this.noteStore = this.client.getNoteStore();
    }

    listNotebooks () {
        var that = this;
        return new Promise(function(resolve, reject){
            that.noteStore.listNotebooks(function(e, notebooks){
                if (e) {
                    return reject(e);
                } else {
                    return resolve(notebooks);
                }
            });
        });
    }

    listNotesByNotebook (guid) {
        var that = this;
        var filter = new Evernote.NoteFilter();
        var resultSpec = new Evernote.NoteStore_findNotesMetadata_result();
        return new Promise(function(resolve, reject){
            filter.notebookGuid = guid;
            that.noteStore.findNotesMetadata(that.token, filter, 0, 9999, resultSpec, function(e, data){
                if (e) {
                    return reject(e);
                } else {
                    return resolve(data);
                }
            });
        });
    };

    listTagsByNotebook (guid) {
        var that = this;
        return new Promise(function(resolve, reject){
            that.noteStore.listTagsByNotebook(that.token, guid, function(e, data){
                if (e) {
                    console.error('%s %s', e, e.stack);
                    return reject(e);
                } else {
                    return resolve(data);
                }
            });
        });
    };

    findNotes (attrs, offset = 0, limit = 30) {
        var that = this;
        var filter = new Evernote.NoteFilter();
        var resultSpec = new Evernote.NoteStore_findNotesMetadata_result();
        return new Promise(function(resolve, reject){
            _.extend(filter, attrs);
            that.noteStore.findNotesMetadata(that.token, filter, offset, limit, resultSpec, function(e, data){
                if (e) {
                    return reject(e);
                } else {
                    return resolve(data);
                }
            });
        });
    }

    getNote (guid, withContent, withResourcesData, withResourcesRecognition, withResourcesAlternateData) {
        var that = this;
        return new Promise(function(resolve, reject){
            that.noteStore.getNote(that.token, guid,
                withContent,
                withResourcesData,
                withResourcesRecognition,
                withResourcesAlternateData,
                function(e, data){
                if (e) {
                    return reject(e);
                } else {
                    return resolve(data);
                }
            });
        });
    };

    getTag (guid) {
        var that = this;
        return new Promise(function(resolve, reject){
            that.noteStore.getTag(that.token, guid, function(e, data){
                if (e) {
                    return reject(e);
                } else {
                    return resolve(data);
                }
            });
        });
    };

}
