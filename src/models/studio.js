const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

module.exports = mongoose.model("Studio", studioSchema);
