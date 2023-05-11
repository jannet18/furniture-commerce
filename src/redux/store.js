import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import FavoriteSlice from "./slices/FavoriteSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        favorite: FavoriteSlice,
    }
})

export default store;