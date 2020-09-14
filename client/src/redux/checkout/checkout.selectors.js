import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)
;
export const selectPrice = createSelector(
    [selectCart],
    cart => cart.cartItems
);