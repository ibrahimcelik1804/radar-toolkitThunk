export const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
    params: {
      bl_lat: '34.539549',
      bl_lng: '24.847001',
      tr_lat: '43.038861',
      tr_lng: '44.760497',
      limit: '300'
    },
    headers: {
      'X-RapidAPI-Key': 'f1aaeda281mshb7ee696e5ae3b95p1b41b5jsn88b79a740bac',
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  };
  export const options2={
    headers: {
      'X-RapidAPI-Key': 'f1aaeda281mshb7ee696e5ae3b95p1b41b5jsn88b79a740bac',
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  }