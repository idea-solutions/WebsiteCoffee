const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    },
}, { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);