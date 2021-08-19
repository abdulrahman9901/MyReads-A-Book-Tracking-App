
import React ,{Component}from 'react'

class Book extends Component{
    isSelected=()=>{      
        if(this.props.BookDetails.hasOwnProperty('shelf'))
            return this.props.BookDetails.shelf;
        else
            return 'none';
    }
    
    render(){
        const {title ,authors}=this.props.BookDetails;
        const image=this.props.BookDetails.imageLinks ? this.props.BookDetails.imageLinks.thumbnail:' ';
        //console.log(this.props.BookDetails);
        return(
         
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
                <div className="book-shelf-changer">
                    <select value={this.isSelected()} onChange={(event) => this.props.onUpdateShelf(this.props.BookDetails,event.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead"  >Want to Read</option>
                    <option value="read"  >Read</option>
                    <option value="none" >None</option>
                    </select> 
                </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{
                (Array.isArray(authors)) &&
                     (authors.map((author) =>(
                         author
                )))}</div>
            </div>
                  
 
        )
    }
}

export default Book