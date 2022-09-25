const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "An email is needed"],
        unique: [true, "This email is already in use"]
    }
});
UserSchema.plugin(passportLocalMongoose); // This is gonna plug in into our schema a username and password field. It's also gonna make sure that those usernames are unique and not duplicate and give us some additional methods.

module.exports = mongoose.model("User", UserSchema);