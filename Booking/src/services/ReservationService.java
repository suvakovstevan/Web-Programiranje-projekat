package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
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
import beans.Reservation;
import beans.User;
import beans.UserRole;
import dao.ApartmentDAO;
import dao.ReservationDAO;
import dao.UserDAO;

@Path("/reservations")
public class ReservationService {

	@Context
	ServletContext ctx;
	
	public ReservationService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(this.ctx.getAttribute("reservationDAO") == null) {
			this.ctx.setAttribute("reservationDAO", new ReservationDAO(this.ctx.getRealPath("/")));
		}
		if(this.ctx.getAttribute("userDAO") == null) {
			this.ctx.setAttribute("userDAO", new UserDAO(this.ctx.getRealPath("/")));
		}
		if(this.ctx.getAttribute("apartmentDAO") == null) {
			this.ctx.setAttribute("apartmentDAO", new ApartmentDAO(this.ctx.getRealPath("/")));
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
		if(admin.getUserRole().equals(UserRole.ADMIN)) {
			ReservationDAO dao = (ReservationDAO) this.ctx.getAttribute("reservationDAO");
			return Response.status(200).entity(dao.getReservations()).build();	
		}
		return Response.status(403).entity("Forbidden access!").build();
	}
	
	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createReservation(Reservation reservation, @Context HttpServletRequest request) {
		User user = (User) request.getSession().getAttribute("user");
		if(user==null) {
			return Response.status(400).entity("No logged users!").build();	
		}
		if(user.getUserRole().equals(UserRole.GUEST)) {
			ReservationDAO dao = (ReservationDAO) this.ctx.getAttribute("reservationDAO");
			ApartmentDAO apartmentDAO = (ApartmentDAO) this.ctx.getAttribute("apartmentDAO");
			Apartment apartment = apartmentDAO.findByID(reservation.getResApartment().getId());
			if(!dao.checkIfAvaliable(reservation, apartment)) {
				return Response.status(400).entity("Apartment reserverd for that date!").build();
			}
			dao.putReservation(reservation);
			dao.saveReservations();
			return Response.status(200).entity("Reservation successfully created!").build();
		}
		return Response.status(403).entity("Forbidden access!").build();
	}
	
	@PUT
	@Path("modify")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyReservation(Reservation reservation, @Context HttpServletRequest request) {
		User admin = (User) request.getSession().getAttribute("user");
		if(admin==null) {
			return Response.status(400).entity("No logged users!").build();	
		}
		if(admin.getUserRole().equals(UserRole.ADMIN)) {
			ReservationDAO dao = (ReservationDAO) this.ctx.getAttribute("reservationDAO");
			if(dao.modifyReservation(reservation)) {
				dao.saveReservations();
				return Response.status(200).entity("Reservation successfully modified!").build();
			}
			return Response.status(400).entity("Selected reservation does not exist!!").build();
		}
		return Response.status(403).entity("Forbidden access!").build();
	}
	
	@GET
	@Path("/getReservation/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReservation(@PathParam("id") Long id, @Context HttpServletRequest request) {
		ReservationDAO dao = (ReservationDAO) this.ctx.getAttribute("reservationDAO");
		Reservation reservation =  dao.findByID(id);
		
		if(reservation == null) {
			Response.status(400).entity("Selected reservation does not exist!!").build();
		}
		return Response.status(200).entity(reservation).build();
	}
	
	@GET
	@Path("/getHost/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getHostReservations(@PathParam("username") String username, @Context HttpServletRequest request) {
		UserDAO userDAO = (UserDAO) this.ctx.getAttribute("userDAO");
		User host = userDAO.findByUsername(username);
		
		if(host == null) {
			return Response.status(400).entity("No logged user!").build();
		}
		
		if(host.getUserRole()!=UserRole.HOST) {
			return Response.status(403).entity("Forbidden access!").build();
		}
		ReservationDAO reservationDAO = (ReservationDAO) this.ctx.getAttribute("reservationDAO");
		ArrayList<Reservation> allReservations = new ArrayList<Reservation>(reservationDAO.getReservations());
		ArrayList<Reservation> hostReservations = new ArrayList<Reservation>();
		for(Reservation r: allReservations) {
			if(r.getResApartment().getHost().getUsername().equals(host.getUsername())) {
				hostReservations.add(r);
			}
		}
		return Response.status(200).entity(hostReservations).build();
	}
	
	@GET
	@Path("/getGuest/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getGuestReservations(@PathParam("username") String username, @Context HttpServletRequest request) {
		UserDAO userDAO = (UserDAO) this.ctx.getAttribute("userDAO");
		User guest = userDAO.findByUsername(username);
		
		if(guest == null) {
			return Response.status(400).entity("No logged user!").build();
		}
		
		if(guest.getUserRole()!=UserRole.GUEST) {
			return Response.status(403).entity("Forbidden access!").build();
		}
		
		ReservationDAO dao = (ReservationDAO) this.ctx.getAttribute("reservationDAO");
		ArrayList<Reservation> guestReservations = dao.findByUser(username);
		return Response.status(200).entity(guestReservations).build();
	}
	
	@GET
	@Path("/getGuests/{hostUsername}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getGuestsFromReservations(@PathParam("hostUsername") String username, @Context HttpServletRequest request) {
		UserDAO userDAO = (UserDAO) this.ctx.getAttribute("userDAO");
		ReservationDAO dao = (ReservationDAO) this.ctx.getAttribute("reservationDAO");
		User host = userDAO.findByUsername(username);
		if(host == null) {
			return Response.status(400).entity("No logged user!").build();
		}
		
		if(host.getUserRole()!=UserRole.HOST) {
			return Response.status(403).entity("Forbidden access!").build();
		}
		return Response.status(200).entity(dao.getHostsReservationUsernames(host)).build();
	}
}
