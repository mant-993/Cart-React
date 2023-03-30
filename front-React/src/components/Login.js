import React from 'react'
import {connect} from "react-redux"
import axios from "axios";
import {setUser} from '../actions/actionList'
import "./Login.css"




class Login extends React.Component {
	constructor(props){

		super(props)

		
		this.changedInput = this.changedInput.bind(this);
		this.logIn = this.logIn.bind(this)

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
			case 'username':
				this.setState({username: val})
				this.credentials.username = val
				break;
			case 'password':
				this.setState({password: val})
				this.credentials.password = val
				break;
			default:
				break;
		}
			
	}


	logIn(e){
		e.preventDefault()

		var token = '';

		const data = {
			username : this.credentials.username, 
			password : this.credentials.password,
		}

		const configuration = {
              method: "post",
              url: "http://localhost:3000/login",
              data : data
            };

		axios(configuration)
        .then((result) => {
            console.log(result.data)
            this.props.setUser(result.data)


        })
        .catch((error) => {
            //console.log("ERROR")
            console.log(error);
		
        });
				
	}



	render(){
		return(
			<div className="logDiv">
				<h1> Login Here </h1>
				<form key="Login">
					<h2>Username</h2>
					<input type="text" id="username" onChange={e => this.changedInput(e)} value={this.state.username} ></input>
					<h2>Password</h2>
					<input type="password" id="password" onChange={e => this.changedInput(e)} value={this.state.password} ></input>

					<p><input type="submit" value="Log In" onClick={e => this.logIn(e)} ></input></p>
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


export default connect(mapStateToProps, {setUser})(Login);