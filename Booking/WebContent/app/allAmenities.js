Vue.component("all-amenities",{
	data : function(){
		return {
			amenities : {},
			newAmenity : {
				id:0,
				name : ''
			}
		}
	},
	
	template : `
	<div>
	<div class="container flights">
  <h1>Pretraga letovanja</h1>
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
      <h1>Amenities</h1>
<button type="input"  class="btn btn-search btn-lg" data-toggle="modal" data-target="#myModal1" >Add</button>
      <div class="right">
        <div class="col-md-8">
          <div class="row">
            <div class="room" v-for = "amenity of amenities">
              <!-- Room Image -->
              <div class="room_img">
                <img src="assets/avatar.jpg">
              </div>
              <!-- Room Information -->
              <div class="room_information">
                <div> <h2 class="room_information--heading">{{amenity.name}}</h2> </div>
                <!-- STAR RATING-->
                <p>Polazak:asdasdas</p>
                <p>Dolazak: asdasdas</p>
                <p>Broj presedanja:asdasdasd</p>
                <p>Duzina leta: dasdasdasd</p>
              </div>
              <div class="room_features">
				<div class="col-md-5 divider">
                <a class="room_features--book-btn">Izmeni</a> <!-- Book now -->
				</div>
				<div class="col-md-5 divider">
				<a class="room_features--book-btn" v-on: click="delete(amenity)">Obrisi</a> <!-- Book now -->
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
              <h3>Adding amenity</h3>
              <form>
                <div class="form-group">
                  <input v-validate="'required'" type="text" name="name" class="form-control" placeholder="Name" v-model="newAmenity.name"/>
				<span class="validation-error">{{ errors.first('name') }}</span>
                </div>
				<div class="form-group">
                  <input type="input" class="btnSubmit" value="Add" v-on:click="addAmenity()"/>
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
		axios.get('http://localhost:8080/Booking/rest/amenities/all').then((response) =>{this.amenities=response.data; console.log(this.amenities)},(error) => {console.log(error.response.data)})
	},
	methods : {
		addAmenity : function(){
			axios.post('http://localhost:8080/Booking/rest/amenities/create',this.newAmenity).then((response)=>{console.log(response.data);this.$router.go('/allAmenities')},(error)=>{console.log(error.response.data)})
		}
	}
})