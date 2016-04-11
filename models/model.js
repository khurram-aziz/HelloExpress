var m = require('mongoose');

var invoiceSchema = new m.Schema({
    id: { type: m.Schema.Types.ObjectId },
	customer: String,
    invoiceNumber: String,
    posted: Boolean,
    createDate: { type: Date, default: Date.now }
});
var itemSchema = new m.Schema({
    id: { type: m.Schema.Types.ObjectId },
    invoice: { type: m.Schema.Types.ObjectId, ref: 'invoice' },
    description: String,
    price: Number,
    quantity: Number,
    createDate: { type: Date, default: Date.now }
});

m.model('invoice', invoiceSchema);
m.model('item', itemSchema);