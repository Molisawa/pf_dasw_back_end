import pkg from 'mongoose';
const { Schema, model } = pkg;
const {ObjectId} = Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    score: {
      type: String,
      required: true,
    },
    category: [{
      type: ObjectId,
      ref: "Category"
    }],
    description: {
      type: String,
      required: true,
    },
    director: [{
      type: ObjectId,
      ref: "Director"
    }],
    actor: [{
      type: ObjectId,
      ref: "Actor"
    }],
    studio: {
      type: ObjectId,
      ref: "Studio"
    },
    poster: {
      type: String,
      required: true,
    },
    trailer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Movie', movieSchema);
