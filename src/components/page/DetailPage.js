/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import styles from './DetailPage.module.css';
import { cleanup } from '@testing-library/react';
import { Nav, Tab } from 'react-bootstrap';
import { tab } from '@testing-library/user-event/dist/tab';

import { context1 } from '../../App.js';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store.js';

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
  //보관함(context) 해체해주는 함수
  let { shoes } = useContext(context1); //destructuring(구조분해할당)문법
  let dispatch = useDispatch();

  let { id } = useParams(); //*1
  let filteredData = props.data.filter((item) => item.id === parseInt(id));
  const [isVisible, setIsVisible] = useState(true);
  let [inputData, setInputData] = useState('');
  // const [showTooltip, setShowTooltip] = useState(false); //alert 대신 툴팁으로 변경해보자;
  let [tab, setTab] = useState(0);
  let [load, setLoad] = useState('');

  /** 2초 팝업 */
  useEffect(() => {
    let timer = setTimeout(() => {
      setIsVisible(false);
      setLoad('end');
    }, 3000);

    setTimeout(() => {
      setLoad('end');
    }, 2000);

    // *4
    return () => {
      clearTimeout(timer); // *5
    };
  }, [isVisible]); // *6

  useEffect(() => {
    let getHistory = JSON.parse(localStorage.getItem('history'));
    let historySet = new Set(getHistory);
    // historySet.add(id);
    historySet.add(parseInt(id));
    // Set 객체를 배열로 변환 (안하고 바로 localStorage.setItem 시 에러남 )
    const historyArray = Array.from(historySet);
    localStorage.setItem('history', JSON.stringify(historyArray));
  });

  const numberCheck = (e) => {
    let value = e.target.value;
    // *2
    if (!/^\d*$/.test(value)) {
      // 숫자가 아니라면
      alert('숫자만 입력하세요!');
      //alert 대신 툴팁으로 변경해보자;
      // setShowTooltip(true); // 툴팁을 표시
      value = value.replace(/\D/g, '');
      setInputData(value); // 여기에 해당 input에 value를 ''로 바꿔줍니다.
    } else {
      // setShowTooltip(false); // 숫자일 경우 툴팁을 숨김
      setInputData(value); // 숫자라면 inputData 상태 업데이트
    }
  };

  const tabSwitch = (e) => {
    let value = e.target.getAttribute('datatype');
    setTab(value);
  };

  return (
    <div className="container">
      {/* <BlackBox>
        <NewColorBtn bg="pink">버튼</NewColorBtn>
      </BlackBox> */}
      <div className={``}>
        <div className={`alert alert-warning ${isVisible ? '' : styles.fadeOut}`}>2초 이내 구매 시 할인</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {/* <img src={filteredData[0].img} width="100%" alt="" /> */}
          <img src={`https://codingapple1.github.io/shop/shoes${filteredData[0].id + 1}.jpg`} width="100%" alt="" />
        </div>
        <div className="col-md-6">
          {/* //3. */}
          <input className="numberInput" value={inputData} onChange={numberCheck} placeholder="숫자만 입력하세요."></input>
          {/* {showTooltip && <div className="tooltip">숫자만 입력하세요!</div>} */}
          <h4 className="pt-5">{filteredData[0].title}</h4>
          <p>{filteredData[0].content}</p>
          <p>{filteredData[0].price.toLocaleString()}원</p>
          <button className="btn btn-danger" onClick={() => dispatch(addProduct({ id: filteredData[0].id, name: filteredData[0].title }))}>
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" datatype="0" onClick={tabSwitch}>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" datatype="1" onClick={tabSwitch}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" datatype="2" onClick={tabSwitch}>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
      <h1>{shoes[0].title}</h1> //이렇게 props없이도 state사용 가능하다.
    </div>
  );
};

// // function TabContent(props) {
// function TabContent({ tab }) {
//   // if (props.tab == 0) {
//   if (tab == 0) {
//     return <div>내용0</div>; //컴포넌트는 return반드시 넣어야함
//   } else if (tab == 1) {
//     return <div>내용1</div>;
//   } else if (tab == 2) {
//     return <div>내용2</div>;
//   }
// }

function TabContent({ tab }) {
  let { shoes } = useContext(context1);
  let [fade, setFade] = useState('');

  useEffect(() => {
    //*7
    setTimeout(() => {
      setFade('end');
    }, 200);
    //*8
    return () => {
      setFade('');
    };
  }, [tab]);
  return (
    <div className={``}>
      {
        [
          <div>
            <h1>{shoes[tab].content}</h1>
          </div>,
          <div>내용1</div>,
          <div>내용2</div>,
        ][tab]
      }
    </div>
  );
}

