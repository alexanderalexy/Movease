const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(
  {
    genre: {
      type: String,
      
    },
    actor: {
      type: String,
      
    },
    director: {
      type: String,
      
    },
    length: {
      type: Number,
    },
    relatedmovies: {
        type: [],
    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
