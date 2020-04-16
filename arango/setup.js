// continued
'use strict';
const db = require('@arangodb').db;
const collectionName = 'assets';

if (!db._collection(collectionName)) {
  db._createDocumentCollection(collectionName);
}
