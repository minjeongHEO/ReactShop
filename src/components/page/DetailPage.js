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
  let [inputData, setInputData] = useState('');
  /** 2초 팝업 */
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

  /** input태그 숫자 값 확인 */
  // useEffect(() => {
  //   if (!/^\d*$/.test(inputData)) {
  //     alert('숫자만 입력하세요!');
  //     setInputData('');
  //   }
  // }, [inputData]);

  const numberCheck = (e) => {
    let value = e.target.value;
    // setInputData(value);
    if (!/^\d*$/.test(value)) {
      // 숫자가 아니라면
      alert('숫자만 입력하세요!');
      value = value.replace(/\D/g, '');
      setInputData(value); // 여기에 해당 input에 value를 ''로 바꿔줍니다.
    } else {
      setInputData(value); // 숫자라면 inputData 상태 업데이트
    }
    console.log(value);
  };

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
          <input className="numberInput" value={inputData} onChange={numberCheck} placeholder="숫자만 입력하세요."></input>
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
/*
- 정규 표현식 유효성 검사
  ^는 문자열의 시작을 의미합니다.
  \d는 모든 숫자를 의미합니다. 이는 [0-9]와 동일합니다.
  *는 앞의 요소가 0번 이상 반복될 수 있음을 의미합니다.
  $는 문자열의 끝을 의미합니다.
  \D는 정규 표현식에서 숫자가 아닌 모든 문자를 의미하며,
  /g는 전역 플래그(global flag)로, 문자열 전체에서 해당 패턴을 찾아라는 의미입니다.
- onChange와 onKeyUp의 차이
  onChange와 onKeyUp은 둘 다 JavaScript에서 제공하는 이벤트 핸들러입니다. 둘 다 사용자의 입력에 반응하지만, 발생하는 시점과 처리하는 방식에 차이가 있습니다.
  * onChange: 이 이벤트는 사용자가 입력 필드의 값을 변경하고 포커스를 다른 곳으로 옮길 때 발생합니다. 즉, 사용자가 입력을 완료하고 해당 필드에서 벗어날 때마다 실행됩니다.
               ***React에서는 조금 다르게 동작하여, 사용자가 입력할 때마다 바로바로 발생합니다.
  * onKeyUp: 이 이벤트는 키보드의 키를 눌렀다가 뗐을 때 발생합니다. 따라서, 각각의 키입력에 대해 실시간으로 반응하며, 모든 키에 대해 반응한다는 점에서 onChange와 차이를 보입니다.
  두 이벤트 핸들러 중 어느 것을 사용할지는 상황과 요구 사항에 따라 달라집니다.

  실시간으로 모든 키입력을 추적하거나 특정 키입력(예: Enter키)에 반응해야 하는 경우 onKeyUp이 적합할 수 있습니다.
  입력 값의 유효성 검사나 형식화 등을 수행하려면 보통 onChange를 사용합니다.
  그러나 앞서 설명한대로 React에서는 onChange도 실시간으로 작동하기 때문에 일반적인 유효성 검사나 실시간 업데이트 등의 목적으로 주로 사용됩니다
*/
