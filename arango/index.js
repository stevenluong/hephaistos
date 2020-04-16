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
const errors = require('@arangodb').errors;
const assetsCollection = db._collection('assets');
const liabilitiesCollection = db._collection('liabilities');
const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;


// ASSETS ----------------------------------------------------------------
// store schema in variable to make it re-usable, see .body()
const assetDocSchema = joi.object().required().keys({
  name: joi.string().required(),
  value: joi.number().required(),
  type: joi.string().required(),
  user: joi.number().required(),
  income: joi.string().required()
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

const aql = require('@arangodb').aql;

router.get('/assets', function (req, res) {
  const assets = db._query(aql`
    FOR entry IN ${assetsCollection}
    RETURN entry
  `);
  res.send(assets);
})
.response(joi.array().items(
  joi.string().required()
).required(), 'List of asset keys.')
.summary('List asset keys')
.description('Assembles a list of keys of assets in the collection.');

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

router.get('/liabilities', function (req, res) {
  const liabilities = db._query(aql`
    FOR entry IN ${liabilitiesCollection}
    RETURN entry
  `);
  res.send(liabilities);
})
.response(joi.array().items(
  joi.string().required()
).required(), 'List of liabilitie keys.')
.summary('List liabilitie keys')
.description('Assembles a list of keys of liabilities in the collection.');
