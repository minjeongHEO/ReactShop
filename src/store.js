import { configureStore, createSlice } from '@reduxjs/toolkit';
//state 보관함 => store

//useState()와 비슷한 역할
let user = createSlice({
  name: 'user', //name:'state이름~~',
  initialState: 'kim', //값
  reducers: {
    //1.state 수정해주는 함수만들기
    changeName(state) {
      //파라미터는 기존 스테이트값('kim')
      return `${state} to change name`;
    },
    otherFunc() {},
  },
}); //state하나를 slice라고 부른다.

//slice변수명.actions => reducers 값이 object형식으로 남는다.
export let { changeName, otherFunc } = user.actions;

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
