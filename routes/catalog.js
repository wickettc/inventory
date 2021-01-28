const express = require('express');
const router = express.Router();

// controller modules
const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

// routes
router.get('/', item_controller.index);

router.get('/item/create', item_controller.item_create_get);
router.get('/item/create', item_controller.item_create_post);

router.get('/item/:id/delete', item_controller.item_delete_get);
router.get('/item/:id/delete', item_controller.item_delete_post);

router.get('/item/:id/update', item_controller.item_update_get);
router.get('/item/:id/update', item_controller.item_update_post);

router.get('/items', item_controller.item_list);
router.get('/item/:id', item_controller.item_detail);

router.get('/category/create', category_controller.category_create_get);
router.get('/category/create', category_controller.category_create_post);

router.get('/category/:id/delete', category_controller.category_delete_get);
router.get('/category/:id/delete', category_controller.category_delete_post);

router.get('/category/:id/update', category_controller.category_update_get);
router.get('/category/:id/update', category_controller.category_update_post);

router.get('/categories', category_controller.category_list);
router.get('/category/:id', category_controller.category_detail);

module.exports = router;