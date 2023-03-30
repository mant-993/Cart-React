import { v4 as uuidv4 } from 'uuid';
import {SET_USER, LOAD_ITEMS, LOAD_CART_ITEMS, HOME_BRANCH} from './types'



export const setUser = result => {
  return {
    type: SET_USER,
    payload: result
  }
}

export const loadItems = items => {
  return {
    type: LOAD_ITEMS,
    payload: items
  }
}

export const loadCartItems = cartItems => {
  return {
    type: LOAD_CART_ITEMS,
    payload: cartItems
  }
}

export const homeBranch = branch => {
  return {
    type: HOME_BRANCH,
    payload: branch
  }
}

