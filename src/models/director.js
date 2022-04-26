import pkg from 'mongoose';
const { Schema, model } = pkg;
const {ObjectId} = Schema;

const directorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
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

export default model('Director', directorSchema);
