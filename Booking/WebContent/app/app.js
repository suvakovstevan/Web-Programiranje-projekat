const HomePage = { template: '<home-page></home-page>' }
const RegistrationPage = { template: '<registration-page></registration-page>' }
const LoginPage = { template: '<login-page></login-page>' }
const LoginPageTemp = { template: '<login-page-temp></login-page-temp>' }
const UserProfile = { template: '<user-profile></user-profile>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: HomePage},
	   { path: '/userProfile', component: UserProfile}
	  ]
});

Vue.use(VeeValidate)
var app = new Vue({
	router,
	el: '#booking'
});