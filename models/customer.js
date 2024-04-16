import { Schema, model, models } from 'mongoose';

const CustomerSchema = new Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerMobile: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required : true,
    }
});
const CustomerInfo = models.Customer || model('Customer', CustomerSchema);

export default CustomerInfo;