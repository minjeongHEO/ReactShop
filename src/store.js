import { configureStore, createSlice } from '@reduxjs/toolkit';
//state 보관함 => store

//useState()와 비슷한 역할
let user = createSlice({
  name: 'user', //'state이름',
  initialState: 'kim', //값
}); //state하나를 slice라고 부른다.

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

export default configureStore({
  //*2!!중요!! 여기에 등록까지해야 사용가능
  reducer: {
    //작명 : 등록할slice변수명.reducer
    user: user.reducer,
    stock: stock.reducer,
  },
});
