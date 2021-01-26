Vue.component("registration-page", {
	data: function () {
		    return {
		      user: {
			username:'',
			password:'',
			firstName:'',
			lastName:'',
			gender:'',
			userRole:''
		},
		    }
	},
	components:{
		
	},
	template: `
<div class="container">
	<div class="row">
	<div class="modal-content">
    					<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
							<h5 class="modal-title">Ready to Join? Create a New Account</h5>
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
								<div class="form-group">
									<label for="name">Name</label>
									<input v-validate="'required'" type="text" class="form-control" name="name" v-model="user.firstName">
									<span class="validation-error">{{ errors.first('name') }}</span>
								</div>
								<div class="form-group">
									<label for="lastname">Last name</label>
									<input v-validate="'required'" type="text" class="form-control" required="" name="lastname" v-model="user.lastName">
									<span class="validation-error">{{ errors.first('lastname') }}</span>
								</div>
								<div class="form-group">
									<label for="gender">Gender</label>
									<select  v-validate.immediate="'required'" class="form-control" name="gender" v-model="user.gender" required>
										<option value = "MALE" selected>Male</option>
										<option value = "FEMALE">Female</option>
									</select>
									<span class="validation-error">{{ errors.first('gender') }}</span>
								</div>
							</div>
						<div class="modal-footer">
								<input type="input" class="btn btn-success btn-icon" :disabled="errors.any()" value="Register" v-on:click="register(user)">
								<router-link to="/"><button type="button" class="btn btn-default btn-icon" data-dismiss="modal">Cancel</button></router-link>
							</div>
						</form>
					</div>
	</div>
</div>
`
, methods : {
	register : function(user){
		user.userRole='GUEST'
		axios
		.post('http://localhost:8080/Booking/rest/register',user)
		.then((response) => (this.$bvToast.toast(response.data,
		{title:'User registration',autoHideDelay: "5000" }))
		,(error)=>(this.$bvToast.toast(error.response.data,
		{title: 'User registration', autoHideDelay: "5000"})));
		
	}
}
});