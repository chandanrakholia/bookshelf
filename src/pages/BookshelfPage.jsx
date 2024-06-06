import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './styles.css';
import { toast } from 'react-toastify';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(savedBooks);
  }, []);

  const removeFromBookshelf = (index) => {
    const updatedBookshelf = [...bookshelf];
    updatedBookshelf.splice(index, 1);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    toast.error("Book removed from Bookshelf");
  };

  return (
    <div className="bookshelf-page">
      <h2>My Bookshelf</h2>
      <Link to="/">
        <Button variant="primary" className="home-button">Home</Button>
      </Link>
      {bookshelf.length === 0 ? (
        <p className="empty-message">Your bookshelf is empty.</p>
      ) : (
        <div className="book-list">
          {bookshelf.map((book, index) => (
            <div key={index} className="book-card">
              <h3>{book.title}</h3>
              <p>Edition Count: {book.edition_count}</p>
              <Button variant="danger" onClick={() => removeFromBookshelf(index)}>Delete</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookshelfPage;
