Vue.component("all-amenities",{
	data : function(){
		return {
			amenities : {},
			newAmenity : {
				id:0,
				name : ''
			},
			selectedAmenity : {
				id:0,
				name : ''
			},
			mode : 'BROWSE',
			backup : []
		}
	},
	
	template : `
	<div>
<div class="container hotels">
<div class="container">
  <div class="right col-md-4">
    <div class="container lista">
      <h1>Amenities</h1>
<div class="col-md-6 divider"></div> 
	<div class="col-md-2 divider">
<button type="input"  class="btn btn-search btn-lg" data-toggle="modal" data-target="#myModal1" >Add</button>
    </div> 
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
                <p>Naziv:{{amenity.name}}</p>
              </div>
              <div class="room_features">
				<div class="col-md-5 divider">
               <a class="room_features--book-btn" data-toggle="modal" data-target="#editModal" v-on:click="editAmenity(amenity)" v-bind:disabled="mode!='BROWSE'">Edit</a> <!-- Book now -->
				</div>
				<div class="col-md-5 divider">
				<a class="room_features--book-btn" v-on:click="deleteAmenity(amenity)">Obrisi</a> <!-- Book now -->
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

<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <div class="login-container">
          <div class="row">
            <div class="login-form-1">
              <h3>Editing amenity</h3>
              <form>
                <div class="form-group">
                  <input v-validate="'required'" type="text" name="name" class="form-control" placeholder="Name" v-model="selectedAmenity.name"/>
				<span class="validation-error">{{ errors.first('name') }}</span>
                </div>
				<div class="form-group">
                  <input type="input" class="btnSubmit" value="Save" v-on:click="saveAmenity(selectedAmenity)" v-bind:disabled="mode=='BROWSE'"/>
                </div>
				<div class="form-group">
                  <input type="input" class="btnSubmit" value="Cancel" v-on:click="cancelEditing" v-bind:disabled="mode=='BROWSE'"/>
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
		},
		deleteAmenity : function(amenity){
			axios.delete('http://localhost:8080/Booking/rest/amenities/delete/' + amenity.id).then((response)=>{console.log(response.data);this.$router.go('/allAmenities')},(error)=>{console.log(error.response.data)})
		},
		editAmenity : function(selectedAmenity){
			this.selectedAmenity=selectedAmenity;
			this.backup = [this.selectedAmenity.name];
			this.mode='EDIT';
		},
		cancelEditing : function(){
			this.selectedAmenity.name= this.backup[0];
			this.mode='BROWSE';
		},
		saveAmenity : function(amenity){
			axios.put('http://localhost:8080/Booking/rest/amenities/modify', amenity).then((response)=>{console.log(response.data)},(error)=>{console.log(error.response.data)})
			this.mode='BROWSE';
		}
	},
})