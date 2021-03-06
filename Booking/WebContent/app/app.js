const HomePage = { template: '<home-page></home-page>' }
const LoginPageTemp = { template: '<login-page-temp></login-page-temp>' }
const UserProfile = { template: '<user-profile></user-profile>' }
const allUsers = { template: '<all-users></all-users>' }
const allHostUsers = { template: '<all-users-host></all-users-host>' }
const allAmenities = { template: '<all-amenities></all-amenities>' }
const allApartments = { template: '<all-apartments></all-apartments>' }
const addApartment = { template: '<add-apartment></add-apartment>' }
const editApartment = { template: '<edit-apartment></edit-apartment>' }
const allReservations = { template: '<all-reservations></all-reservations>' }
const addReservation = { template: '<add-reservation></add-reservation>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: HomePage},
	   { path: '/userProfile', component: UserProfile},
	   { path: '/allUsers', component: allUsers},
	   { path: '/allHostUsers', component: allHostUsers},
	   { path: '/allAmenities', component: allAmenities},
	   { path: '/allApartments', component: allApartments},
	   { path: '/addApartment', component: addApartment},
	   { path: '/editApartment', component: editApartment},
	   { path: '/allreservations', component: allReservations},
	   { path: '/addreservation', component: addReservation}
	  ]
});

Vue.use(VeeValidate)
var app = new Vue({
	router,
	el: '#booking'
});