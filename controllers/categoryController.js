const async = require('async');
const Category = require('../models/category');
const Item = require('../models/item');

exports.category_list = function (req, res, next) {
    Category.find({}).exec(function (err, category_list) {
        if (err) return next(err);
        res.render('category_list', {
            title: 'All Categories',
            data: category_list,
        });
    });
};

exports.category_detail = function (req, res, next) {
    async.parallel(
        {
            category: function (cb) {
                Category.findById(req.params.id).exec(cb);
            },
            category_items: function (cb) {
                Item.find({
                    category: req.params.id,
                }).exec(cb);
            },
        },
        function (err, results) {
            if (err) return next(err);
            res.render('category_details', {
                title: results.category.name,
                data: results,
            });
        }
    );
};

exports.category_create_get = function (req, res) {
    res.send('Category create GET');
};

exports.category_create_post = function (req, res) {
    res.send('Category create POST');
};

exports.category_delete_get = function (req, res) {
    res.send('Category delete GET');
};

exports.category_delete_post = function (req, res) {
    res.send('Category delete POST');
};

exports.category_update_get = function (req, res) {
    res.send('Category update GET');
};

exports.category_update_post = function (req, res) {
    res.send('Category update POST');
};
