const async = require('async');
const Item = require('../models/item');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

exports.index = function (req, res, next) {
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
            if (err) return next(err);
            res.render('index', {
                title: 'Inventory Home Page',
                error: err,
                data: results,
            });
        }
    );
};

exports.item_list = function (req, res, next) {
    Item.find({}).exec(function (err, item_list) {
        if (err) {
            return next(err);
        }
        res.render('item_list', { title: 'All Items', data: item_list });
    });
};

exports.item_detail = function (req, res, next) {
    Item.findById(req.params.id).exec(function (err, item_detail) {
        if (err) return next(err);
        res.render('item_detail', {
            title: item_detail.name,
            data: item_detail,
        });
    });
};

exports.item_create_get = function (req, res, next) {
    Category.find({}).exec(function (err, categories_found) {
        if (err) return next(err);
        res.render('item_form', {
            title: 'Add Item',
            categories: categories_found,
        });
    });
};

exports.item_create_post = [
    body('name', 'Item name required')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Name must be specified'),
    body('description', 'Item description required')
        .trim()
        .isLength({ min: 4 })
        .escape()
        .withMessage('Description must be specified'),
    body('price', 'Item price required')
        .trim()
        .isCurrency()
        .escape()
        .withMessage('Price must be specified'),
    body('stock_available', 'Items available required')
        .trim()
        .isNumeric({ min: 1 })
        .escape()
        .withMessage('Stock availability must be specified'),
    (req, res, next) => {
        const errors = validationResult(req);
        const item = new Item({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            stock_available: req.body.stock_available,
        });
        if (!errors.isEmpty()) {
            //errors are present
            res.render('item_form', {
                title: 'Create Item',
                item: item,
                errors: errors.array(),
            });
            return;
        } else {
            //data is valid
            Item.findOne({ name: req.body.name }).exec(function (
                err,
                found_item
            ) {
                if (err) return next(err);
                if (found_item) {
                    res.redirect(found_item.url);
                } else {
                    item.save(function (err) {
                        //save new item and redirect to page
                        res.redirect(item.url);
                    });
                }
            });
        }
    },
];

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
