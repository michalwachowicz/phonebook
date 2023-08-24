const mongoose = require("mongoose");

// password = argv[2]
// name = argv[3]
// number = argv[4]

if (process.argv.length < 3) {
  console.log("Password missing.");
  process.exit(1);
}

const password = process.argv[2];
const database = "phonebook";
const url = `mongodb+srv://fullstack:${password}@cluster0.7zqtqjt.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({ name: String, number: String });
const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 5) {
  console.log("phonebook:");
  Person.find({}).then((persons) => {
    persons.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
  return;
}

const name = process.argv[3];
const number = process.argv[4];
const person = new Person({ name, number });

person.save().then((result) => {
  console.log(`added ${result.name} number ${result.number} to phonebook`);
  mongoose.connection.close();
});
