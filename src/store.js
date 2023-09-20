import { configureStore, createSlice } from '@reduxjs/toolkit';
//state 보관함 => store

//useState()와 비슷한 역할
let user = createSlice({
  name: 'user', //name:'state이름~~',
  initialState: 'kim', //값
}); //state하나를 slice라고 부른다.

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
