import { createSlice } from '@reduxjs/toolkit';

//useState()와 비슷한 역할
let user = createSlice({
  name: 'user', //name:'state이름~~',
  initialState: { name: 'kim', age: 20 }, //값
  reducers: {
    //1.state 수정해주는 함수만들기
    changeName(state) {
      //파라미터는 기존 스테이트값('{ name: 'kim', age: 20 }')

      // return { name: 'heo', age: 20 };
      state.name = 'heo'; //array/object의 경우 직접 수정해도 state변경됨( 자동으로 설치된 immer.js 라이브러리 때문)
    },
    addAge(state, action) {
      state.age += action.payload;
    },
  },
}); //state하나를 slice라고 부른다.

//slice변수명.actions => reducers 값이 object형식으로 남는다.
export let { changeName, addAge } = user.actions;

export default user;
