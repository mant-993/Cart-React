import React from "react";
import {connect} from "react-redux"
import {
   BrowserRouter as Router,
   Link,
   Routes,
   Route,
   Navigate
} from 'react-router-dom';
import App from "./App";
import Test from "./Test";
import {homeBranch} from "./actions/actionList"


class Home extends React.Component  {
   constructor(props){

      super(props)
      this.routeChange = this.routeChange.bind(this)

   }

   routeChange = (e, branch) =>{ 
      e.preventDefault()
      this.props.homeBranch(branch)
      
   }




   render(){
      //console.log(this.props.branch)
      switch(this.props.branch){

         case "App":

            return (<App />)
            break;

         case "Test":

            return (<Test />)
            break;

         default:

            if(window.location.pathname != '/'){
               window.location.href = '/';
            }


            return(
               <>
                  <h1>Choose branch: </h1>
                  <button onClick={(e)=>this.routeChange(e, "App")}>APP</button>
                  <button onClick={(e)=>this.routeChange(e, "Test")}>TEST</button>
               </>
            )
            break;   

      }
       
   }
}

const mapStateToProps =  state => {
   return {

         ...state,
         branch : state.branch

   }
}

export default connect(mapStateToProps, {homeBranch})(Home)
