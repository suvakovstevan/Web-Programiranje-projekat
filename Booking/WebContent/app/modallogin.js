Vue.component("login-page-temp", {
	data: function () {
		    return {
		      log_user: {
				username:'',
				password:'',
				firstName:'',
				lastName:'',
				gender:'MALE',
				userRole:''
		},
		reg_user: {
				username:'',
				password:'',
				firstName:'',
				lastName:'',
				gender:'MALE',
				userRole:''
		},
		isLogged : "false"
	}},
	template: `
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <div class="login-container">
          <div class="row">
            <div class="col-md-6 login-form-1">
              <h3>Prijava</h3>
              <form>
                <div class="form-group">
                  <input v-validate="'required'" type="text" name="username" class="form-control" placeholder="Username" v-model="log_user.username"/>
				<span class="validation-error">{{ errors.first('username') }}</span>
                </div>
                <div class="form-group">
                  <input v-validate="'required'" type="password" name="password" class="form-control" placeholder="Password" v-model="log_user.password"/>
				  <span class="validation-error">{{ errors.first('password') }}</span>
                </div>
                <div class="form-group">
                  <input type="input" class="btnSubmit" value="Login" v-on:click="login(log_user)" />
                </div>
                <div class="form-group">
                  <a href="#" class="ForgetPwd">Forgot password?</a>
                </div>
              </form>
            </div>
            <div class="col-md-6 login-form-2">
              <h3>Registracija</h3>
              <form>
                <div class="form-group">
                  <input v-validate="'required'" type="text" name="reg_username" class="form-control" placeholder="Username" v-model="reg_user.username" />
				  <span class="validation-error">{{ errors.first('reg_username') }}</span>
                </div>
                <div class="form-group">
                  <input v-validate="'required'" type="text" name="reg_firstName" class="form-control" placeholder="First name" v-model="reg_user.firstName" />
                  <span class="validation-error">{{ errors.first('reg_firstName') }}</span>
				</div>
                <div class="form-group">
                  <input v-validate="'required'" type="text" name="reg_lastName" class="form-control" placeholder="Last name" v-model="reg_user.lastName" />
				  <span class="validation-error">{{ errors.first('reg_lastName') }}</span>
                </div>
                <div class="form-group">
                  <input v-validate.immediate="'required'" type="password" name="reg_password" class="form-control" placeholder="Password" v-model="reg_user.password" />
				  <span class="validation-error">{{ errors.first('reg_password') }}</span>
                </div>
                <div class="form-group">
				  <select v-validate="'required'" class="form-control" name="reg_gender" v-model="reg_user.gender">
					<option value = "MALE">Male</option>
					<option value = "FEMALE">Female</option>
				  </select>
				  <span class="validation-error">{{ errors.first('reg_gender') }}</span>
				</div>
                <div class="form-group">
                  <input type="input" class="btnSubmit" :disabled="errors.any()" value="Register" v-on:click="register(reg_user)" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
, methods : {
	login : function(user){
		user.userRole='NOT_REGISTERED'
		axios.post('http://localhost:8080/Booking/rest/login',user)
		.then((response)=>{console.log(response.data);
		this.$router.go('/')},
		(error) =>{console.log(error.response.data)})
	},
	
	register : function(user){
		user.userRole='GUEST'
		axios.post('http://localhost:8080/Booking/rest/register',user)
		.then((response)=>{console.log(response.data);
		this.$router.go('/')},
		(error) =>{console.log(error.response.data)})
	}
	
}
});