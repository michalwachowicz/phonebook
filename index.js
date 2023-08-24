require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();

morgan.token("person", (req, res) =>
  req.method === "POST" && res.statusCode === 200
    ? JSON.stringify(req.body)
    : " "
);

app.use("/", express.static("build"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

app.get("/api/persons", (_, response) => {
  Person.find({}).then((people) => response.json(people));
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const person = new Person({ name, number });
  person.save().then((savedPerson) => response.json(savedPerson));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => response.json(person))
    .catch((error) => {
      console.log(error);
      response.status(404).end();
    });
});

app.delete("/api/persons/:id", (request, response) => {
  // const id = Number(request.params.id);
  // people = people.filter((person) => person.id !== id);
  // response.status(204).end();
});

app.get("/info", (_, response) => {
  // const length = people.length;
  // const date = new Date().toString();
  // response.send(`<p>Phonebook has info for ${length} people</p><p>${date}</p>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
