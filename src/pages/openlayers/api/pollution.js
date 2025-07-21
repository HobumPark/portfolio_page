import axios from 'axios';

const API_KEY= "WTCpG8PpTyJHtJq4PuN2ZisTq05pZWYfraqhzobTtnrHxPSV%2BItG86grwEK6HUXJG%2B8cLWoNc4wUrrL1PGVxYA%3D%3D"
const defaultQueryString=`returnType=json&numOfRows=100&pageNo=1&ver=1.0`

export const fetchPollutionData = async ( cityName="서울" ) => {

  const url =`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${API_KEY}&${defaultQueryString}&sidoName=${cityName}`

  try {
    const response = await axios.get(url, {
        
    });
    console.log('오염데이터')
    console.log(response.data.response.body.items)
    return response.data.response.body.items;
  } catch (error) {
    console.error('오염 데이터 요청 실패:', error);
    throw error;
  }
};