// store/index
import Vuex from 'vuex';
import products from './products';
import form from './form';

const createStore = () => {
  return new Vuex.Store({
    modules: {
        products,
        form
    },
  });
};


export default createStore;
