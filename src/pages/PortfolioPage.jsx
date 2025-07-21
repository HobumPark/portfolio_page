import React from 'react';
import './PortfolioPage.css';
import profile from '../assets/profile.jpg';
import spring from '../assets/skill/spring.png';
import react from '../assets/skill/react.png';
import htmlcss from '../assets/skill/HTML&CSS.png';
import javaScript from '../assets/skill/javaScript.png';
import typescript from '../assets/skill/typescript.png';
import oracle from '../assets/skill/oracle.png';
import mysql from '../assets/skill/mysql.png';

const PortfolioPage = () => {
  return (
    <div className="portfolio-container">
      <div className="portfolio-left">
        <section>
          <h1>소개</h1>
          <p>
            <img src={profile} alt="" />
          </p>
          <p>안녕하세요! 박호범입니다. 저는 React와 Spring을 활용해 풀스택 개발을 합니다.</p>
        </section>

        <section>
          <h1>스킬셋</h1>
          <ul>
            <li>React, React Hooks</li>
            <li>Spring, Spring boot</li>
            <li>HTML, CSS</li>
            <li>JavaScript, Jquery</li>
            <li>Oracle, MySQL</li>
            <li>OpenLayers</li>
          </ul>
          <div className="skill-set-list">
            <img src={spring} alt="" />
            <img src={react} alt="" />
            <img src={htmlcss} alt="" />
            <img src={javaScript} alt="" />
            <img src={typescript} alt="" />
            <img src={oracle} alt="" />
            <img src={mysql} alt="" />
          </div>
        </section>

        <section>
          <h1>연락처</h1>
          <p>Email: gloryofalive@naver.com</p>
          <p>GitHub: <a href="https://github.com/HobumPark" target="_blank" rel="noreferrer">github.com/HobumPark</a></p>
        </section>
      </div>

      <div className="portfolio-right">
        <section>
          <h1>학력</h1>
          <ul>
            <li>경북대학교 컴퓨터공학과 졸업</li>

          </ul>
        </section>
        <section>
          <h1>경력</h1>
          <ul>
            <li></li>

          </ul>
        </section>
        <section>
          <h1>프로젝트</h1>
          <ul>
            <li><a href="https://yts-movie-search.netlify.app/" target="_blank" rel="noopener noreferrer">영화 검색 페이지 (React+YTS API)</a></li>
            <li><a href="https://cosmetic-search-pj.netlify.app/" target="_blank" rel="noopener noreferrer">화장품 검색 페이지 (React+MakeUp API)</a></li>
            <li><a href="https://react-openlayer-pollution.netlify.app/" target="_blank" rel="noopener noreferrer">전국 대기오염 시각화 페이지 (React+대기오염 공공 API+OpenLayer)</a></li>
          </ul>
        </section>
        <section>
          <h1>미니프로젝트</h1>
          <ul>
            <li><a href="https://react-todo-practice-hb.netlify.app" target="_blank" rel="noopener noreferrer">투두리스트 (React)</a></li>
            <li><a href="https://dogceo-search.netlify.app" target="_blank" rel="noopener noreferrer">개 이미지 검색 (React+DogCEO API)</a></li>
            <li><a href="https://yts-movielist.netlify.app" target="_blank" rel="noopener noreferrer">영화 목록 페이지 (React+YTS API)</a></li>
            <li><a href="https://openweather-serach.netlify.app" target="_blank" rel="noopener noreferrer">날씨검색 페이지 (React+OpenWeather Map API)</a></li>
            <li><a href="https://react-echarts-practice.netlify.app" target="_blank" rel="noopener noreferrer">ECharts 그래프 페이지-실시간,대용량 (React+ECharts)</a></li>
            <li><a href="https://echart-jmeter.netlify.app" target="_blank" rel="noopener noreferrer">ECharts 그래프 페이지-입력 (React+ECharts)</a></li>
            <li><a href="https://openlayer-ceisium-test.netlify.app" target="_blank" rel="noopener noreferrer">OpenLayer,Ceisum 테스트 페이지 (React+OpenLayer+Cesium)</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage;
