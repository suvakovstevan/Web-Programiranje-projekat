Vue.component("user-profile", {
	data: function (){
		return{
			loggedUser : ""
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
              <li><a href="#"> <i class="fa fa-edit"></i> Edit profile</a></li>
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
                  <div class="bio-row">
                      <p><span>First Name </span>: {{loggedUser.firstName}}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Last Name </span>: {{loggedUser.lastName}}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Password </span>: {{loggedUser.password}}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Confirm password</span>: </p>
                  </div>
                  <div class="bio-row">
                      <p><span>Gender </span>: {{loggedUser.gender}}</p>
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
	}
})