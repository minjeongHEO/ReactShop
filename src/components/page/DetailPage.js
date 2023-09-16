/* eslint-disable */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import styles from './DetailPage.module.css';
import { cleanup } from '@testing-library/react';

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

  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    //useEffect동작 전에 실행되는 return()=>{}
    return () => {
      clearTimeout(timer);
      //기존코드 치우는 함수(ex.기존 타이머는 제거해주세요)
      //참고. clean up function은 mount시 실행X, unmount(컴포넌트삭제)시 실행O
    };
  }, [isVisible]); //isVisible변수가 변할 때만 실행됨 (처음 페이지 마운트 될 때는 물론 실행됨)
  // }, []); : 컴포넌트 마운트되고 1회만 실행시키고 싶으면 이렇게 빈값넣으면 됨
  return (
    <div className="container">
      {/* <BlackBox>
        <NewColorBtn bg="pink">버튼</NewColorBtn>
      </BlackBox> */}
      <div className={`alert alert-warning ${isVisible ? '' : styles.fadeOut}`}>2초 이내 구매 시 할인</div>
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
