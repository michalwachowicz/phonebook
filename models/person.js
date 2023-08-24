const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((_) => "Connected to MongoDB")
  .catch((error) => console.log("Error connecting to MongoDB", error));

const personSchema = new mongoose.Schema({ name: String, number: String });
personSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
