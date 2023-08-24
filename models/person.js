const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((_) => "Connected to MongoDB")
  .catch((error) => console.log("Error connecting to MongoDB", error));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: function (v) {
      return /\d{2,3}-\d{4,}/.test(v);
    },
  },
});
personSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
