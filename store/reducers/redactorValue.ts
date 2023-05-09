import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IRedactorState {
  queryValue: string;
  variablesValue: { [key: string]: unknown };
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
  variablesValue: { n: 'Rick' },
};

const redactorValue = createSlice({
  name: 'redactorValue',
  initialState,
  reducers: {
    setRedactorValue: (state, action: PayloadAction<string>) => {
      state.queryValue = action.payload;
    },
    setVariablesValue: (state, action: PayloadAction<{ [key: string]: unknown }>) => {
      state.variablesValue = action.payload;
    },
  },
});

export const { setRedactorValue, setVariablesValue } = redactorValue.actions;

export default redactorValue.reducer;
