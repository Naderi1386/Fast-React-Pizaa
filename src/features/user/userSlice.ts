function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
import { getAddress } from "../../services/apiGeocoding";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateType } from "../card/CartSlice";

export const fetchAddress=createAsyncThunk('user/getAddress',async()=>{
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
})

export interface UserType {
  userName: string;
  status: string;
  position:object,
  address:string,
  error:string
}
const initialState: UserType = {
  userName: "",
  status:'idle',
  position:{},
  address:"",
  error:''
};
type ActionSetUserName = { payload: string };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName(state, action: ActionSetUserName) {
      state.userName = action.payload;
    },
    
  },extraReducers:(bulid)=>bulid.addCase(fetchAddress.pending,(state)=>{
    state.status='loading'
  }).addCase(fetchAddress.fulfilled,(state,action)=>{
    state.status='idle'
    state.address=action.payload.address
    state.position=action.payload.position
  }).addCase(fetchAddress.rejected,(state,action)=>{
    state.status='error'
    state.error='There was a problem getting your address.Make sure to fill this field !'
  })
  
  
});

export const getUserState=(store:StateType)=>store.user


export const { setUserName } = userSlice.actions;

export default userSlice.reducer;
