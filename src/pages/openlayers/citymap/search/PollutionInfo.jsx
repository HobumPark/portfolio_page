// PollutionInfo.jsx
import React from 'react';
import '../css/PollutionInfo.css';

const PollutionInfo = () => {
  return (
    <div className="pollution-info">
      <span className="good">좋음 (0~30)</span>
      <span className="normal">보통 (31~80)</span>
      <span className="bad">나쁨 (81~150)</span>
      <span className="very-bad">매우 나쁨 (151 이상)</span>
    </div>
  );
};

export default PollutionInfo;
