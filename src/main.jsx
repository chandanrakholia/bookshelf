import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import BookshelfPage from './pages/BookshelfPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/bookshelf" element={<BookshelfPage />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <App />
  </React.StrictMode>
);
