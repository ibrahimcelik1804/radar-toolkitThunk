import { createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../../constant";
import axios from "axios";

export const getFlights = createAsyncThunk("flight/getFlights", async() => {
    //1.api'ye istek attık
  const res = await axios.request(options);
 //2. gelen veriyi formatladık
 const refinedData= res.data.aircraft.map((i)=>({
    id:i[0],
    code:i[1],
    lat:i[2],
    lng:i[3],
  }));
  // formatlanan veriyi payload olarak belirle
  return refinedData;

});
