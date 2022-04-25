const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

module.exports = mongoose.model("Actor", actorSchema);
