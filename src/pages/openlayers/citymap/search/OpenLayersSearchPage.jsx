import React, { useState, useEffect } from 'react';
import '../css/OpenLayersSearchPage.css';  // css 임포트
import { fetchPollutionData } from '../../api/pollution';

import PollutionInfo from './PollutionInfo';
import PollutionList from './PollutionList';
import Pagination from './Pagination';

// 시/도 옵션 배열
const cityOptions = ['서울', '경기', '세종', '대구', '대전', '부산', '울산', '광주'];

const OpenLayersSearchPage = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const [pollutionItems, setPollutionItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity) return;

      try {
        const result = await fetchPollutionData(selectedCity);
        setPollutionItems(result);
        setTotalCount(result.length);
        setSearchCity('')
        setCurrentPage(1);
      } catch (error) {
        console.error("오염 데이터 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [selectedCity]);

  const searchCityClick = async() => {
    // 예: stationName에 searchCity가 포함된 항목 찾기
    if(searchCity.trim()===""){
      //alert('초기화')
      const result = await fetchPollutionData(selectedCity);
      setPollutionItems(result);
      setTotalCount(result.length);
      setSearchCity('')
      setCurrentPage(1);
      return
    }

    const matchedItems = pollutionItems.filter(item =>
      item.stationName.includes(searchCity)
    );

    if (matchedItems.length === 0) {
      alert('일치하는 항목이 없습니다.');
    } else {
      console.log('검색 결과:', matchedItems);
      setPollutionItems(matchedItems);  // 필터링된 데이터로 리스트 업데이트
      setTotalCount(matchedItems.length);
      setCurrentPage(1);
    }
  }

  const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchCityClick();
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = pollutionItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* 상단 셀렉트박스 */}
      <div className="select-container">
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
          }}
        >
          <option value="">시/도 선택</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={enterKeyPress}
          disabled={!selectedCity}
          className={!selectedCity ? 'input-disabled' : ''}
        />

        <button
          onClick={searchCityClick}
          disabled={!selectedCity}
          className={!selectedCity ? 'btn-disabled' : ''}
        >
          검색
        </button>
      </div>

      <div className="pollution-wrapper">
        <PollutionInfo/>
        <PollutionList data={currentData} />
        <Pagination
          totalItems={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default OpenLayersSearchPage;
