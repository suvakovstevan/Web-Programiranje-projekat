Vue.component("login-page", {
	data: function () {
		    return {
		      user: {
			username:'',
			password:'',
			firstName:'',
			lastName:'',
			gender:'MALE',
			userRole:''
		},
		isLogged : "false"
	}},
	components:{
		
	},
	template: `
<div class="container">
	<div class="row">
	<div class="modal-content">
    					<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
							<h5 class="modal-title">Already have account? Log in</h5>
						</div>
						<form action="" method="post">
							<div class="modal-body">
								<div class="form-group">
									<label for="username">Username</label>
									<input v-validate="'required'" type="text" class="form-control" name="username" v-model="user.username">
									<span class="validation-error">{{ errors.first('username') }}</span>
								</div>
								<div class="form-group">
									<label for="password">Password</label>
									<input v-validate="'required'" type="password" class="form-control" name="password" v-model="user.password">
									<span class="validation-error">{{ errors.first('password') }}</span>
								</div>
							</div>
						<div class="modal-footer">
								<input type="input" class="btn btn-success btn-icon" :disabled="errors.any()" value="Login" v-on:click="login(user)">
								<router-link to="/"><button type="button" class="btn btn-default btn-icon" data-dismiss="modal">Cancel</button></router-link>
							</div>
						</form>
					</div>
	</div>
</div>
`
, methods : {
	login : function(user){
		user.userRole='NOT_REGISTERED'
		axios
		.post('http://localhost:8080/Booking/rest/login',user)
		.then((response) => (this.$bvToast.toast(response.data,
		{title:'User log in',autoHideDelay: "5000" }))
		,(error)=>(this.$bvToast.toast(error.response.data,
		{title: 'User log in', autoHideDelay: "5000"})));
		this.isLogged="true"
		console.log(this.isLogged)
		this.$router.replace('/')
	}
}
});