import pkg from 'mongoose';
const { Schema, model } = pkg;
const {ObjectId} = Schema;

const studioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    movies: [{
        type: ObjectId,
        ref: "Movie",
  }],
  },
  {
    timestamps: true,
  }
);

export default model('Studio', studioSchema);
