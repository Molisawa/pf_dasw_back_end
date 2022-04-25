const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const {ObjectId} = Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles:[{
        type: ObjectId,
        ref: "Role",
    }],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.statics.matchPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};


module.exports = mongoose.model("User", userSchema);
