Vue.component("add-reservation",{
	data: function () {
		    return {
		      loggedUser : ""
		    }
	},
	template:`
	<div><v-calendar is-expanded></v-calendar></div>
	`,
	components :{
	
	}
})