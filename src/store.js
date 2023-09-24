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
      /**방법1*/
      state.map((e, i) => {
        if (e.id == action.payload) {
          e.count += 1;
        }
      });
      /**방법2
       * 
      let 번호 = state.findIndex((e) => { return e.id === action.payload}) //*2)
      state[번호].count++
       */
    },
    addProduct(state, action) {
      const { id, name } = action.payload;

      // 이미 카트에 있는 제품인지 확인
      const existingProduct = state.find((product) => product.id === id); //*1)

      if (existingProduct) {
        // 이미 카트에 있는 제품이면 수량만 증가
        existingProduct.count += 1;
      } else {
        // 카트에 없는 제품이면 새로 추가
        state.push({ id, name, count: 1 });
      }
      alert('주문 완료!');

      //return [...state, action.payload];
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

/* 1) Array.prototype.find() 함수
      배열에서 주어진 조건을 만족하는 첫 번째 요소를 반환하는 메서드
      콜백 함수를 사용하여 배열 요소를 순회하면서 조건을 확인하고, 조건을 만족하는 첫 번째 요소를 반환
      만약 조건을 만족하는 요소를 찾지 못하면 undefined를 반환
      배열을 순회하면서 조건을 만족하는 첫 번째 요소를 찾으면 검색을 멈추고 해당 요소를 반환

  1-1) Array.prototype.filter() 함수
      만약 여러 개의 요소를 찾고자 한다면 filter() 함수를 사용하여 모든 조건을 만족하는 요소를 배열로 얻을 수 있습니다

  2) findIndex 함수를 사용하여 배열을 효율적으로 순회하지 않고도 작업을 수행할 수 있습니다.(불필요한 순회 방지)
  2-1) Array.prototype.findIndex() 함수
      배열에서 주어진 조건을 만족하는 첫 번째 요소의 인덱스를 반환하는 메서드입니다.
      이 함수는 배열을 순회하면서 조건을 확인하고, 조건을 만족하는 첫 번째 요소의 인덱스를 반환하거나,
      조건을 만족하는 요소를 찾지 못할 경우 -1을 반환

  2-2) Array.prototype.find() 함수와 Array.prototype.findIndex() 함수 차이점
      find(): find() 함수는 조건을 만족하는 요소 자체를 반환합니다. 
              즉, 배열에서 첫 번째로 조건을 만족하는 요소를 반환합니다.
              요소 자체를 필요로 하는 경우(조건을 만족하는 요소를 수정, 특정 속성을 찾는 경우)
      findIndex(): findIndex() 함수는 조건을 만족하는 요소의 인덱스를 반환합니다. 
                    즉, 배열에서 첫 번째로 조건을 만족하는 요소의 인덱스를 반환합니다.
                     요소의 인덱스를 필요로 하는 경우(요소 삭제, 배열 내에서 요소의 위치를 파악해야 하는 경우)

  ex) const numbers = [1, 2, 3, 4, 5];
    // find()를 사용하여 첫 번째 짝수를 찾음
    const evenNumber = numbers.find((number) => number % 2 === 0);
    console.log(evenNumber); // 2

    // findIndex()를 사용하여 첫 번째 짝수의 인덱스를 찾음
    const evenIndex = numbers.findIndex((number) => number % 2 === 0);
    console.log(evenIndex); // 1 (2의 인덱스)
 */
