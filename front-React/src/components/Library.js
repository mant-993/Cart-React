import React, {Fragment} from "react"
import {connect} from "react-redux"
import {loadItems} from '../actions/actionList'
import './Library.css'
import axios from "axios";

class Library extends React.Component{
    constructor(props){
	    super(props)

        this.state = {
            selected:[]
        }

        this.useSelected = this.useSelected.bind(this);
        this.fetchAll = this.fetchAll.bind(this);
        this.selectItems = this.selectItems.bind(this);


    }

    componentDidMount(){
        //console.log("Mounted!")
        this.fetchAll()
    }

    fetchAll(){
        //console.log("fetchAll")
        const configuration = {
            method: "get",
            url: "http://localhost:3000/api/findall",
        }

        axios(configuration)
            .then((result) => {
                //console.log(JSON.stringify(result.data))
                const books = result.data
                this.props.loadItems(books);
                

            })
            .catch((error) => {
                //console.log("ERROR")
                console.log(error);
            
            });
    }



    selectItems(e){
        e.preventDefault();

        var parent = e.currentTarget

        if(this.state.selected.includes(parent.id)){
            //this.setState({selected: [this.state.selected.filter(item => item.id !== parent.id)]})
            for( var i = 0; i < this.state.selected.length; i++){ 
                if ( this.state.selected[i] === parent.id) { this.state.selected.splice(i, 1); }         
            }
            parent.classList.remove("highlight");
        }else{
            //this.setState({selected: [...this.state.selected, parent.id]})
            this.state.selected.push(parent.id)
            parent.classList.add("highlight");
        }

        

        
    }



    useSelected(e){
    
        e.preventDefault();

        var id = e.target.id;
        
        switch(id){

            case 'delSelected':

                var configuration = {
                    method: "post",
                    url: "http://localhost:3000/api/delete",
                    data: this.state.selected
                }

                axios(configuration)
                    .then((result) => {
                        console.log(JSON.stringify(result.data))
                        this.setState({selected:[]})
                        this.fetchAll()
                    })
                    .catch((error) => {
                        //console.log("ERROR")
                        console.log(error);             
                    });


                break;
            case 'cartSelected':

                var itemsToCart = this.props.items.filter(item => this.state.selected.includes(item._id))

                const data = {
                    origin : "/library",
                    email : this.props.username, 
                    id : this.state.selected
                }

                //console.log(JSON.stringify(data))

                var configuration = {
                    method: "post",
                    url: "http://localhost:3000/api/put",
                    data: data
                }

                axios(configuration)
                    .then((result) => {
                        console.log(JSON.stringify(result.data))
                        this.setState({selected:[]})
                        this.fetchAll()
                    })
                    .catch((error) => {
                        //console.log("ERROR")
                        console.log(error);             
                    });
                

                break;
            default:
                break;
        }
    
    }

    render() {
	let lists = [];
      if (this.props.items != null) {
         lists = this.props.items.map((item) =>
            <Fragment key={item._id} >
                <div className="itemInst" id={item._id} onClick={ e => this.selectItems(e)}>
                    <div>
                      <img src={item.image} width="240" height="320" alt="Missing"></img>
                    </div>
                    <div align="center">
                      <h2>{item.title}</h2>  
                      <p>Author: {item.author}</p>
                      <p>Publisher: {item.publisher}</p>
                      <p>Pb. Date: {item.pubblication_date}</p>
                      <p>Price: {item.price} $</p>
                    </div>
                </div> 
            </Fragment>

         );
      }
      return (
        <>
            <div className="fetchBtns" align="center">
                <input type="submit"  id="delSelected" value="Delete Selected" onClick={ (e) => this.useSelected(e) } />
                <input type="submit"  id="cartSelected"    value="Add to Cart Selected"     onClick={ (e) => this.useSelected(e) } />
            </div>
            <div>           
                {lists}            
            </div>
        </>
      )
    }
}
    


const mapStateToProps = state => ({
    items: state.items,
    username: state.profile.username
})

export default connect(mapStateToProps, {loadItems})(Library)
	
