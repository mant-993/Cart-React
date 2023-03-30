import React from "react";
import {connect} from "react-redux"
import {
   BrowserRouter as Router,
   Link,
   Routes,
   Route,
   Navigate
} from 'react-router-dom';
import TimeFunction from "./components/TimeFunction";
import EntryItemList from "./components/EntryItemList";


const items = [
   { id: 1, name: "Pizza", amount: 80, spendDate: "2020-10-10", category: "Food" },
   { id: 2, name: "Grape Juice", amount: 30, spendDate: "2020-10-12", category: "Food" },
   { id: 3, name: "Cinema", amount: 210, spendDate: "2020-10-16", category: "Entertainment" },
   { id: 4, name: "Java Programming book", amount: 242, spendDate: "2020-10-15", category: "Academic" },
]


class Test extends React.Component  {
   constructor(props){

      super(props)

   }





   render(){

         /*
         if(this.state.verified == false){
            this.verifyToken()
         }*/
         if(this.props.token == null){
            return <Login />
         }
         else{
            return (
      	     <Router>
                  <div>
                     <ul>
                        <nav id="links">
                           <li><Link to="/time">Time</Link></li>
                           <li><Link to="/elist">EntryItemList</Link></li>
                        </nav>
                     </ul>

                     <Routes>

                        <Route path="/time" element={<TimeFunction />}> </Route>
                        <Route path="/elist" element={<EntryItemList items={items}/>}> </Route>
                        
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

   }
}

export default connect(mapStateToProps, null)(Test)
