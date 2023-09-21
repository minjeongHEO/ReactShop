import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js';
//state 보관함 => store

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

/* eslint-disable */
let cart = createSlice({
  //eslint-disable-line no-unused-vars
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      state.map((e, i) => {
        if (e.id == action.payload) {
          e.count += 1;
        }
      });
    },
    addProduct(state, action) {
      return [...state, action.payload];
      // state.put(action.payload);안됌
    },
  },
});
/* eslint-enable  */

export default configureStore({
  //*2!!중요!! slice를 여기에 등록까지해야 사용가능
  reducer: {
    //작명 : 등록할slice변수명.reducer
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});

export let { addCount, addProduct } = cart.actions;
