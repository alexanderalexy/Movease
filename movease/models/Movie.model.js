const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(
  {
    
      name: String,
      director: String,
      actor: String,
      genre: String,
      length: Number,
      related: [String],
      image: url,
      
    
    },
  
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
