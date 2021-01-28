Vue.component("add-reservation",{
	data: function () {
		    return {
		      loggedUser : "",
			  selectedDate :{},
			  broj: 0,
			  reservation : {},
			  newDate : {},
			  finalDate : {},
			  apartment :{type : '',
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
  				reservationDates : [{}],
  				pricePerNight : 0,
  				checkInTime : 0,
  				checkOutTime : 0,
  				status : false,
  				amenidies : [{
					id : 0,
					name : ''
				}],
  				reservations : [ ],
  				images : [ ]},
			listaDatuma : [
				{
					date : 0,
					status : false
				}
			]
		    }
	},
	template:`
	<div>
	<h2>Adding reservation</h2>
	<form>
	<div class="form-group">
	<label>Izaberite datum</label>
	<div><v-date-picker v-model='reservation.startDate'></v-date-picker></div>
	</div>
	<div class="form-group">
       <input v-validate="'required'" type="number" name="number" class="form-control" placeholder="Number" v-model="reservation.nightNumber"/>
	   <span class="validation-error">{{ errors.first('number') }}</span>
    </div>
	<div class="form-group">
	   <input type="input" class="btn btn-search btn-lg" value="Save" v-on:click="saveReservation()" />
	</div>
	</form>
	</div>
	`,
	components :{
	
	},
	methods : {
		izracunajdatum : function(){
			this.finalDate=this.selectedDate.getTime()
			this.newDate=new Date(parseInt(this.selectedDate.getTime() + (this.broj*86400*1000)))
		},
		saveReservation : function(){
			var i;
			var j;
			this.reservation.sumPrice= this.reservation.nightNumber*this.apartment.pricePerNight;
			this.reservation.message="poeuka glupa";
			this.reservation.guest=this.loggedUser;
			this.reservation.status='CREATED';
			
			for(i=0; i<this.reservation.nightNumber; i++){
				this.listaDatuma[i]=new Date(parseInt(this.reservation.startDate.getTime() + (i*86400*1000)))
				console.log(this.listaDatuma[i])
			}
			
			for(j=0; j<this.listaDatuma.length; j++){
				var k= this.apartment.reservationDates.length;
				this.apartment.reservationDates[k]= this.listaDatuma[j];
				k++;
			}
			this.reservation.resApartment=this.apartment;
			
			console.log(this.reservation)
			//axios.post('http://localhost:8080/Booking/rest/reservations/create', this.reservation).then((response)=>{console.log(response.data)},(error)=>{console.log(error.response.data)})
		}
	},
	mounted(){
		this.loggedUser=JSON.parse(localStorage.loggedUser)
		this.apartment=JSON.parse(localStorage.currentApartment);
		console.log(this.apartment)
	}
})