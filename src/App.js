/* eslint-disable */
import './App.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import mainImg1 from './assets/images/main1.jpg';
import mainImg2 from './assets/images/main2.jpg';
import mainImg3 from './assets/images/main3.jpg';
import { useState } from 'react';

import MainNav from './components/Navbar.js';
import MainContainer from './components/MainContainer.js';
import DetailPage from './components/page/DetailPage.js';
import axios from 'axios';

import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

function App() {
  let [shoes, setShoes] = useState(data);
  let [click, setClick] = useState(2);
  const noVisible = {
    visibility: 'none',
  };
  return (
    <>
      {/* Route == page */}
      <MainNav />

      {/* <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Swiper className="main-bg" spaceBetween={10} slidesPerView={1} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
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
              <MainContainer shoes={shoes} />
              <button
                style={click > 3 ? noVisible : {}}
                onClick={() => {
                  setClick(click + 1);
                  if (click > 3) {
                    return false;
                  }
                  console.log(`https://codingapple1.github.io/shop/data${click}.json`);
                  axios
                    .get(`https://codingapple1.github.io/shop/data${click}.json`)
                    .then((res) => {
                      let addCopy = [...shoes, ...res.data];
                      setShoes(addCopy);
                    })
                    .catch((e) => {
                      console.error(e);
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

        <Route path="/detail/:id" element={<DetailPage data={shoes} />} />
      </Routes>
    </>
  );
}

export default App;
