# THIS REPO IS Deprecated
evernote-js-sdk v2 already did this

# evernote-rsvp
use rsvp wrap evernote api

## API
### require
```js
ver Service = require('evernote-rsvp');
var service = new Service({token: token});

// service.listNotebooks()

// service.listNotesByNotebook(notebookGuid)

// service.listTagsByNotebook(notebookGuid)

// service.findNotes(search_attributes, offset, limit)

// service.getNote(noteGuid, withContent, withResourcesData, withResourcesRecognition, withResourcesAlternateData)

// service.getTag(tagGuid)

// all these methods return a promise object

service.listNotebooks().then(function(notebooks){
  notebooks.forEach(function(notebook){
    console.log(notebook.name);
  });
}).catch(function(e){
  console.error(e);
});

```

