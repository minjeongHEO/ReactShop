// /* eslint-disable */
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addAge, changeName } from '../../store/userSlice.js';

function CartPage() {
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
            <th>#</th>
            <th>상품명d</th>
            <th>수량</th>
            <th>변경하기</th>
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
                <button onClick={() => dispatch(changeName())}>변경하기</button>
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
