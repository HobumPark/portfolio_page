import React from 'react';
import Pollution from './Pollution';
import '../css/PollutionList.css';  // css 임포트

const PollutionList = ({ data }) => {
  return (
    <div className="pollution-list-container">
      {data.length === 0 ? (
        <p>데이터가 없습니다.</p>
      ) : (
        data.map((item, index) => (
          <div key={index} className="pollution-list-item">
            <Pollution data={item} />
          </div>
        ))
      )}
    </div>
  );
};

export default PollutionList;
