import Vue from "vue";
import VeeValidate from "vee-validate";

import { store } from "./_store";
import { router } from "./_helpers";
import App from "./app/App";

//import custom styles
import styles from "./css/styles.css";
// import bootstrap files
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import v-lazy-load
import { VLazyImagePlugin } from "v-lazy-image";
// import font-awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import Pagination
import Paginate from "vuejs-paginate";


Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(VLazyImagePlugin);

// register components
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("paginate", Paginate);

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    render: h => h(App)
});