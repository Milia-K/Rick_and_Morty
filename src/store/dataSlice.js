import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async function(){
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    const characters = data.results;
    return characters;
  }
)


const dataSlice = createSlice({
  name: 'data',
  initialState: {
    characters: [],
    loading: 'idle',
    error: null,
    selectedCharacter: null,
  },
  reducers: {
    selectCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
    updateCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
    updateCharacters: (state, action) => {
      state.characters = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.characters = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
  }
  
});

export const { setCharacters, selectCharacter, updateCharacter, updateCharacters } = dataSlice.actions;
export default dataSlice.reducer;
