import {createSlice} from "@reduxjs/toolkit";
import {addToStorage, getFromStorage} from "../../../storage/LocalStorage";

const initialState = [];

const favoritesSlice = createSlice(
    {
        name: 'favorites',
        initialState,
        reducers: {
            addToFavorites(state, {payload: post}){
                const existingPost = state.find(p => p.id === post.id);
                if (existingPost) {
                    return state;
                }else {
                    state.push(post);
                }
            },
            removeFromFavorites(state, {payload : id}){
                return state.filter(p => p.id !== id);
            },
            dropFavorites() {
                return initialState;
            }
        }
    }
);

let favoritesState = [];
const subscribeToStore = (store) => {
    store.subscribe(() => {
        const favorites = store.getState().favorites;
        if(favoritesState !== favorites){
            addToStorage('favorites', favorites);
            favoritesState = favorites;
        }
    });
};

const loadFavoritesFromStorage = () => getFromStorage('favorites') || [];

export default  favoritesSlice.reducer;
export const {addToFavorites, removeFromFavorites, dropFavorites} = favoritesSlice.actions;
export {
    subscribeToStore,
    loadFavoritesFromStorage
}