import React from 'react'
import {Route} from 'react-router-dom'
import SearchBooks from './searchbooks.js'
import MyBooks from './mybooks.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  render() { 
      console.log(this.state.books);
      return (
        <div className="app">
            <Route path='/search' render={()=>(
              <SearchBooks  />
            )}/>   
            <Route exact path='/' render={({history})=>(
              <MyBooks  books={this.state.books}/>
            )}/>
        </div> ) 
        }
  }

export default BooksApp
