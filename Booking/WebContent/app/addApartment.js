Vue.component("add-apartment",{
	data : function(){
		return{
			amenities : {},
			loggedUser : {},
			apartment : {
				type : '',
  				roomNumber : 0,
  				guestNumber : 0,
  				location : {
    				longitude : 0,
    				latitude : 0,
    				adress : {
      					street : '',
      					number : 0,
      					city : '',
      					postalCode : 0
    					}
  					},
  				host : {
    				username : '',
    				password : '',
    				firstName : '',
    				lastName : '',
    				gender : '',
    				userRole : ''
  						},
  				reservationDates : [ ],
  				pricePerNight : 0,
  				checkInTime : 0,
  				checkOutTime : 0,
  				status : false,
  				amenidies : [{
					id : 0,
					name : ''
				}],
  				reservations : [ ],
  				images : [ ]}
		}
	},
	
	template :`
		<div class="container hotels">
<div class="container">
  <div class="right col-md-4">
    <div class="container lista">
      <h1>Adding apartment</h1>
<div class="col-md-6 divider"></div>  
	<div class="right">
        <div class="col-md-8">
          <div class="row">
            
              <form>
                <div class="form-group">
				<select v-model="apartment.type" v-validate="'required'" name="type">
					<option>FULL</option>
					<option>ROOM</option>
				</select>
                <span class="validation-error">{{ errors.first('type') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="roomNumber" class="form-control" placeholder="Room number" v-model="apartment.roomNumber" />
				<span class="validation-error">{{ errors.first('roomNumber') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="guestNumber" class="form-control" placeholder="Guest number" v-model="apartment.guestNumber"/>
				<span class="validation-error">{{ errors.first('guestNumber') }}</span>
                </div>
				<div class="form-group">
				  <label for="location">Location</label>
                  <input v-validate="'required'" type="number" name="location" class="form-control" placeholder="Longitude" v-model="apartment.location.longitude"/>
				<span class="validation-error">{{ errors.first('location') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="latitude" class="form-control" placeholder="Latitude" v-model="apartment.location.latitude"/>
				<span class="validation-error">{{ errors.first('latitude') }}</span>
                </div>
				<div class="form-group">
				  <label for="adress">Adress</label>
                  <input v-validate="'required'" type="text" name="adress" class="form-control" placeholder="Street" v-model="apartment.location.adress.street"/>
				<span class="validation-error">{{ errors.first('adress') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="number" class="form-control" placeholder="Number" v-model="apartment.location.adress.number"/>
				<span class="validation-error">{{ errors.first('number') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="text" name="city" class="form-control" placeholder="City" v-model="apartment.location.adress.city"/>
				<span class="validation-error">{{ errors.first('city') }}</span>
                </div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="postalCode" class="form-control" placeholder="Postal code" v-model="apartment.location.adress.postalCode"/>
				<span class="validation-error">{{ errors.first('postalCode') }}</span>
                </div>
				<div class="form-group">
				<select v-model="apartment.amenidies" multiple>
					<option v-bind:value="{id:amenity.id, name : amenity.name}" v-for="amenity of amenities">{{amenity.name}}</option>
				</select>
				</div>
				<div class="form-group">
                  <input v-validate="'required'" type="number" name="price" class="form-control" placeholder="Price" v-model="apartment.pricePerNight"/>
				<span class="validation-error">{{ errors.first('price') }}</span>
                </div>
				<div class="form-group">
                  <vuejs-datepicker v-validate="'required'" name="checkIn" placeholder="Check in" class="form-control" v-model="apartment.checkInTime"></vuejs-datepicker>
				<span class="validation-error">{{ errors.first('price') }}</span>
                </div>
				<div class="form-group">
                  <vuejs-datepicker v-validate="'required'" name="checkOut" placeholder="Check out" class="form-control" v-model="apartment.checkOutTime"></vuejs-datepicker>
				<span class="validation-error">{{ errors.first('checkOut') }}</span>
                </div>
				<div class="form-group">
				<div class="col-md-3 divider">
                  <input type="input" class="btn btn-search btn-lg" value="Add" v-on:click="addApartment()"/>
				</div>
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
	mounted(){
		this.loggedUser=JSON.parse(localStorage.loggedUser);
		axios.get('http://localhost:8080/Booking/rest/amenities/all').then((response) =>{this.amenities=response.data; console.log(this.amenities)},(error) => {console.log(error.response.data)})	
	},
	components : {
		vuejsDatepicker
	},
	methods : {
		addApartment : function(){
			this.apartment.host=this.loggedUser
			console.log(this.apartment)
			axios.post('http://localhost:8080/Booking/rest/apartments/create', this.apartment).then((response) => {console.log(response.data); this.$router.go('/')},(error)=>{console.log(error.response.data)})
		}
	}
})