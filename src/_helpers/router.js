import Vue from "vue";
import Router from "vue-router";

import UserPage from "../pages/user/UserPage";

Vue.use(Router);

export const router = new Router({
	mode: "history",
	routes: [
		{ path: "/", component: UserPage, name: "user" },
	    // otherwise redirect to home
	    { path: '*', redirect: '/' }
	]
});

router.beforeEach((to, from, next) => {
	// handle page redirection

	next();
})