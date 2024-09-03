const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    signature: {
        type: String,
    },
    amount: {
        type: Number, // 5000
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;