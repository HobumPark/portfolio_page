export const fetchSkoreaGeoJsonFile = (map, data) => {
    fetch('/data/skorea-municipalities-2018-geo.json')
      .then((response) => {
        if (!response.ok) throw new Error('네트워크 오류');
        return response.json();
      })
      .then((data) => {
        console.log('읽어들인 데이터(대한민국):', data);
      
      })
      .catch((error) => {
        console.error('파일 읽기 실패:', error);
      });
  };