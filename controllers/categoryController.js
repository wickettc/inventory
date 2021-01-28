const Category = require('../models/category');

exports.category_list = function (req, res) {
    res.send('Category list');
};

exports.category_detail = function (req, res) {
    res.send('Category detail');
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
