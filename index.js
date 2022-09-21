import Store from './modules/store.js';
import UI from './modules/ui.js';

class Book {
  constructor(title, author, id = Math.floor(Math.random() * 1000000)) {
    this.title = title;
    this.author = author;
  }
}
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const books = document.querySelector('.books');
    const newBook = document.createElement('div');
    newBook.innerHTML = `
      <div class='display'>
      <div class="bookDiv">
        <div class="bookTitleAuthor">
          <h4 id="title">"${book.title}"</h4>
          <h4 id="author">by ${book.author}</h4>
        </div>
        <div class="remove"><button class="delete">Remove</button></div>
      </div>
      </div>
      `;
    newBook.classList.add('newBook');
    books.appendChild(newBook);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(book) {
    const bookTitle = book.querySelector('#title').innerText;
    const books = Store.getBooks();
    const filt = books.filter((book) => bookTitle === book.title);
    const filtIndex = books.indexOf(filt[0]);
    books.splice(filtIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('.bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.querySelector('.title').value;
  const authorInput = document.querySelector('.author').value;
  if (titleInput !== '' && authorInput !== '') {
    const book = new Book(titleInput, authorInput);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFields();
  } else {
    // eslint-disable-next-line no-alert
    alert('Please enter book tile and author');
  }
});

document.querySelector('.books').addEventListener('click', (e) => {
  if (e.target.className === 'delete') {
    const id = e.target.previousElementSibling.innerText;
    Store.removeBook(id);
    UI.deleteBook(e.target);
  }
});
