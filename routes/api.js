var express = require('express');
var router = express.Router();

router.route('/invoices')
    .get(function(req, res) {
        var data = [
            { type: 'invoice', id: 1, attributes: { 
                customer: 'KHURRAM', invoiceNumber: 'INV01', createDate: 123, posted: true }
            },
            { type: 'invoice', id: 2, attributes: { 
                customer: 'KHURRAM', invoiceNumber: 'INV02', createDate: 123, posted: true }
            },
            { type: 'invoice', id: 3, attributes: { 
                customer: 'KHURRAM', invoiceNumber: 'INV03', createDate: 123, posted: true }
            }
        ];
       return res.send({ data });
    });
router.route('/invoices/:id')
    .get(function(req, res) {
        var passedid = req.params.id;
        var data = { type: 'invoice', id: passedid, attributes: {
            customer: 'KHURRAM', invoiceNumber: 'INV01', createDate: 123, posted: true
            }, relationships: {
                items: {
                    data: [
                        { type: 'item', id: 1, attributes: {
                            description: 'ITEM DESCRIPTION', price: 500, quantity: 1 }
                        },
                        { type: 'item', id: 2, attributes: {
                            description: 'ITEM DESCRIPTION', price: 200, quantity: 2 }
                        }
                    ]
                }
            }
        };
        return res.send({ data });
    });
router.route('/items/:id')
    .get(function(req, res) {
        var passedid = req.params.id;
        var p = 500;
        var q = 1;
        if (passedid == 2) { p = 200; q = 2; }
        var data = { type: 'item', id: passedid, attributes: {
            //invoice: ''
            description: 'ITEM DESCRIPTION', price: p, quantity: q
        }};
        return res.send({ data });
    })
    .patch(function (req, res) {
        var item = req.body.data;
        return res.send(item);
    });

module.exports = router;
