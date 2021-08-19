import * as BooksAPI from './BooksAPI.js'
import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './book.js';

class MyBooks extends Component {
    state={
        books:[]
    }
    getBooks=()=>{
        BooksAPI.getAll().then(
          (books) =>{
            console.log(books);
            const wantToRead =books.filter((book)=>(book.shelf === 'wantToRead'));
            const currentlyReading =books.filter((book)=>(book.shelf === 'currentlyReading'));
            const read =books.filter((book)=>(book.shelf === 'read'));
            this.setState(()=>({
              books:books,
              read:read,
              currentlyReading:currentlyReading,
              wantToRead:wantToRead
            }))
          }
        )
      }
    updateBookShelf = (bookToUpdate,newShelf) => {

    BooksAPI.update(bookToUpdate,newShelf).then((res)=>{
        console.log('res',res);
        }
      );
      const updatedBooks=this.state.books.map((book)=>{
        if(book === bookToUpdate){
          book.shelf=newShelf;
        }
        return book;
      })
      const wantToRead =updatedBooks.filter((book)=>(book.shelf === 'wantToRead'));
            const currentlyReading =updatedBooks.filter((book)=>(book.shelf === 'currentlyReading'));
            const read =updatedBooks.filter((book)=>(book.shelf === 'read'));
            this.setState(()=>({
              books:updatedBooks,
              read:read,
              currentlyReading:currentlyReading,
              wantToRead:wantToRead
            }))
      }
   
      componentDidMount() {
        this.getBooks();
        console.log(this.state);
    }
    render(){
        if(this.state.books.length >0 ) {
        console.log(this.state);
        
        const {wantToRead ,read ,currentlyReading}=this.state;
        return(
            <div className="list-books">          
                <div className="list-books-title">
                    <h1>MyReads</h1>
                    </div>
                        <div className="list-books-content">
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                        {currentlyReading.map((book)=>(
                                            <li key={book.id}>
                                            <Book onUpdateShelf={this.updateBookShelf} key={book.id} BookDetails={book}/>
                                            </li>
                                        ))}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                        { wantToRead.map((book)=>(
                                            <li key={book.id}>
                                            <Book onUpdateShelf={this.updateBookShelf} key={book.id} BookDetails={book}/>
                                            </li>
                                        ))}
                                        </ol>
                                    </div>
                                </div>       
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                        { read.map((book)=>(
                                            <li key={book.id}>
                                            <Book onUpdateShelf={this.updateBookShelf} key={book.id} BookDetails={book}/>
                                            </li>
                                        ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        <div className="open-search">
                        <Link to='/search'><button>Add a book </button></Link>
                </div>
            </div>
        )
    }else{
        return <div>{null}</div>
    }
}
}
PropTypes.MyBooks={
    books:PropTypes.array.isRequired
}
export default MyBooks