Vue.component("all-users-host",{
	data : function (){
		return {
			users : {},
			loggedUser : {
				username : '',
				password : '',
				firstName: '',
				lastName : '',
				gender : '',
				userRole : ''
			}
		}
	},
	
	template : `
	<div>
	<div class="container hotels">
  <h1>Pretraga korisnika</h1>

  <div class="row">
    <form>
      <div class="col-md-5 divider">
        <div class="input-group-lg">
          <input type="text" class="form-control" placeholder="Name" id = "polazna" name="polazna">
        </div>
      </div>
      <div class="col-md-5 divider">
        <div class="input-group-lg">
          <input type="text" class="form-control" placeholder="Username" id = "odredisna" name="odredisna">
        </div>
      </div>
      <div class="col-md-2 divider">
        <button type="input" class="btn btn-search btn-lg">Pretraga</button>
      </div>
    </form>
  </div>
</div>

<div class="container">

  <h1>Korisnici</h1>

  <div class="right">
    <div class="col-md-12">
      <div class="row">
        <div class="room" v-for="user of users">
          <!-- Room Image -->
          <div class="room_img">
            <img src="assets/avatar.jpg">
          </div>
          <!-- Room Information -->
          <div class="room_information">
            <div> <h2 class="room_information--heading">{{user.firstName}} {{user.lastName}}</h2><a><i class="hotel-info fas fa-info-circle"></i></a></div>
            <p>{{user.username}}</p>
            <p><span class="glyphicon glyphicon-user"></span> {{user.firstName}}, {{user.lastName}}, {{user.gender}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
	`,
	mounted(){
		axios.get('http://localhost:8080/Booking/rest/reservations/getGuests/' + JSON.parse(localStorage.loggedUser).username).then((response) =>{this.users=response.data},(error) => {console.log(error.response.data)})
	}
})