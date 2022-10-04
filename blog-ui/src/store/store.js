import {logger} from "redux-logger/src";
import favorites, {loadFavoritesFromStorage, subscribeToStore} from "./slices/favorites/favoritesSlice";
import user from "./slices/user/userSlice";
import {configureStore} from "@reduxjs/toolkit";


const buildStore = () => {
    const store = configureStore(
        {
            reducer: {
                favorites, user
            },
            middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
            preloadedState: {
                favorites: loadFavoritesFromStorage()
            }
        }
    );

    subscribeToStore(store);
    return store;
}


const store = buildStore();
export default store;