Vue.component("all-reservations",{
	data : function(){
		return {
			reservations : {},
			loggedUser : {},
			amenities : {},
			mode : 'BROWSE'
		}
	},
	
	template : `
	<div>
	<div class="container flights">
  <h1>Pretraga rezervacija</h1>
  <div class="row">
    <form>
      <div class="col-md-3 divider">
        <div class="input-group-lg">
          <input type="text" class="form-control" placeholder="Tip" id = "polazna" name="polazna" >
        </div>
      </div>
      <div class="col-md-3 divider">
        <div class="input-group-lg">
          <input type="text" class="form-control" placeholder="Host" id = "odlazna" name="odlazna">
        </div>
      </div>
      <div class="col-md-3 divider">
        <div class="input-group-lg">
          <input type="date" class="form-control" id = "ddate" name="ddate">
        </div>
      </div>
      <div class="col-md-3 divider">
        <div class="input-group-lg">
          <input type="date" class="form-control" id = "adate" name="adate">
        </div>
      </div>
      <div class="col-md-3">
        <div class="select input-lg">
        </div>
      </div>

      <div class="col-md-3">
        <div class="select input-lg">
        </div>
      </div>

      <div class="col-md-2">
        <div class="select input-lg">
        </div>
      </div>

      <div class="col-md-2">
        <div class="select input-lg">
        </div>
      </div>

      <div class="col-md-2">
        <button type="input"  class="btn btn-search btn-lg">Pretraga</button>
      </div>
    </form>
  </div>
</div>

<div class="container hotels">

<div class="container">
  <div class="left col-md-4 stajanja">

  </div>
  <div class="right col-md-4">
    <div class="container lista">
      <h1>Reservations</h1>
	<div class="col-md-6 divider"></div> 
	<div class="col-md-2 divider">
<router-link to="/addApartment"><input type="input" class="btn btn-search btn-lg" v-if="loggedUser.userRole ==='HOST'" value="Add"></input></router-link>
    </div>  
	<div class="right">
        <div class="col-md-8">
          <div class="row">
            <div class="room" v-for = "reservation of reservations">
              <!-- Room Image -->
              <div class="room_img">
                <img src="assets/avatar.jpg">
              </div>
              <!-- Room Information -->
              <div class="room_information">
                <div> <h2 class="room_information--heading">{{reservation.id}}</h2> </div>
                <!-- STAR RATING-->
                <p>Dolazak: asdasdas</p>
                <p>Broj presedanja:asdasdasd</p>
                <p>Duzina leta: dasdasdasd</p>
              </div>
              <div class="room_features" v-if = "loggedUser.userRole ==='HOST'">
				<div class="col-md-5 divider">
                <a class="room_features--book-btn" v-if="reservation.status==='CREATED'" v-on:click="acceptReservation(reservation)">Accept</a><!-- Book now -->
				</div>
				<div class="col-md-5 divider">
				<a class="room_features--book-btn" v-if="reservation.status==='CREATED' || reservation.status==='ACCEPTED'" v-on:click="denyReservation(reservation)">Deny</a> <!-- Book now -->
              </div>
				</div>
				<div class="room_features" v-if = "loggedUser.userRole ==='GUEST'">
				<div class="col-md-5 divider">
                <a class="room_features--book-btn" v-if="reservation.status==='CREATED' || reservation.status==='ACCEPTED'" v-on:click="cancelReservation(reservation)">Cancel</a><!-- Book now -->
				</div>
				</div>
            </div>

          </div>
        </div>
      </div>
    </div>
</div>
</div>
</div>
</div>
	`,
	mounted(){
		this.loggedUser=JSON.parse(localStorage.loggedUser);
		axios.get('http://localhost:8080/Booking/rest/amenities/all').then((response) =>{this.amenities=response.data; console.log(this.amenities)},(error) => {console.log(error.response.data)})
		
		if(this.loggedUser.userRole=='ADMIN'){
		axios.get('http://localhost:8080/Booking/rest/reservations/all').then((response) =>{this.reservations=response.data; console.log(this.reservations)},(error) => {console.log(error.response.data)})
		}
		if(this.loggedUser.userRole=='GUEST'){
		axios.get('http://localhost:8080/Booking/rest/reservations/getGuest/' + this.loggedUser.username).then((response) =>{this.reservations=response.data; console.log(this.reservations)},(error) => {console.log(error.response.data)})
		}
		if(this.loggedUser.userRole=='HOST'){
		axios.get('http://localhost:8080/Booking/rest/reservations/getHost/' + this.loggedUser.username).then((response) =>{this.reservations=response.data; console.log(this.reservations)},(error) => {console.log(error.response.data)})
		}
	},
	components : {
		vuejsDatepicker
	},
	methods : {
		acceptReservation : function(reservation){
			reservation.status='ACCEPTED';
		axios.put('http://localhost:8080/Booking/rest/reservations/modify',reservation).then((response) =>{console.log(response.data)},(error) => {console.log(error.response.data)})
		},
		denyReservation : function(reservation){
			reservation.status='DENIED';
		axios.put('http://localhost:8080/Booking/rest/reservations/modify',reservation).then((response) =>{console.log(response.data)},(error) => {console.log(error.response.data)})	
		},
		cancelReservation : function(reservation){
			reservation.status='CANCELED';
		axios.put('http://localhost:8080/Booking/rest/reservations/modify',reservation).then((response) =>{console.log(response.data)},(error) => {console.log(error.response.data)})	
		}
	}
})