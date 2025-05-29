// index.js

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// in-memory data storage
let books = [];
let currentId = 1;

// GET /books - Return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' });
  }

  const newBook = { id: currentId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ error: 'Book not found.' });

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  res.status(204).send(); // No content
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
