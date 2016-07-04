var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');   
var Invoice = mongoose.model('invoice');
var Item = mongoose.model('item');
var after = require('after');

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
