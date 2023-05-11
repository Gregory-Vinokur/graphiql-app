import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IBodyQuery } from '../api/graphQLRequest';

interface IRedactorState {
  queryValue: string;
  variablesValue: string;
  responceValue: string;
  bodyQuery: IBodyQuery;
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
  bodyQuery: { bodyQuery: '', var: {} },
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
    setbodyQueryValue: (state, action: PayloadAction<IBodyQuery>) => {
      state.bodyQuery = action.payload;
    },
  },
});

export const { setRedactorValue, setVariablesValue, setResponceValue, setbodyQueryValue } =
  redactorValue.actions;

export default redactorValue.reducer;
