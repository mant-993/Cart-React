import React from 'react'
import {connect} from "react-redux"
import axios from "axios";




class Register extends React.Component {
	constructor(props){

		super(props)

		
		this.changedInput = this.changedInput.bind(this);
		this.signUp = this.signUp.bind(this)

		this.state = {

			username : '',
			password : '',
		};

		this.credentials = {...this.state}
	}




	changedInput(e) {

		var id = e.target.id;
		const val = e.target.value;

		
		switch(id){
			case 'usernameReg':
				this.setState({username: val})
				this.credentials.username = val
				break;
			case 'passwordReg':
				this.setState({password: val})
				this.credentials.password = val
				break;
			default:
				break;
		}
			
	}


	signUp(e){
		e.preventDefault()

		var token = '';

		const data = {
			email : this.credentials.username, 
			password : this.credentials.password,
		}

		const configuration = {
              method: "post",
              url: "http://localhost:3000/register",
              data : data
            };


		axios(configuration)
        .then((result) => {
            console.log(result.data)
            alert("Registration Successful")


        })
        .catch((error) => {
            //console.log("ERROR")
            console.log(error);
		
        });
				


		

	}

	render(){
		return(
			<div align="center">
				<h1> Register Here</h1>
				<form key="Register">
					<h2>Username</h2>
					<input type="text" id="usernameReg" onChange={e => this.changedInput(e)} value={this.state.username} ></input>
					<h2>Password</h2>
					<input type="password" id="passwordReg" onChange={e => this.changedInput(e)} value={this.state.password} ></input>

					<p><input type="submit" value="Sign Up" onClick={e => this.signUp(e)} ></input></p>
				</form>
			</div>
		)	
	}
}

const mapStateToProps =  state => {
	return{
		...state,
		token: state.token
	}
}


export default connect(mapStateToProps, null)(Register);