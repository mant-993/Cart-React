import React from 'react'
import {connect} from "react-redux"
import {setUser} from '../actions/actionList'

class ProfilePage extends React.Component {
	constructor(props){
		super(props)

		this.logOut = this.logOut.bind(this)
	}


	logOut(e){
		e.preventDefault()
		const data = {
			message: "User Log Out",
			username: null,
			token: null,
		}
		this.props.setUser(data)

	}

	render() {
		return(
			<div align="center">
				<h1> Welcome {this.props.username} </h1>
				<button onClick={ (e) => this.logOut(e) }>Log Out</button>
			</div>
		)	
	}
}

const mapStateToProps =  state => ({

	 token : state.token,
	 username : state.profile.username,
})

export default connect(mapStateToProps, {setUser})(ProfilePage)