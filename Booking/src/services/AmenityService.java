package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Amenity;
import beans.User;
import beans.UserRole;
import dao.AmenityDAO;
import dao.ApartmentDAO;

@Path("/amenities")
public class AmenityService {
	
	@Context
	ServletContext ctx;
	
	public AmenityService(){
		
	}
	
	@PostConstruct
	public void init() {
		if(this.ctx.getAttribute("amenityDAO") == null) {
			this.ctx.setAttribute("amenityDAO", new AmenityDAO(this.ctx.getRealPath("/")));
		}
		if(this.ctx.getAttribute("apartmentDAO") == null) {
			this.ctx.setAttribute("apartmentDAO", new ApartmentDAO(this.ctx.getRealPath("/")));
		}
	}
	
	@GET
	@Path("helloWorld")
	public Response helloWOrld(@Context HttpServletRequest request) {
		return Response.status(200).entity("Hello World").build();
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll(@Context HttpServletRequest request) {
		User admin = (User) request.getSession().getAttribute("user");
		if(admin==null) {
			return Response.status(400).entity("No logged users!").build();	
		}
		//if(admin.getUserRole().equals(UserRole.ADMIN)) {
			AmenityDAO dao = (AmenityDAO) this.ctx.getAttribute("amenityDAO");
			return Response.status(200).entity(dao.getAmenities()).build();	
		//}
		//return Response.status(403).entity("Forbidden access!").build();
	}
	
	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createAmenity(Amenity amenity, @Context HttpServletRequest request) {
		User admin = (User) request.getSession().getAttribute("user");
		if(admin==null) {
			return Response.status(400).entity("No logged users!").build();	
		}
		if(admin.getUserRole().equals(UserRole.ADMIN)) {
			AmenityDAO dao = (AmenityDAO) this.ctx.getAttribute("amenityDAO");
			dao.putAmenity(amenity);
			dao.saveAmenities();
			return Response.status(200).entity("Amenity successfully added!").build();
		}
		return Response.status(403).entity("Forbidden access!").build();
	}
	
	@PUT
	@Path("modify")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyAmenity(Amenity amenity, @Context HttpServletRequest request) {
		User admin = (User) request.getSession().getAttribute("user");
		if(admin==null) {
			return Response.status(400).entity("No logged users!").build();	
		}
		if(admin.getUserRole().equals(UserRole.ADMIN)) {
			AmenityDAO dao = (AmenityDAO) this.ctx.getAttribute("amenityDAO");
			ApartmentDAO apdao = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
			apdao.editAmenityFromApartment(amenity);
			if(dao.modifyAmenity(amenity)) {
				dao.saveAmenities();
				apdao.saveApartments();
				return Response.status(200).entity("Amenity successfully modified!").build();
			}
			return Response.status(400).entity("Selected amenity does not exist!!").build();
		}
		return Response.status(403).entity("Forbidden access!").build();
	}
	
	@DELETE
	@Path("delete/{id}")
	public Response deleteAmenity(@PathParam("id") Long id, @Context HttpServletRequest request) {
		User admin = (User) request.getSession().getAttribute("user");
		if(admin==null) {
			return Response.status(400).entity("No logged users!").build();	
		}
		if(admin.getUserRole().equals(UserRole.ADMIN)) {
			AmenityDAO dao = (AmenityDAO) this.ctx.getAttribute("amenityDAO");
			ApartmentDAO apdao = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
			apdao.deleteAmenityfromApartment(dao.findByID(id));
			if(dao.deleteAmenity(id)) {
				dao.saveAmenities();
				apdao.saveApartments();
				return Response.status(200).entity("Amenity successfully deleted!").build();
			}
			return Response.status(400).entity("Selected amenity does not exist!!").build();
		}
		return Response.status(403).entity("Forbidden access!").build();
	}
}
