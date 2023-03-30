import React from "react";
import {connect} from "react-redux"
import {
   BrowserRouter as Router,
   Link,
   Routes,
   Route,
   Navigate
} from 'react-router-dom';
import './App.css';
import Library from "./components/Library";
import Cart from "./components/Cart";
import ProfilePage from "./components/ProfilePage"
import Add from "./components/Add"
import Login from "./components/Login"
import Register from "./components/Register"
import axios from 'axios'



class App extends React.Component  {
   constructor(props){

      super(props)

      this.state = { verified : false}

      this.verifyToken = this.verifyToken.bind(this)


   }




   async verifyToken(){

      let response;

      const configuration = {
         method: "get",
         url: "http://localhost:3000/verify",
         headers: {
           Authorization: `Bearer ${this.props.token}`,
         },
      };


      // make the API call
      response = await axios(configuration)
         .then( (res) => {
               console.log(res)
               this.setState({verified : true})
         })
         .catch( (error) => {
               console.log(error)
               this.setState({verified : false})
         })

   }


   render(){

         /*
         if(this.state.verified == false){
            this.verifyToken()
         }*/
         if(this.props.token == null){
            return( <>
                     <Login />
                     <Register />
                    </>
                  )
         }
         else{
            return (
      	     <Router>
                  <div>
                     <ul>
                        <nav id="links">
                           <li><Link to="/profile">My Profile</Link></li>
      					      <li><Link to="/add">Add Book</Link></li>
                           <li><Link to="/library">Library</Link></li>
                           <li><Link to="/cart">Cart</Link></li>
                        </nav>
                     </ul>


                     <Routes>
                        <Route path="/profile" element={<ProfilePage />}> </Route>
      				      <Route path="/add" element={<Add />}> </Route>
                        <Route path="/library" element={<Library />}> </Route>
                        <Route path="/cart" element={<Cart />}> </Route>                      
                     </Routes>

                  </div>
               </Router>
            )
         }
   }
}

const mapStateToProps =  state => {
   return {

         ...state,
         token : state.token

   }
}

export default connect(mapStateToProps, null)(App)
