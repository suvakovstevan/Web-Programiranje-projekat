package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import dao.UserDAO;

@Path("/")
public class LoginService {

	@Context
	ServletContext ctx;
	
	@Context
	HttpServletRequest request;
	
	public User loggedUser;
	
	public LoginService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO(ctx.getRealPath("/")));
			
		}
		this.loggedUser = null;
		
	}
	
	@GET
	@Path("helloWorld")
	public Response helloWOrld(@Context HttpServletRequest request) {
		
		return Response.status(200).entity("Hello World").build();
	}
	
	@POST
	@Path("register")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response register(User user,@Context HttpServletRequest request) {
		
		if(user==null) {
			return Response.status(400).entity("All fields must be filled!").build();
		}
		
		UserDAO dao = (UserDAO) this.ctx.getAttribute("userDAO");
		if(dao.findByUsername(user.getUsername())==null) {
			dao.putUser(user);
			dao.saveUsers();
			return Response.status(200).entity("User successfully registered!").build();
		}
		return Response.status(400).entity("User already exist!").build();
	}
	
	@POST
	@Path("login")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response logIn(User user, @Context HttpServletRequest request) {
		
		UserDAO dao = (UserDAO) this.ctx.getAttribute("userDAO");
		User currUser = dao.findByUsernameAndPass(user.getUsername(), user.getPassword());
		if(currUser == null) {
			return Response.status(400).entity("invalid username or password").build();
		}
		
		request.getSession().setAttribute("user", currUser);
		return Response.status(200).entity("Korisnik uspesno ulogovan!").build();
	}
	
	@GET
	@Path("currentUser")
	@Produces(MediaType.APPLICATION_JSON)
	public Response currentUser(@Context HttpServletRequest request) {
		User user = (User) request.getSession().getAttribute("user");

		//if(user==null) {
			// return Response.status(400).entity("No logged users!").build();
		//}
		//System.out.println("currUser: " + user.getUsername() + " " + user.getPassword() + " " + user.getFirstName() + " " + user.getLastName() + " " + user.getGender() + " " + user.getUserRole() + " " );
		
		return Response.status(200).entity(user).build();
	}
	
	@POST
	@Path("logout")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response logoutMethod(@Context HttpServletRequest request) {
		if(request.getSession().getAttribute("user")==null) {
			return Response.status(400).entity("Nema ulogovanih korisnika!").build();
		}
		request.getSession().invalidate();
		return Response.status(200).entity("Korisnik uspesno izlogovan!").build();
	}
}
