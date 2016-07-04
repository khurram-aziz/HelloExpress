var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');   
var Invoice = mongoose.model('invoice');
var Item = mongoose.model('item');
var after = require('after');

router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Admin' });
    router.get('/init', function (req, res, next) {
    //router.route('/init')
    //.get(function (req, res) {
        mongoose.connection.db.dropDatabase();
        var i1 = new Invoice();
        var i2 = new Invoice();
        var i3 = new Invoice();
        i1.customer = 'KHURRAM'; i1.invoiceNumber = 'INV01', i1.posted = true;
        i2.customer = 'KHURRAM'; i2.invoiceNumber = 'INV02', i2.posted = true;
        i3.customer = 'KHURRAM'; i3.invoiceNumber = 'INV03', i3.posted = true;
        i1.save();
        i2.save();
        i3.save();
        var it11 = new Item();
        var it12 = new Item();
        var it21 = new Item();
        var it31 = new Item();
        it11.description = 'ITEM 11'; it11.price = 500; it11.quantity = 1;
        it12.description = 'ITEM 12'; it12.price = 200; it12.quantity = 2;
        it21.description = 'ITEM 21'; it21.price = 200; it21.quantity = 1;
        it31.description = 'ITEM 31'; it31.price = 200; it31.quantity = 2;
        it11.invoice = i1; it12.invoice = i1;
        it21.invoice = i2;
        it31.invoice = i3;
        it11.save(); it12.save();
        it21.save();
        it31.save();

        res.render('admin-init', { title: 'Admin - Init', output: 'Saved' });
    });
});

module.exports = router;