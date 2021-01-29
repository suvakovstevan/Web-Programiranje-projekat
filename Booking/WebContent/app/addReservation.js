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
  				reservationDates : [],
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
		flag : false,
		temp :[]
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
		funkcija : function(flag){
			
				console.log('da li je uslo majku mu!')
				console.log(flag)
				if(flag==true){
				this.apartment.reservations.push(this.reservation)
				axios.put('http://localhost:8080/Booking/rest/apartments/modify', this.apartment).then((response)=>{console.log(response.data)},(error)=>{console.log(error.response.data)})
			}
		},
	
		saveReservation : function(){
			var tempElement = {date : new Date(), status : false};
			this.reservation.sumPrice= this.reservation.nightNumber*this.apartment.pricePerNight;
			this.reservation.message="poeuka glupa";
			this.reservation.guest=this.loggedUser;
			this.reservation.status='CREATED';
			this.reservation.startDate=new Date(parseInt(this.reservation.startDate.getTime() + 3600000));
			
			for(i=0; i<this.reservation.nightNumber; i++){
				tempElement.date = new Date(parseInt(this.reservation.startDate.getTime() + (i*86400*1000) + 3600000))
				tempElement.status = true;
				this.apartment.reservationDates.push((JSON.parse(JSON.stringify(tempElement))))
			}
			
		
			this.reservation.resApartment=this.apartment.id;
			axios.post('http://localhost:8080/Booking/rest/reservations/create', this.reservation).then(response => {this.flag=response.data; console.log(this.flag)}).catch(err => {this.flag=err.response.data})
				setTimeout(()=>{this.funkcija(this.flag)},1000)
		}
	},
	mounted(){
		this.loggedUser=JSON.parse(localStorage.loggedUser)
		this.apartment=JSON.parse(localStorage.currentApartment);
		console.log(this.apartment)
		console.log(this.flag)
	}
})