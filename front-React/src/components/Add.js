import React from 'react'
import {connect} from "react-redux"
import './Add.css'
import axios from 'axios'



class Add extends React.Component{
	constructor(props){
		super(props)
		
		this.addToList = this.addToList.bind(this)
		this.addJson = this.addJson.bind(this)
		this.changedInput = this.changedInput.bind(this)


		this.state ={
									id: '',
									title : '',
									author : '',
									publisher : '',
									pubblication_date : '',
									price : 0,
									image : ''					   
						};
		
		this.newItem = {...this.state}

	}
	
	
	
	addToList(e){
	
		e.preventDefault()

		const configuration = {
              method: "post",
              url: "http://localhost:3000/api/insert",
              data : [this.newItem],
      };

      axios(configuration)
      .then((result) => {

      	//console.log(JSON.stringify(result))

	      //this.props.addItem(this.newItem)
	      this.setState({
									id: '',
									title : '',
									author : '',
									publisher : '',
									pubblication_date : '',
									price : 0,
									image : ''					   
			})

			this.newItem = {...this.state}


	   }).catch((error) => {
         //console.log("ERROR")
         console.log(error);
	
      });
	
	}






	addJson(e){

		e.preventDefault()

		var file = e.target.querySelector('input').files[0]


		console.log(file)
		console.log(file.name)



		
		let reader = new FileReader()
		reader.readAsText(file);

		reader.onload = function() {
		   const res = reader.result;
		   //console.log("res: "+res)
		   const res2 = JSON.parse(res)
		   //console.log("res2: "+JSON.stringify(res2))

	   

		   const configuration = {
	         method: "post",
	         url: "http://localhost:3000/api/insert",
	         data : res2,
	      };

	      axios(configuration)
	      .then((result) => {

	      	console.log(JSON.stringify(result))


		   }).catch((error) => {
	         //console.log("ERROR")
	         console.log(error);
		
	      });
		};
		
		reader.onerror = function() {
		   console.log(reader.error);
		};

		


	}





	
	changedInput(e) {

		var id = e.target.id;
		const val = e.target.value;

		
		switch(id){
			case 'title':
				this.setState({title: val})
				this.newItem.title = val
				break;
			case 'author':
				this.setState({author: val})
				this.newItem.author = val
				break;
			case 'publisher':
				this.setState({publisher: val})
				this.newItem.publisher = val
				break;
			case 'pubblication_date':
				this.setState({pubblication_date: val})
				this.newItem.pubblication_date = val
				break;
			case 'price':
				this.setState({price: val})
				this.newItem.price = val
				break;
			case 'image':
				this.setState({image: val})
				this.newItem.image = val
				break;
			default:
				break;
		}
			
	}
	
	
	render(){
		return(
			<>
				<form className="addOne" onSubmit={this.addToList} align="center" >
					<h2>Add One</h2>
					<table align="center">
						<tbody>
							<tr>
								<td >
									<h3>Title: </h3>
									<input type="text" id="title" onChange={e => this.changedInput(e)} value={this.state.title} required ></input>
								</td>

								<td >
									<h3>Author: </h3>
									<input type="text" id="author" onChange={e => this.changedInput(e)} value={this.state.author} required></input>
								</td>

								<td >
									<h3>Publisher: </h3>
									<input type="text" id="publisher" onChange={e => this.changedInput(e)} value={this.state.publisher} required></input>
								</td>
								<td >
									<h3>Pubblication Date: </h3>
									<input type="date" id="pubblication_date" onChange={e => this.changedInput(e)} value={this.state.pubblication_date} required></input>
								</td>
								<td >
									<h3>Price: </h3>
									<input type="number" id="price" onChange={e => this.changedInput(e)} value={this.state.price} required></input>
								</td>
								<td >
									<h3>Image: </h3>
									<input type="text" id="image" onChange={e => this.changedInput(e)} value={this.state.image} required></input>
								</td>


							</tr>
						</tbody>
					</table>
					<input type="submit" value="Add"/>
				</form>

				<form className="addJson" onSubmit={this.addJson}>

					<h2>Add JSON File</h2>
					<input type="file" id="jsonFile"></input>
					<input type="submit" value="Add JSON" />

				</form>

			</>
			
		)
		
	}


}

const mapStateToProps =  state => {
	return{
		items: state.items
	}
}
/*
const mapDispatchToProps = (dispatch) => {
   return {
      onAddItem: (item) => {
         dispatch(addItem(item));
      }
   }
};*/

export default connect(mapStateToProps, null)(Add);