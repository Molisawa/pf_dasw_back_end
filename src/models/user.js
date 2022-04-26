
import pkg from 'mongoose';
const { Schema, model } = pkg;
import { genSalt, hash as _hash, compare } from "bcrypt";
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
  const salt = await genSalt(10);
  return _hash(password, salt);
};

userSchema.statics.matchPassword = async (password, hash) => {
  return await compare(password, hash);
};


export default model('User', userSchema);
