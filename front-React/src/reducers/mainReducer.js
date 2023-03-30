import {SET_USER, LOAD_ITEMS, LOAD_CART_ITEMS, HOME_BRANCH} from '../actions/types'
import { v4 as uuidv4 } from 'uuid';


const initialState = {
    branch: null,
    token: null,
    profile: {
        username : null,
        credit : 100.00,
        cart_items : [],
    },
    items: [

        /*
		{title:'To Kill a Mockingbird', author:'Harper Lee', publisher:'Harper Perennial', pubblication_date:'2002-1-1', price: 8.87, image:'https://m.media-amazon.com/images/I/81aY1lxk+9L.jpg'},
		{title:'Lord of the Flies', author:'William Golding', publisher:'Penguin Books', pubblication_date:'2003-12-16', price: 5.75, image:'https://m.media-amazon.com/images/I/81WUAoL-wFL.jpg'},
        {title:'Fahrenheit 451', author:'Ray Bradbury', publisher:'Simon & Schuster', pubblication_date:'2012-1-10', price: 8.29, image:'https://m.media-amazon.com/images/I/61z7RDG3OIL.jpg'},
        {title:'Go Set a Watchman: A Novel', author:'Harper Lee', publisher:'Harper', pubblication_date:'2015-7-14', price: 13.99, image:'https://m.media-amazon.com/images/I/51xiPv5+h1L.jpg'},
        {title:'Dune', author:'Frank Herbert', publisher:'Ace', pubblication_date:'2003-8-26', price: 4.04, image:'https://m.media-amazon.com/images/I/41LmPEurOOL.jpg'},
        {title:'The Little Prince', author:'Antoine de Saint-Exupéry', publisher:'Picador', pubblication_date:'2015-10-8', price: 4.99, image:'https://m.media-amazon.com/images/I/41Y2eFBAoVL.jpg'},
        {title:'Strange Case of Dr Jekyll and Mr Hyde and Other Tales', author:'Robert Louis Stevenson', publisher:'OUP Oxford', pubblication_date:'2008-5-8', price: 3.68, image:'https://m.media-amazon.com/images/I/51nqvR1i7EL.jpg'},
        {title:'The Plague', author:'Albert Camus', publisher:'Grapevine India', pubblication_date:'2022-2-16', price: 0.57, image:'https://m.media-amazon.com/images/I/51WvatRY42L.jpg'},
        {title:'The Canterbury Tales', author:'Geoffrey Chaucer', publisher:'Gale Ncco, Print Editions', pubblication_date:'2017-12-31', price: 0.49, image:'https://m.media-amazon.com/images/I/510pTzfyl3L.jpg'},
        {title:'Dawn\'s Early Light', author:'Elswyth Thane', publisher:'Print On Demand', pubblication_date:'2018-10-19', price: 2.07, image:'https://m.media-amazon.com/images/I/51P2FLora7L.jpg'},
        */

    ]

}

export default function mainReducer(state=initialState, action){
     //console.log("Type: "+ action.type + ". payload: " + JSON.stringify(action.payload))
        
	 switch (action.type) {

        /*
             
    	case ADD_ITEM:
             
            action.payload.id=uuidv4()
            //console.log(action.payload.id)
            
      		return {                 
                ...state,
        		items: [...state.items, action.payload]              
      		}

             
        case REMOVE_ITEM:
             
                 
            state.items = [...state.items.filter(item => item.id !== action.payload)]

            return {
                ...state,
        		items: [...state.items]
                     
            }

        */


        case SET_USER:

            //console.log("OUT: "+JSON.stringify(action.payload))
            //console.log(state.token)

            return {

                ...state,
                token : action.payload.token,
                profile : { ...state.profile, username : action.payload.username },      

            }



        case LOAD_ITEMS:
             
            return {                 
                ...state,
                items: action.payload              
            }



        case LOAD_CART_ITEMS:

            //console.log(action.payload.cartItems)
            
            return {                 
                ...state,
                profile : { ...state.profile, cart_items : action.payload },             
            }

        
        case HOME_BRANCH:

            
            return {                 
                ...state,
                branch : action.payload             
            }
                             

		default:
			return state;
	 }
}

