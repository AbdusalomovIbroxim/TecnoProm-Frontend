// store/index
import Vuex from 'vuex';
import products from './products';
import categories from './categories';
import auth from './auth';

const createStore = () => {
  return new Vuex.Store({
    modules: {
        products,
        categories,
        auth,
    },
  });
};


export default createStore;
