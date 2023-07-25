import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataItem {
  id: number,
  company: string,
  duty: string,
  labour: string,
  professionalism: string,
  workStart: string,
  workEnd: string,
  options: boolean,
}
export interface EducationItem{
  id:number,
  attestat: string,
country: string,
end: string,
ielts:string,
ixtisas:string,
lokal: {
  testName: string, bal: number, maxbal: number
},
elave:{
  elaveTestName:string,
  elaveBal:number,
  elaveMaxbal:number
},
reading:boolean
sat: string
start: string
toffiel:string, 
university: string,
}
interface MyState {
  datas: DataItem[];
  currentPage: number;
  educationID:string;
  educationPage: number;
  education:EducationItem[];
  dataPage:number;
}

const initialState: MyState = {
  datas: [],
  currentPage: 1,
  educationPage:1,
  educationID:'',
  education:[],
  dataPage:1,
};

const dataSlice = createSlice({
  name: 'dataa',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<DataItem>) => {
      state.datas.push(action.payload);
    },
    removeData: (state, action: PayloadAction<DataItem>) => {
        const copy = state.datas.filter((x)=> x.id !== action.payload.id)
        state.datas= copy
    },
    addEducation:(state,action:PayloadAction<EducationItem>)=>{
      state.education.push(action.payload);
    },
    removeEducation:(state,action:PayloadAction<EducationItem>)=>{
      const copy = state.education.filter((x)=> x.id !== action.payload.id)
        state.education= copy
    },
    addPage:(state,action)=>{
        state.currentPage = state.currentPage + action.payload
    },
    apg:(state,action)=>{
      state.educationPage = action.payload
    },
    dtpg:(state,action)=>{
      state.dataPage = action.payload
    },
    delPage:(state,action)=>{
        state.currentPage = state.currentPage - action.payload
    },
    addDataPage:(state,action)=>{
      state.dataPage= state.dataPage + action.payload
    },
    addEducationPage:(state,action)=>{
      state.educationPage = state.educationPage + action.payload
  },
  delEducationPage:(state,action)=>{
      state.educationPage = state.educationPage - action.payload
  },
    idAdd:(state,action)=>{
      state.educationID = action.payload
    }
  },
});

export const { addData ,removeData,addPage,delPage,idAdd,addEducation,removeEducation,addEducationPage,delEducationPage,addDataPage,apg,dtpg} = dataSlice.actions;
export default dataSlice.reducer;