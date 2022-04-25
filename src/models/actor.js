import pkg from 'mongoose';
const { Schema, model } = pkg;
const {ObjectId} = Schema;

const actorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    character: {
      type: String,
      required: true,
    },
    movies: [{
      type: ObjectId,
      ref: "Movie",
    }]
  },
  {
    timestamps: true,
  }

);

export default model('Actor', actorSchema);
