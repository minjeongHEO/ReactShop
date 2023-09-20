// /* eslint-disable */
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function CartPage() {
  //store에 있던 Redux state를 가져와줌
  // let reduxState = useSelector((state) => state);
  let reduxState = useSelector((state) => {
    return state;
    //return state.stock; //이렇게도 사용 가능
  });

  let cartArr = useSelector((state) => {
    return state.cart;
  });

  console.log(cartArr);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
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
                <button>변경하기</button>
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
 */
