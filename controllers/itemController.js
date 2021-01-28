const Item = require('../models/item');
const Category = require('../models/category');

const async = require('async');

exports.index = function (req, res) {
    async.parallel(
        {
            item_count: function (cb) {
                Item.countDocuments({}, cb);
            },
            category_count: function (cb) {
                Category.countDocuments({}, cb);
            },
        },
        function (err, results) {
            res.render('index', {
                title: 'Inventory Home Page',
                error: err,
                data: results,
            });
        }
    );
};

exports.item_list = function (req, res) {
    res.send('Item List');
};

exports.item_detail = function (req, res) {
    res.send('Item Details');
};

exports.item_create_get = function (req, res) {
    res.send('Item create GET');
};

exports.item_create_post = function (req, res) {
    res.send('Item create POST');
};

exports.item_delete_get = function (req, res) {
    res.send('Item delete GET');
};

exports.item_delete_post = function (req, res) {
    res.send('Item delete POST');
};

exports.item_update_get = function (req, res) {
    res.send('Item update GET');
};

exports.item_update_post = function (req, res) {
    res.send('Item update POST');
};
