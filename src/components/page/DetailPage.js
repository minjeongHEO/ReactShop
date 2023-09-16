/* eslint-disable */
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

let ColorBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == 'pink' ? 'white' : 'black')};
  padding: 10px;
`;
//기존 스타일 복사하기
let NewColorBtn = styled(ColorBtn)`
  background: red;
`;

let BlackBox = styled.div`
  background: grey;
  padding: 20px;
`;

const DetailPage = (props) => {
  let { id } = useParams(); // 구조 분해 할당 (let id  = useParams().id;) //파라미터로 받은 값
  // const selectedData = data.find((item) => item.id === parseInt(id));
  let filteredData = props.data.filter((item) => item.id === parseInt(id));

  return (
    <div className="container">
      <BlackBox>
        <NewColorBtn bg="pink">버튼</NewColorBtn>
      </BlackBox>
      <div className="row">
        <div className="col-md-6">
          <img src={filteredData[0].img} width="100%" alt="" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{filteredData[0].title}</h4>
          <p>{filteredData[0].content}</p>
          <p>{filteredData[0].price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
