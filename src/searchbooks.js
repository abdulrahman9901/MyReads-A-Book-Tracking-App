import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import Book from './book.js'
import * as BooksAPI from './BooksAPI.js'

class SearchBooks extends Component {
  findBook=(event)=>{
    const{value}=event.target;
       BooksAPI.search(value).then((books)=>{
         if(! Array.isArray(books)){
          this.setState({
            matches:[]
         })}else{
          const shelfedBooks=books.map((book) =>{
             this.state.books.forEach(element => {
               if(element.id === book.id){
                      book.shelf=element.shelf;
               }
             });
             return book;
           })
           console.log(shelfedBooks);
          this.setState({
              matches:shelfedBooks
         })
        }
       })
  }
  updateBook =(bookToUpdate,newShlef)=>{
    BooksAPI.update(bookToUpdate,newShlef).then((res)=>{
      console.log(res);
    }
    );
    const updatedMatches=this.state.matches.map((book)=>{
      if(book === bookToUpdate){
        book.shelf=newShlef;
      }
      return book;
    })
    this.setState({
      matches:updatedMatches
    })
  }
  componentDidMount(){
      BooksAPI.getAll().then(
        (books) =>{
          console.log(books);
          this.setState(()=>({
            books:books,
          }))
        }
      )
  }
  state={
    books:[],
    matches:[]
  }
    render(){
      console.log(this.state.matches);
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className='close-search'>close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(event)=>{this.findBook(event)}}/>
                  
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.matches.length <= 0 && (
                  <div>
                  <p>NOTES: The search from BooksAPI is limited to a particular set of search terms.</p>
                  <p>You can find these search terms here:</p>
                  <p>https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md</p>
                  <p>However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if</p>
                  <p>you don't find a specific author or title. Every search is limited by search terms.</p>
                  </div>
                    )
                }{       
                this.state.matches.map((book)=>(
                          <li key={book.id}>
                         <Book key={book.id} onUpdateShelf={this.updateBook} BookDetails={book}/>
                          </li> 
                    ))
              }
              </ol>
          </div>
        </div>
        )
    }
}
export default SearchBooks