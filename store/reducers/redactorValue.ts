import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IRedactorState {
  queryValue: string;
  variablesValue: string;
  responceValue: string;
}

const initialState: IRedactorState = {
  queryValue: `query GetAll($n: String) {
    characters(filter: {name: $n}) {
      info {
        count
      }
      results {
      name
      status
    }
    }
  }`,
  variablesValue: `{ "n": "Smit" }`,
  responceValue: '',
};

const redactorValue = createSlice({
  name: 'redactorValue',
  initialState,
  reducers: {
    setRedactorValue: (state, action: PayloadAction<string>) => {
      state.queryValue = action.payload;
    },
    setVariablesValue: (state, action: PayloadAction<string>) => {
      state.variablesValue = action.payload;
    },
    setResponceValue: (state, action: PayloadAction<string>) => {
      state.responceValue = action.payload;
    },
  },
});

export const { setRedactorValue, setVariablesValue, setResponceValue } = redactorValue.actions;

export default redactorValue.reducer;
