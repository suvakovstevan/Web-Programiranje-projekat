Vue.component("all-apartments",{
	data : function(){
		return {
			apartments : {},
			loggedUser : {},
			amenities : {},
			mode : 'BROWSE'
		}
	},
	
	template : `
	<div>
	<div class="container flights">
  <h1>Pretraga apartmana</h1>
  <div class="row">
    <form>
      <div class="col-md-3 divider">
        <div class="input-group-lg">
          <input type="text" class="form-control" placeholder="Polazak" id = "polazna" name="polazna" >
        </div>
      </div>
      <div class="col-md-3 divider">
        <div class="input-group-lg">
          <input type="text" class="form-control" placeholder="Odrediste" id = "odlazna" name="odlazna">
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

    <div class="nesto">
      <h3>Stajanja</h3>
      <form>
        <div class="checkbox">
          <label><input type="checkbox"> Direct</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox"> 1</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox"> 2+</label>
        </div>
      </form>

      <h3>Klasa</h3>
      <form>
        <div class="checkbox">
          <label><input type="checkbox"> Economy</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox"> Business</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox"> Mixed</label>
        </div>
      </form>
    </div>
  </div>
  <div class="right col-md-4">
    <div class="container lista">
      <h1>Apartments</h1>
	<div class="col-md-6 divider"></div> 
	<div class="col-md-2 divider">
<router-link to="/addApartment"><input type="input" class="btn btn-search btn-lg" v-if="loggedUser.userRole ==='HOST'" value="Add"></input></router-link>
    </div>  
	<div class="right">
        <div class="col-md-8">
          <div class="row">
            <div class="room" v-for = "apartment of apartments">
              <!-- Room Image -->
              <div class="room_img">
                <img src="assets/avatar.jpg">
              </div>
              <!-- Room Information -->
              <div class="room_information">
                <div> <h2 class="room_information--heading">{{apartment.type}}</h2> </div>
                <!-- STAR RATING-->
                <p>Adresa:{{apartment.location.adress.street}}, {{apartment.location.adress.number}}, {{apartment.location.adress.city}}, {{apartment.location.adress.postalCode}}</p>
                <p>Dolazak: asdasdas</p>
                <p>Broj presedanja:asdasdasd</p>
                <p>Duzina leta: dasdasdasd</p>
              </div>
              <div class="room_features">
				<div class="col-md-5 divider">
                <router-link to="/editApartment"><a class="room_features--book-btn" v-if="loggedUser.userRole ==='ADMIN' || loggedUser.userRole ==='HOST'" v-on:click="editApartment(apartment)">Izmeni</a></router-link> <!-- Book now -->
				</div>
				<div class="col-md-5 divider">
				<a class="room_features--book-btn" v-if="loggedUser.userRole ==='ADMIN' || loggedUser.userRole ==='HOST'" v-on:click="deleteApartment(apartment)">Obrisi</a> <!-- Book now -->
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
		axios.get('http://localhost:8080/Booking/rest/apartments/all').then((response) =>{this.apartments=response.data; console.log(this.apartments)},(error) => {console.log(error.response.data)})
		}
		if(this.loggedUser.userRole=='GUEST' || this.loggedUser.userRole=='NOT_REGISTERED'){
		axios.get('http://localhost:8080/Booking/rest/apartments/allActiveApartments').then((response) =>{this.apartments=response.data; console.log(this.apartments)},(error) => {console.log(error.response.data)})
		}
		if(this.loggedUser.userRole=='HOST'){
		axios.get('http://localhost:8080/Booking/rest/apartments/host/' + this.loggedUser.username).then((response) =>{this.apartments=response.data; console.log(this.apartments)},(error) => {console.log(error.response.data)})
		}
	},
	components : {
		vuejsDatepicker
	},
	methods : {
		deleteApartment : function(apartment){
			axios.delete('http://localhost:8080/Booking/rest/apartments/delete/' + apartment.id).then((response)=>{console.log(response.data);this.$router.go('/allApartments')},(error)=>{console.log(error.response.data)})
		},
		editApartment : function(apartment){
			localStorage.currentApartment=JSON.stringify(apartment)
		}
	}
})