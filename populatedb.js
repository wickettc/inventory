#! /usr/bin/env node

console.log('This script populates some items and categories to DB');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Item = require('./models/item');
var Category = require('./models/category');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = [];
var categories = [];

function itemCreate(name, category, description, price, stock_available, cb) {
    itemDetail = { name, category, description, price, stock_available };

    var item = new Item(itemDetail);

    item.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Item: ' + item);
        items.push(item);
        cb(null, item);
    });
}

function categoryCreate(name, description, cb) {
    var category = new Category({ name, description });

    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

function createItems(cb) {
    async.series(
        [
            function (callback) {
                itemCreate(
                    'Backpack',
                    'Outdoors',
                    'A great hiking backpack',
                    49.99,
                    56,
                    callback
                );
            },
            function (callback) {
                itemCreate(
                    'Pool Tabel',
                    'Entertainment',
                    "Let's shoot some pool!",
                    149.99,
                    13,
                    callback
                );
            },
            function (callback) {
                itemCreate(
                    'Washing Machine',
                    'Appliance',
                    'Keeps the clothes clean!',
                    489.99,
                    17,
                    callback
                );
            },
            function (callback) {
                itemCreate(
                    'Fridge',
                    'Appliance',
                    'Keeps the food cold!',
                    1149.99,
                    9,
                    callback
                );
            },
            function (callback) {
                itemCreate(
                    'Smoker',
                    'Outdoors',
                    "Who doesn't like pulled pork?!",
                    239.99,
                    32,
                    callback
                );
            },
            function (callback) {
                itemCreate(
                    'Grill',
                    'Outdoors',
                    'Dual gas and charcoal grill!',
                    437.99,
                    12,
                    callback
                );
            },
            function (callback) {
                itemCreate(
                    'T-Shirt',
                    'Clothes',
                    'Basic cotton t-shirt',
                    7.49,
                    89,
                    callback
                );
            },
            function (callback) {
                itemCreate(
                    'Jeans',
                    'Clothes',
                    'Basic denim jeans',
                    47.49,
                    79,
                    callback
                );
            },
            function (callback) {
                itemCreate(
                    '85in TV',
                    'Entertainment',
                    'Top of the line HD TV!',
                    2447.49,
                    4,
                    callback
                );
            },
        ],
        // optional callback
        cb
    );
}

function createCategories(cb) {
    async.parallel(
        [
            function (callback) {
                categoryCreate(
                    'Outdoors',
                    'Ahhh, the great outdoors',
                    callback
                );
            },
            function (callback) {
                categoryCreate(
                    'Entertainment',
                    "Let's have a good time!",
                    callback
                );
            },
            function (callback) {
                categoryCreate('Clothes', 'Great line of clothing', callback);
            },
            function (callback) {
                categoryCreate('Appliance', 'All your home needs!', callback);
            },
        ],
        // optional callback
        cb
    );
}

async.series(
    [createItems, createCategories],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        } else {
            console.log('Items: ' + items);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);
