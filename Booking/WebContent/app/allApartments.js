Vue.component("all-apartments",{
	data : function(){
		return {
			apartments : {},
			loggedUser : {},
			amenities : {}
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
<button type="input" class="btn btn-search btn-lg" data-toggle="modal" data-target="#myModal1"  v-if="loggedUser.userRole ==='HOST'">Add</button>
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
                <a class="room_features--book-btn">Izmeni</a> <!-- Book now -->
				</div>
				<div class="col-md-5 divider">
				<a class="room_features--book-btn">Obrisi</a> <!-- Book now -->
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

<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <div class="login-container">
          <div class="row">
            <div class="login-form-1">
              <h3>Adding apartment</h3>
              <form>
                <div class="form-group">
                  <input v-validate="'required'" type="text" name="type" class="form-control" placeholder="Type"/>
				<span class="validation-error">{{ errors.first('type') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="roomNumber" class="form-control" placeholder="Room number"/>
				<span class="validation-error">{{ errors.first('roomNumber') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="guestNumber" class="form-control" placeholder="Guest number"/>
				<span class="validation-error">{{ errors.first('guestNumber') }}</span>
                </div>
				<div class="form-group">
				  <label for="location">Location</label>
                  <input v-validate="'required'" type="number" name="location" class="form-control" placeholder="Longitude"/>
				<span class="validation-error">{{ errors.first('location') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="latitude" class="form-control" placeholder="Latitude"/>
				<span class="validation-error">{{ errors.first('latitude') }}</span>
                </div>
				<div class="form-group">
				  <label for="adress">Adress</label>
                  <input v-validate="'required'" type="text" name="adress" class="form-control" placeholder="Street"/>
				<span class="validation-error">{{ errors.first('adress') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="number" class="form-control" placeholder="Number"/>
				<span class="validation-error">{{ errors.first('number') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="city" class="form-control" placeholder="City"/>
				<span class="validation-error">{{ errors.first('city') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="postalCode" class="form-control" placeholder="Postal code"/>
				<span class="validation-error">{{ errors.first('postalCode') }}</span>
                </div>
				<div class="form-group">
				  <select v-validate="'required'" class="form-control" name="amenities" multiple>
					<option v-for="amenity of amenities">{{amenity.name}}</option>
				  </select>
				  <span class="validation-error">{{ errors.first('amenities') }}</span>
				</div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="price" class="form-control" placeholder="Price"/>
				<span class="validation-error">{{ errors.first('price') }}</span>
                </div>
				<div class="form-group">
                  <vuejs-datepicker placeholder = "pick date"></vuejs-datepicker>
				<span class="validation-error">{{ errors.first('price') }}</span>
                </div>
				<div class="form-group">
                  <input type="input" class="btnSubmit" value="Add"/>
                </div>
              </form>
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
	}
})