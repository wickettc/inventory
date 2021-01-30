const async = require('async');
const Category = require('../models/category');
const Item = require('../models/item');
const { body, validationResult } = require('express-validator');

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
    res.render('category_form', { title: 'Create Category' });
};

// exports.category_create_post = [
//     body('name', 'Category name required')
//         .trim()
//         .isLength({ min: 1 })
//         .escape()
//         .withMessage('Name must be specified'),
//     body('description', 'Category description required')
//         .trim()
//         .isLength({ min: 1 })
//         .escape()
//         .withMessage('Description must be specified'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         const category = new Category({
//             name: req.body.name,
//             description: req.body.description,
//         });
//         if (!errors.isEmpty()) {
//             //errors are present
//             res.render('category_form', {
//                 title: 'Create Category',
//                 category: category,
//                 errors: errors.array(),
//             });
//             return;
//         } else {
//             //data is valid
//             Category.findOne({ name: req.body.name }).exec(function (
//                 err,
//                 found_category
//             ) {
//                 if (err) return next(err);
//                 if (found_category) {
//                     res.redirect(found_category.url);
//                 } else {
//                     category.save(function (err) {
//                         if (err) return next(err);
//                         //save new category and redirect to page
//                         res.redirect(category.url);
//                     });
//                 }
//             });
//         }
//     },
// ];

exports.category_create_post = function (req, res, next) {
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
    });
    category.save(function (err) {
        if (err) return next(err);
        res.redirect(category.url);
    });
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
