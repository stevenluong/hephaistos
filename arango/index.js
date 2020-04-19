'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();

module.context.use(router);

router.get('/hi', function (req, res) {
  res.send('γεια');
})
.response(['text/plain'], 'Hi in greek')
.summary('Greek greeting')
.description('Prints the greek greeting.');

const joi = require('joi');
const db = require('@arangodb').db;
const aql = require('@arangodb').aql;
const errors = require('@arangodb').errors;
const assetsCollection = db._collection('assets');
const liabilitiesCollection = db._collection('liabilities');
const usersCollection = db._collection('users');
const users = module.context.collection("users");
const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;


// ASSETS ----------------------------------------------------------------
// store schema in variable to make it re-usable, see .body()
const assetDocSchema = joi.object().required().keys({
  name: joi.string().required(),
  value: joi.number().required(),
  type: joi.string().required(),
  user: joi.string().required(),
  income: joi.number().required()
}).unknown(); // allow additional attributes

router.post('/assets', function (req, res) {
  const multiple = Array.isArray(req.body);
  const body = multiple ? req.body : [req.body];

  let data = [];
  for (var doc of body) {
    const meta = assetsCollection.save(doc);
    data.push(Object.assign(doc, meta));
  }
  res.send(multiple ? data : data[0]);

})
.body(joi.alternatives().try(
  assetDocSchema,
  joi.array().items(assetDocSchema)
), 'Entry or entries to store in the collection.')
.response(joi.alternatives().try(
  joi.object().required(),
  joi.array().items(joi.object().required())
), 'Entry or entries stored in the collection.')
.summary('Store entry or entries')
.description('Store a single entry or multiple entries in the "myFoxxCollection" collection.');

router.get('/assets/:key', function (req, res) {
  const assets = db._query(aql`
    FOR asset IN ${assetsCollection}
    FILTER asset.user == ${req.pathParams.key}
    RETURN asset
  `);
  res.send(assets);
})
.pathParam('key', joi.number().required(), 'Key of the user.')
.response(joi.array().items(
  joi.string().required()
).required(), 'List of asset keys.')
.summary('List asset keys')
.description('Assembles a list of keys of assets in the collection.');

router.put('/assets/:key', function (req, res) {
  console.log(req.pathParams.key)
  console.log(req.body)
  const data = assetsCollection.replace(req.pathParams.key,req.body);
  console.log(data)
  res.send(data)
})
.body(joi.alternatives().try(
  assetDocSchema,
  joi.object()
), 'Asset to update in the collection.')
.pathParam('key', joi.string().required(), 'Key of the asset.')
.response(joi.object().required(), 'Asset stored in the collection.')
.summary('Updates an asset')
.description('Updates an asset based on a key');

router.delete('/assets/:key', function (req, res) {
  const data = assetsCollection.remove(req.pathParams.key);
  res.send(data)
})
.pathParam('key', joi.string().required(), 'Key of the asset.')
.response(joi.object().required(), 'Asset key removed')
.summary('Removes an asset')
.description('Removes an asset based on a key');

// LIABILITIES ----------------------------------------------------------------

// store schema in variable to make it re-usable, see .body()
const liabilitiesDocSchema = joi.object().required().keys({
  name: joi.string().required(),
  amount: joi.number().required(),
  duration: joi.number().required(),
  rate: joi.number().required(),
  monthlyPayment: joi.number().required(),
  start: joi.string().required()
}).unknown(); // allow additional attributes

router.post('/liabilities', function (req, res) {
  const multiple = Array.isArray(req.body);
  const body = multiple ? req.body : [req.body];

  let data = [];
  for (var doc of body) {
    const meta = liabilitiesCollection.save(doc);
    data.push(Object.assign(doc, meta));
  }
  res.send(multiple ? data : data[0]);

})
.body(joi.alternatives().try(
  liabilitiesDocSchema,
  joi.array().items(liabilitiesDocSchema)
), 'Entry or entries to store in the collection.')
.response(joi.alternatives().try(
  joi.object().required(),
  joi.array().items(joi.object().required())
), 'Entry or entries stored in the collection.')
.summary('Store entry or entries')
.description('Store a single entry or multiple entries in the "myFoxxCollection" collection.');

router.get('/liabilities/:key', function (req, res) {
  const liabilities = db._query(aql`
    FOR liability IN ${liabilitiesCollection}
    FILTER liability.user == ${req.pathParams.key}
    RETURN liability
  `);
  res.send(liabilities);
})
.pathParam('key', joi.number().required(), 'Key of the user.')
.response(joi.array().items(
  joi.string().required()
).required(), 'List of liabilitie keys.')
.summary('List liabilitie keys')
.description('Assembles a list of keys of liabilities in the collection.');

router.put('/liabilities/:key', function (req, res) {
  //console.log(req.pathParams.key)
  //console.log(req.body)
  const data = liabilitiesCollection.replace(req.pathParams.key,req.body);
  //console.log(data)
  res.send(data)
})
.body(joi.alternatives().try(
  assetDocSchema,
  joi.object()
), 'Liability to update in the collection.')
.pathParam('key', joi.string().required(), 'Key of the liability.')
.response(joi.object().required(), 'Liability stored in the collection.')
.summary('Updates an liability')
.description('Updates an liability based on a key');

router.delete('/liabilities/:key', function (req, res) {
  const data = liabilitiesCollection.remove(req.pathParams.key);
  res.send(data)
})
.pathParam('key', joi.string().required(), 'Key of the liability.')
.response(joi.object().required(), 'Liability key removed')
.summary('Removes an liability')
.description('Removes an liability based on a key');


// USERS ----------------------------------------------------------------

const usersDocSchema = joi.object().required().keys({
  email: joi.string().required(),
  currency: joi.string(),
  country: joi.string(),
  birthdate: joi.string(),
  salary: joi.number()
}).unknown(); // allow additional attributes


router.get('/users/:sub', function (req, res) {
  const data = db._query(aql`
    FOR user IN ${usersCollection}
    FILTER user.sub == ${req.pathParams.sub}
    RETURN user
  `);
  console.log(data);
  res.send(data);
})
.pathParam('sub', joi.string().required(), 'Sub from Okta')
.response(joi.object().required(), 'User stored in the collection.')
.summary('Retrieves a user')
.description('Retrieves a user based on a sub from Okta');

router.post('/users', function (req, res) {
  const data = usersCollection.save(req.body);
  res.send(data);
})
.body(joi.alternatives().try(
  usersDocSchema
), 'User to store in the collection.')
.response(joi.alternatives().try(
  joi.object().required()
), 'User stored in the collection.')
.summary('Stores user')
.description('Stores a user');


router.put('/users/:key', function (req, res) {
  const data = usersCollection.replace(req.pathParams.key,req.body);
  res.send(data)
})
.body(joi.alternatives().try(
  usersDocSchema
), 'User to update in the collection.')
.pathParam('key', joi.string().required(), 'Key of the user.')
.response(joi.object().required(), 'User stored in the collection.')
.summary('Updates a user')
.description('Updates a user based on a key');
