Vue.component("user-profile", {
	data: function (){
		return{
			loggedUser : {
				username : '',
				password : '',
				firstName: '',
				lastName : '',
				gender : '',
				userRole : ''
			},
			mode : 'BROWSE',
			backup : []
		}
	},
	
	template:`
	<div class="container bootstrap snippets bootdey">
<div class="row">
  <div class="profile-nav col-md-3">
      <div class="panel">
          <div class="user-heading round">
              <a href="#">
                  <img src="assets/avatar.jpg">
              </a>
              <h1>{{loggedUser.firstName}} {{loggedUser.lastName}}</h1>
          </div>

          <ul class="nav nav-pills nav-stacked">
              <li><a href="#" v-bind:disabled="mode!='BROWSE'" v-on:click="editUser"> <i class="fa fa-edit"></i> Edit profile</a></li>
          </ul>
      </div>
  </div>
  <div class="profile-info col-md-9">
      <div class="panel">
          <div class="bio-graph-heading">
              Your profile information!
          </div>
          <div class="panel-body bio-graph-info">
              <div class="row">
				<form>
				<div class="bio-row">
                    <div class="form-group">
						<label for="username">Username</label>
						<input v-validate="'required'" type="text" class="form-control" name="username" v-model="loggedUser.username" v-bind:disabled="mode=='BROWSE'">
						<span class="validation-error">{{ errors.first('username') }}</span>
					</div>
                  </div>
                  <div class="bio-row">
                    <div class="form-group">
						<label for="firstName">First name</label>
						<input v-validate="'required'" type="text" class="form-control" name="firstName" v-model="loggedUser.firstName" v-bind:disabled="mode=='BROWSE'">
						<span class="validation-error">{{ errors.first('firstName') }}</span>
					</div>
                  </div>
                  <div class="bio-row">
                      <div class="form-group">
						<label for="lastName">Last name</label>
						<input v-validate="'required'" type="text" class="form-control" name="lastName" v-model="loggedUser.lastName" v-bind:disabled="mode=='BROWSE'">
						<span class="validation-error">{{ errors.first('lastName') }}</span>
					</div>
                  </div>
                  <div class="bio-row">
                      <div class="form-group">
					  <label for="gender">Gender</label>
				  	  <select v-validate="'required'" class="form-control" name="gender" v-model="loggedUser.gender" v-bind:disabled="mode=='BROWSE'">
						<option value = "MALE">Male</option>
						<option value = "FEMALE">Female</option>
				      </select>
				  <span class="validation-error">{{ errors.first('gender') }}</span>
				</div>
					</div>
					<div class="bio-row">
					<div class="col-md-1 divider">
						<input type="input" class="btn btn-search btn-lg" v-bind:disabled="mode=='BROWSE'" v-on:click="saveUser(loggedUser)" value="Save"></input>
					</div>
					</div>
						
					<div class="col-md-1 divider">
						<input type="input" class="btn btn-search btn-lg" v-bind:disabled="mode=='BROWSE'" v-on:click="cancelEditing" value="Cancel"></input>
					</div>
					
					</form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
</div>
	`,
	mounted : function(){
		axios.get('http://localhost:8080/Booking/rest/currentUser')
		.then((response) => {this.loggedUser = response.data},(error)=>(console.log(error.response.data)))
	},
	methods : {
		editUser : function(){
			this.backup = [this.loggedUser.username, this.loggedUser.firstName, this.loggedUser.lastName, this.loggedUser.gender];
			this.mode='EDIT';
		},
		cancelEditing : function(){
			this.loggedUser.username = this.backup[0];
			this.loggedUser.firstName = this.backup[1];
			this.loggedUser.lastName = this.backup[2];
			this.loggedUser.gender = this.backup[3];
			this.mode='BROWSE'
		},
		saveUser : function(user){
			axios.put('http://localhost:8080/Booking/rest/users/modify', user).then((response)=>{console.log(response.data)},(error)=>{console.log(error.response.data)})
			this.mode='BROWSE';
		}
	}
})