import React from 'react';
import '../css/Pollution.css';

const getPm10Level = (pm10) => {
  if (pm10 === null || pm10 === undefined || pm10 === '-') return 'unknown';
  const value = parseInt(pm10, 10);
  if (isNaN(value)) return 'unknown';
  if (value <= 30) return 'good';
  if (value <= 80) return 'normal';
  if (value <= 150) return 'bad';
  return 'very-bad';
};

const Pollution = ({ data }) => {
  const {
    stationName,
    pm10Value,
    pm25Value,
    coValue,
    no2Value,
    o3Value,
    so2Value,
    khaiValue,
  } = data;

  const pm10Class = getPm10Level(pm10Value); // 등급별 클래스 결정

  return (
    <div className={`pollution-container ${pm10Class}`}>
      <strong>{stationName}</strong>
      <div className="pollution-values">
        <div>PM10: {pm10Value} μm</div>
        <div>PM2.5: {pm25Value} μm</div>
        <div>CO: {coValue} ppm</div>
        <div>NO₂: {no2Value} ppm</div>
        <div>O₃: {o3Value} ppm</div>
        <div>SO₂: {so2Value} ppm</div>
        <div>KHAI: {khaiValue} ppm</div>
      </div>
    </div>
  );
};

export default Pollution;
