const express = require("express");
const app = express();

app.use(express.json());

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (_, response) => {
  response.json(people);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get("/info", (_, response) => {
  const length = people.length;
  const date = new Date().toString();

  response.send(`<p>Phonebook has info for ${length} people</p><p>${date}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
