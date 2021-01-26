Vue.component("home-page", {
	data: function () {
		    return {
		      loggedUser : ""
		    }
	},
	template: `
	<div>
	<div class="top-nav-container">
  	<div class="container">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand">Booking</router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><router-link to="/allUsers"><a>Svi korisnici <span class="sr-only" >(current)</span></a></router-link></li>
            <li><a routerLinkActive="active"  routerLink="/flightList">Letovi </a></li>
            <li><a routerLinkActive="active" routerLink="/hotelList">Hoteli</a></li>
            <li><a routerLinkActive="active" routerLink="/rentAcarList">Rent a car</a></li>
          </ul>
          <div v-if="loggedUser===''">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-user"></span></a></li>
          </ul>
          </div>
		  <div v-else-if = "loggedUser.userRole==='ADMIN'">
		  	<ul class="nav navbar-nav navbar-right">
			<li><router-link to="/userProfile"><a>{{loggedUser.firstName}}</a></router-link></li>
			<li><router-link to="/allUsers"><a>Svi korisnici</a></router-link></li>
            <li><a v-on:click="logout()">Logout</a></li>
          </ul>
		  </div>
		  <div v-else-if = "loggedUser.userRole==='HOST'">
		  	<ul class="nav navbar-nav navbar-right">
			<li><router-link to="/userProfile"><a>{{loggedUser.firstName}}</a></router-link></li>
			<li><router-link to="/allHostUsers"><a>Svi korisnici</a></router-link></li>
            <li><a v-on:click="logout()">Logout</a></li>
          </ul>
		  </div>
		  <div v-else>
		  	<ul class="nav navbar-nav navbar-right">
			<li><router-link to="/userProfile"><a>{{loggedUser.firstName}}</a></router-link></li>
			<li><a v-on:click="logout()">Logout</a></li>
          </ul>
		  </div>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  </div>
</div>
</div>
`,
methods : {
	logout : function(){
		axios.post('http://localhost:8080/Booking/rest/logout').then((response)=>{console.log(response.data);this.$router.go('/')},(error)=>{console.log(error.response.data)})
	}
	
},
mounted : function(){
		axios.get('http://localhost:8080/Booking/rest/currentUser')
		.then((response) => {this.loggedUser = response.data},(error)=>(console.log(error.response.data)))
	}

});