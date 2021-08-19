
import React , {Component} from 'react'
import Book from './book.js';
class Shelf extends Component{

    state={
        booksOnShlef:this.props.books,
    }
    update=(book,shelf)=>{
      console.log(book,shelf);
      this.props.onUpdateShelf(book,shelf);
    }
    render(){
        //console.log('props',this.props,'state',this.state);
        const {name}=this.props;
        const {booksOnShlef}=this.state;
        return(
         <div className="bookshelf">
                  <h2 className="bookshelf-title">{name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    { booksOnShlef.map((book)=>(
                         <li key={book.id}>
                         <Book onUpdateShelf={this.update} key={book.id} BookDetails={book}/>
                         </li>
                    ))}
                    </ol>
                  </div>
                </div>
 
        )
    }
}

export default Shelf