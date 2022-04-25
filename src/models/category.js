const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = Schema;
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    movies: [
      {
        type: ObjectId,
        ref: "Movie",
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
