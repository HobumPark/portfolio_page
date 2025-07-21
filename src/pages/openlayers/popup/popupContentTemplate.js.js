// popupContentTemplate.js
export const getPopupContentHtml = (feature, pollutionData) => {

  console.log('팝업에 넘어온 데이터')
  console.log(pollutionData)
  
  const name = feature.get('name') || '이름 없음';
  // 예: 오염농도 데이터도 feature에서 받아서 추가 가능
  return `
    <strong>${name}</strong>
    <div>이산화황: ${pollutionData.so2Value+' ppm' || '정보 없음'}</div>
    <div>오존: ${pollutionData.o3Value+' ppm' || '정보 없음'}</div>
    <div>일산화탄소: ${pollutionData.coValue || '정보 없음'}</div>
    <div>이산화질수: ${pollutionData.no2Value || '정보 없음'}</div>
    <div>미세먼지: ${pollutionData.pm10Value+' ㎍/㎥' || '정보 없음'}</div>
    <div>초미세먼지: ${pollutionData.pm25Value+' ㎍/㎥' || '정보 없음'}</div>
  `;
};