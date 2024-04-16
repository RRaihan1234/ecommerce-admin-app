import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});
const UserInfo = models.User || model('User', UserSchema);

export default UserInfo;