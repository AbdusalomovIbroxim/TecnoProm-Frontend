// store/index
import Vuex from 'vuex';
import products from './products';
import resources from './resources';

const createStore = () => {
  return new Vuex.Store({
    modules: {
        products,
        resources,
    },
  });
};


export default createStore;
