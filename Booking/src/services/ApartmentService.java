package services;

import java.util.ArrayList;
import java.util.List;
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
import beans.Apartment;
import beans.Host;
import beans.User;
import beans.UserRole;
import dao.ApartmentDAO;
import dao.UserDAO;

@Path("/apartments")
public class ApartmentService {

	@Context
	ServletContext ctx;
	
	public ApartmentService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(this.ctx.getAttribute("apartmentDAO") == null) {
			this.ctx.setAttribute("apartmentDAO", new ApartmentDAO(this.ctx.getRealPath("/")));
		}
		if(this.ctx.getAttribute("userDAO") == null) {
			this.ctx.setAttribute("userDAO", new UserDAO(this.ctx.getRealPath("/")));
		}
	}
	
	@GET
	@Path("/helloWorld")
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
		//if(admin.getUserRole().equals(UserRole.ADMIN) || admin.getUserRole().equals(UserRole.HOST)) {
			ApartmentDAO dao = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
			return Response.status(200).entity(dao.getApartments()).build();	
		//}
		//return Response.status(403).entity("Forbidden access!").build();
	}
	
	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createApartment(Apartment apartment, @Context HttpServletRequest request) {
		User admin = (User) request.getSession().getAttribute("user");
		if(admin==null) {
			return Response.status(400).entity("No logged users!").build();	
		}
		if(admin.getUserRole().equals(UserRole.ADMIN)) {
			ApartmentDAO dao = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
			dao.putApartment(apartment);
			dao.saveApartments();
			return Response.status(200).entity("Apartment successfully added!").build();
		}
		return Response.status(403).entity("Forbidden access!").build();
	}
	
	@PUT
	@Path("modify")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyApartment(Apartment apartment, @Context HttpServletRequest request) {
		User admin = (User) request.getSession().getAttribute("user");
		if(admin==null) {
			return Response.status(400).entity("No logged users!").build();	
		}
		if(admin.getUserRole().equals(UserRole.ADMIN)) {
			ApartmentDAO dao = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
			if(dao.modifyAapartment(apartment)) {
				dao.saveApartments();
				return Response.status(200).entity("Apartment successfully modified!").build();
			}
			return Response.status(400).entity("Selected apartment does not exist!!").build();
		}
		return Response.status(403).entity("Forbidden access!").build();
	}
	
	@DELETE
	@Path("delete/{id}")
	public Response deleteApartment(@PathParam("id") Long id, @Context HttpServletRequest request) {
		User admin = (User) request.getSession().getAttribute("user");
		if(admin==null) {
			return Response.status(400).entity("No logged users!").build();	
		}
		if(admin.getUserRole().equals(UserRole.ADMIN)) {
			ApartmentDAO dao = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
			if(dao.deleteApartment(id)) {
				dao.saveApartments();
				return Response.status(200).entity("Amenity successfully deleted!").build();
			}
			return Response.status(400).entity("Selected amenity does not exist!!").build();
		}
		return Response.status(403).entity("Forbidden access!").build();
	}
	
	@GET
	@Path("/host/{hostUsername}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getHostApartments(@PathParam("hostUsername") String hostUsername, @Context HttpServletRequest request) {
		UserDAO dao = (UserDAO)this.ctx.getAttribute("userDAO");
		Host host = new Host(dao.findByUsername(hostUsername));
		if(host.getUsername().equals("")) {
			return Response.status(400).entity("Invalid user!").build();	
		}
		ApartmentDAO apartmentDAO = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
		return Response.status(200).entity(apartmentDAO.getHostApartments(host)).build();	
	}
	
	@GET
	@Path("/allActiveApartments")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> getAllActiveApartments(@Context HttpServletRequest request){
		ApartmentDAO dao = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
		return (ArrayList<Apartment>) dao.getAllActiveApartments();
	}
	
	@GET
	@Path("/apartmentImages/{id}")
	public Response getApartmentImages(@Context HttpServletRequest request, @PathParam("id") Long id) {
		ApartmentDAO dao = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
		ArrayList<String> images = dao.getApartmentImages(id);
		if(images == null) {
			return Response.status(500).entity("Error occured when loading images").build();
		}
		return Response.status(200).entity(images).build();
	}
}
