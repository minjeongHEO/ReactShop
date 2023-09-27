/* eslint-disable */
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';

import data from './data.js';
import Loading from './components/Loading.js';
import MainNav from './components/Navbar.js';
import MainContainer from './components/MainContainer.js';
// import DetailPage from './components/page/DetailPage.js';
// import CartPage from './components/page/CartPage.js';
const DetailPage = lazy(() => import('./components/page/DetailPage.js')); //lazy:필요해질 때 import하는법
const CartPage = lazy(() => import('./components/page/CartPage.js'));

import 'swiper/css';
import './App.css';

import mainImg1 from './assets/images/main1.jpg';
import mainImg2 from './assets/images/main2.jpg';
import mainImg3 from './assets/images/main3.jpg';

export let context1 = createContext(); //context를 만들어줌 = state보관함

function App() {
  let [shoes, setShoes] = useState(data);
  let [click, setClick] = useState(2);
  const [loading, setLoading] = useState(false);
  const noVisible = {
    visibility: 'hidden',
  };

  const [scrollY, setScrollY] = useState(0);
  const [quickMenuPosition, setQuickMenuPosition] = useState('top'); // 초기 위치

  useEffect(() => {
    let getObj = localStorage.getItem('history');
    if (!getObj) {
      localStorage.setItem('history', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치를 감지해서 위치값 useState에 저장
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // 스크롤 위치에 따라 퀵 메뉴의 위치 업데이트
      if (currentScrollY > 100) {
        setQuickMenuPosition('fixed'); // 스크롤이 일정 위치 이상으로 내려갔을 때 퀵 메뉴를 고정
      } else {
        setQuickMenuPosition('top'); // 스크롤이 일정 위치 미만일 때 퀵 메뉴를 원래 위치로
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const doongStyle = {
    width: '257px',
    height: '428px',
    backgroundColor: 'black',
    color: 'white',
    zIndex: '50',
    position: quickMenuPosition,
    top: '0',
  };

  return (
    <>
      {/* Route == page */}
      <MainNav />

      {/* <Link to="/detail">상세페이지</Link> */}

      <Suspense fallback={<div>로딩중입니다</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <div className="doong" style={doongStyle}></div> */}
                {/* <Swiper className="main-bg" spaceBetween={10} slidesPerView={1} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}> */}
                <Swiper className="main-bg" spaceBetween={10} slidesPerView={1}>
                  <SwiperSlide>
                    <div className="mainSlide1" style={{ backgroundImage: `url(${mainImg1})` }}></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="mainSlide1" style={{ backgroundImage: `url(${mainImg2})` }}></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="mainSlide1" style={{ backgroundImage: `url(${mainImg3})` }}></div>
                  </SwiperSlide>
                </Swiper>

                {loading ? <Loading /> : null}
                <MainContainer shoes={shoes} />

                <button
                  style={click > 3 ? noVisible : {}}
                  onClick={() => {
                    setLoading(true);
                    setClick(click + 1);
                    if (click > 3) {
                      return false;
                    }
                    axios
                      .get(`https://codingapple1.github.io/shop/data${click}.json`)
                      .then((res) => {
                        let addCopy = [...shoes, ...res.data];
                        setShoes(addCopy);
                        setLoading(false);
                      })
                      .catch((e) => {
                        console.error(e);
                        setLoading(false);
                      });
                  }}
                >
                  더보기
                </button>
              </>
            }
          />

          <Route path="/deta" element={<DetailPage shoes={shoes} />} />
          {/* 404페이지 */}
          {/* <Route path="*" element={<div>없는 페이지 입니다.</div>} /> */}

          <Route
            path="/event"
            element={
              <>
                <h2>오늘의 이벤트</h2>
                <Outlet></Outlet>
              </>
            }
          >
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>

          <Route
            path="/detail/:id"
            element={
              <context1.Provider value={{ shoes, click }}>
                <DetailPage data={shoes} />
              </context1.Provider>
            }
          />

          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
