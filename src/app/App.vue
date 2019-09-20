<template>
	<div>
		<header>
			<b-navbar toggleable="md" type="dark" variant="dark">
				<b-navbar-brand href="/">
					<v-lazy-image class="logo" src="/src/img/vuejs-logo.svg" src-placeholder="/src/img/logo-spinner.gif" /> VueJS BaseCode
				</b-navbar-brand>
				<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
				<b-collapse is-nav id="nav_collapse">
					<b-navbar-nav class="ml-auto">
						<b-nav-item v-bind:active="activePage.name === 'user'" href="/">Users</b-nav-item>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
		</header>
		<main role="main" class="jumbotron mb-0">
			<article class="container">
				<section class="row">
					<router-view></router-view>
				</section>
			</article>
		</main>
		<footer class="bg-secondary">
			<div class="card-body text-center text-white">
				<p class="text-center">&copy; 2018 Rashid Cordero</p>
			</div>
		</footer>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	export default {
		data() {
		    return {
		      	activePage: this.$router.currentRoute
		    }
	  	}
	};
</script>

<!-- scoped on this component -->
<style type="text/css" scoped>
	.logo {
		width: 60px;
		height: 60px;
	}
</style>