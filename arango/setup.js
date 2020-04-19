// continued
'use strict';
const db = require('@arangodb').db;
const assetCollection = 'assets';
const liabilitiesCollection = 'liabilities';
const usersCollection = 'users';

if (!db._collection(assetCollection)) {
  db._createDocumentCollection(assetCollection);
}

if (!db._collection(liabilitiesCollection)) {
  db._createDocumentCollection(liabilitiesCollection);
}

if (!db._collection(usersCollection)) {
  db._createDocumentCollection(usersCollection);
}
