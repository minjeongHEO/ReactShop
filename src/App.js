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

import data from './data.js';

function App() {
  let [shoes] = useState(data);
  return (
    <>
      <MainNav />

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
    </>
  );
}

export default App;
