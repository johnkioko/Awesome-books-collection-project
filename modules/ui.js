import Store from './store.js';

export default class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const books = document.querySelector('.books');
    const newBook = document.createElement('div');

    newBook.innerHTML = `
    <div>
    <div class="bookDiv">
    <h4 id="title" class="bookTitleAuthor">"${book.title}" &nbsp; by &nbsp; ${book.author}</h4>
    
      <button id="remove" class="delete">Remove</button>
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