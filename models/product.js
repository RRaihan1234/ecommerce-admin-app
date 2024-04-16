import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productCompany: {
        type: String,
        required: true,
    },
    madeIn: {
        type: String,
        required : true,
    }
});
const ProductInfo = models.Product || model('Product', ProductSchema);

export default ProductInfo;