export default DetailPage;
/*
1). 구조 분해 할당 (let id  = useParams().id;) //파라미터로 받은 값
  const selectedData = data.find((item) => item.id === parseInt(id));
  ----------------------------------------------------------------------------------------
2). 정규 표현식 유효성 검사
  ^는 문자열의 시작을 의미합니다.
  \d는 모든 숫자를 의미합니다. 이는 [0-9]와 동일합니다.
  *는 앞의 요소가 0번 이상 반복될 수 있음을 의미합니다.
  $는 문자열의 끝을 의미합니다.
  \D는 정규 표현식에서 숫자가 아닌 모든 문자를 의미하며,
  /g는 전역 플래그(global flag)로, 문자열 전체에서 해당 패턴을 찾아라는 의미입니다.
  ----------------------------------------------------------------------------------------
3). onKeyDown과 onChange
  onChange와 onKeyUp은 둘 다 JavaScript에서 제공하는 이벤트 핸들러입니다. 둘 다 사용자의 입력에 반응하지만, 발생하는 시점과 처리하는 방식에 차이가 있습니다.
  * onChange: 이 이벤트는 사용자가 입력 필드의 값을 변경하고 포커스를 다른 곳으로 옮길 때 발생합니다. 즉, 사용자가 입력을 완료하고 해당 필드에서 벗어날 때마다 실행됩니다.
               ***React에서는 조금 다르게 동작하여, 사용자가 입력할 때마다 바로바로 발생합니다.
  * onKeyUp: 이 이벤트는 키보드의 키를 눌렀다가 뗐을 때 발생합니다. 따라서, 각각의 키입력에 대해 실시간으로 반응하며, 모든 키에 대해 반응한다는 점에서 onChange와 차이를 보입니다.
  두 이벤트 핸들러 중 어느 것을 사용할지는 상황과 요구 사항에 따라 달라집니다.
  `onKeyDown` 이벤트는 사용자가 키를 누르는 순간 발생하는 이벤트입니다. 숫자만 입력하도록 제한하는 것도 가능하지만, 
  일반적으로 `onChange` 이벤트를 사용하는 것이 더 적합합니다.

  그 이유는 다음과 같습니다:
  1. **입력 검증**: `onChange`는 입력 값이 변경될 때마다 호출되므로, 입력 값의 유효성을 실시간으로 확인하고 반영할 수 있습니다. 
                    반면에 `onKeyDown`은 키 입력이 발생했을 때만 호출되므로, 다른 방식(예: 마우스로 붙여넣기)으로 변경된 값을 감지할 수 없습니다.
  2. **사용자 경험**: `onKeyDown`을 사용하여 특정 문자의 입력을 막으면, 해당 문자를 타이핑하려고 할 때 아무런 반응이 없어서 사용자가 혼란스러워할 수 있습니다. 
                      반면에 `onChange`를 사용하면, 잘못된 문자가 입력되었음을 바로 알려주거나 자동으로 수정해줄 수 있어서 더 나은 사용자 경험을 제공합니다.
  3. **브라우저 호환성**: 일부 오래된 브라우저에서는 특정 키 코드(예: 숫자 패드의 숫자)를 정확히 인식하지 못하는 경우가 있습니다. 
                        따라서 `onKeyDown`에서 키 코드에 의존하는 로직을 작성하면 예상치 못한 동작이 발생할 수 있습니다.

  따라서 React에서 `<input>` 태그의 값을 제한하거나 검증하기 위해서는 주로 `onChange`, 그리고 필요에 따라 HTML5 유효성 검사 기능 등과 같은 다른 기능들과 함께 활용하는 것이 좋습니다.
----------------------------------------------------------------------------------------
4). useEffect동작 전에 실행되는 return()=>{}

5). 기존코드 치우는 함수(ex.기존 타이머는 제거해주세요 = clearTimeout())
      참고: clean up function은 mount시 실행X, unmount(컴포넌트삭제)시 실행O
      
6). isVisible변수가 변할 때만 실행됨 (처음 페이지 마운트 될 때는 물론 실행됨)
     }, []); : 컴포넌트 마운트되고 1회만 실행시키고 싶으면 이렇게 빈값넣으면 됨

7). 리액트 18버전 이상부터는 automatic batch 라는 기능이 생겼습니다.
    state 변경함수들이 연달아서 여러개 처리되어야한다면
    state 변경함수를 다 처리하고 마지막에 한 번만 재렌더링됩니다.
    그래서 'end' 로 변경하는거랑 ' ' 이걸로 변경하는거랑 약간 시간차를 뒀습니다.
8). clean up function
*/
