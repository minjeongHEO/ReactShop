// /* eslint-disable */
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addAge } from '../../store/userSlice.js';
import { addCount } from '../../store.js';
import { memo, useMemo, useState } from 'react';

/* 꼭 필요할 때만 재렌더링하는 memo */
let Child = memo(() => {
  console.log('Child 재렌더링');
  return <div>자식임</div>;
});
function CartPage() {
  console.log('----부모 재렌더링----');
  let [count, setCount] = useState(0);

  let result = useMemo(() => {
    console.log('usememo');
    return Child;
    //return 함수;
  });

  //* useDispatch => store.js에 요청을 보내주는 함수
  let dispatch = useDispatch();
  //* useSelector => store.js에 있던 Redux state를 가져와줌
  // let reduxState = useSelector((state) => state);
  let reduxState = useSelector((state) => {
    return state;
    //return state.stock; //이렇게도 사용 가능
  });

  let cartArr = useSelector((state) => {
    return state.cart;
  });

  return (
    <div>
      <Child count={count} />
      <button
        onClick={() => {
          setCount(count + 1);
          console.log(result);
        }}
      >
        눌러봐
      </button>

      <h6>
        {reduxState.user.name}({reduxState.user.age})의 장바구니
        <button
          onClick={() => {
            dispatch(addAge(10));
          }}
        >
          나이버튼
        </button>
      </h6>
      <Table>
        <thead>
          <tr>
            <th>#NO</th>
            <th>상품명</th>
            <th>수량</th>
            <th>수량 변경</th>
          </tr>
        </thead>
        <tbody>
          {/* 1. */}
          {cartArr.map((e, i) => (
            <tr>
              <td>{i}</td>
              <td>{e.name}</td>
              <td>{e.count}</td>
              <td>
                <button onClick={() => dispatch(addCount(e.id))}>+</button>
                {/* dispatch(state변경함수()) */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CartPage;
/**
 * 1).jsx안에서 map함수는
 * {cartArr.map((e, i) => {})}가 아니라,
 * {cartArr.map((e, i) => ())}로 작성해야 한다.
 * map함수는 return과 중괄호 생략가능
 */
