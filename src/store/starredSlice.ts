import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StarredState {
  starredIds: string[];
}

const initialStarredState: StarredState = {
  starredIds: [],
};

const starredSlice = createSlice({
  name: 'starredItems',
  initialState: initialStarredState,
  reducers: {
    switchStar: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (state.starredIds.includes(itemId)) {
        state.starredIds = state.starredIds.filter(starId => starId !== itemId);
      } else {
        state.starredIds.push(itemId);
      }
    },
    updateStarred: (state, action: PayloadAction<string[]>) => {
      state.starredIds = action.payload;
    },
  },
});

export const { switchStar, updateStarred } = starredSlice.actions;
export default starredSlice.reducer;
