import axios from 'axios';

export const BASE_URL = 'https://rapidapi.com';

const options = {
  method: 'GET',
  url: 'https://youtube138.p.rapidapi.com/video/details/',
  params: {
    id: '9UrkPTYzt8Y',
    hl: 'en',
    gl: 'US'
  },
  headers: {
    'X-RapidAPI-Key': '053e45ed08mshed9d096d4158cecp110a2bjsn77b6451efe4f',
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    console.error('Error fetching data from API', error);
    return null;
  }
};
