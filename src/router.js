import Vue from 'vue';
import Router from 'vue-router';
// import Success from './components/conversion/Success';
import OkrsListing from './components/OkrsListing';
// import GlobalStorage from './common/GlobalStorage';
// import * as Constants from './common/Constants';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      components: {"okr-history": OkrsListing},
      beforeEnter: (to, from, next) => { },
    },
    
  ]
})
