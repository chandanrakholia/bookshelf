import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(savedBooks);
  }, []);

  useEffect(() => {
    const searchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        setBooks(response.data.docs);
      } catch (error) {
        setError('Error fetching books. Please try again.');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    const delaySearch = setTimeout(() => {
      if (query.trim() !== '') {
        searchBooks();
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const addToBookshelf = (book) => {
    let updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    toast.success(`${book.title} added to Bookshelf`);
  };

  const isBookInBookshelf = (book) => {
    return bookshelf.some((item) => item.key === book.key);
  };

  const BookCard = ({ book }) => (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Edition Count: {book.edition_count}</p>
      {!isBookInBookshelf(book) && (
        <Button variant="success" onClick={() => addToBookshelf(book)}>Add to Bookshelf</Button>
      )}
    </div>
  );

  return (
    <>
      <div style={{"textAlign": "center"}}>
        <a href="https://github.com/chandanrakholia/bookshelf" target="_blank">Visit the repository</a>
      </div>
      <div className="search-container">
        <div className='wrapper'>
          <div className="search-page">
            <h2>Search by book name:</h2>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for books"
              className="search-input"
            />
          </div>
          <div className="button-container">
            <Link to="/bookshelf">
              <Button variant="primary">My Bookshelf</Button>
            </Link>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>
        <div className="book-list">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
