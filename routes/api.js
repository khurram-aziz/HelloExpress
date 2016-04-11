var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');   
var Invoice = mongoose.model('invoice');
var Item = mongoose.model('item');
var after = require('after');

router.route('/init')
    .get(function (req, res) {
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
        return res.send('Saved!'); 
    });
router.route('/invoices')
    .get(function (req, res) {
        var data = [];
        var included = [];
        Invoice.find(function(err, invoices) {
            //return res.send(invoices);
            //but ^^ will not be JSONAPI.org compatible that Ember expects :/
            var cb = after(Object.keys(invoices).length, function() {
                res.send({ data, included });
            });
            //given node and its modules works async; nesting queries mongoo; we will get results over different callbacks
            //so we are using after js to send response only when all expected callbacks are completed and our data + included
            //are "ready" 
            data = invoices.map((attrs) => {
                var invoice = { type: 'invoice', id: attrs._id,
                    attributes: attrs,
                    relationships: {
                        items: { data: [] }
                    }
                };
                console.log('Invoice ID: ' + invoice.id);
                Item.find({ 'invoice': invoice.id }, function (err, items) {
                    if (err) console.log(err);
                    invoice.relationships.items.data = items.map((attrs) => {
                        var item = { type: 'item', id: attrs._id, attributes: attrs };
                        console.log(' Item ID: ' + item.id);
                        invoice.relationships.items.data.push(item);
                        included.push(item);
                        return item;
                    });
                    cb();
                });
                return invoice;
            });
        });
    });
router.route('/invoices/:id')
    .get(function(req, res) {
        return res.status(500).send('Not implemented');
    });
router.route('/items/:id')
    .get(function(req, res) {
        return res.status(500).send('Not implemented');
    })
    .patch(function (req, res) {
        var sentItem = req.body.data;
        Item.findOne({ '_id': sentItem.id }, function(err, item) {
            item.price = sentItem.attributes.price;
            item.quantity = sentItem.attributes.quantity;
            item.save();            
        });
        return res.send(sentItem);
    });

module.exports = router;
