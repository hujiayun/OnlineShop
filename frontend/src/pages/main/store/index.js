import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    keywords: "",
    brand: "",
    maxPrice: 0,
    signedIn: false,
    cart: {},
  },
  mutations: {
    updateSignedIn(state, token) {
      if (token !== null) {
        state.signedIn = true;
      } else {
        state.signedIn = false;
      }
    },
    updateKeywords(state, kw) {
      state.keywords = kw;
    },
    updateBrand(state, b) {
      state.brand = b;
    },
    updateMaxPrice(state, mp) {
      state.maxPrice = mp;
    },
    addToCart(state, params) {
      if (state.cart[params.id] !== undefined) {
        state.cart[params.id].quantity += params.quantity;
      } else {
        state.cart[params.id] = {};
        state.cart[params.id].quantity = params.quantity;
        state.cart[params.id].price = params.price;
        state.cart[params.id].title = params.title;
        state.cart[params.id].isDisabled = false;
        state.cart[params.id].error = "";
      }
    },
    clearCart(state) {
      state.cart = {};
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
