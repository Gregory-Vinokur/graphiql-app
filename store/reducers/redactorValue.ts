import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IRedactorState {
  queryValue: string;
  variablesValue: string;
  responseValue: string;
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
  responseValue: '',
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
    setResponseValue: (state, action: PayloadAction<string>) => {
      state.responseValue = action.payload;
    },
  },
});

export const { setRedactorValue, setVariablesValue, setResponseValue } = redactorValue.actions;

export default redactorValue.reducer;
