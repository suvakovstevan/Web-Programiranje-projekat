package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import beans.UserRole;
import dao.UserDAO;

@Path("/users")
public class UserService {

	@Context
	ServletContext ctx;
	
	@Context
	HttpServletRequest request;
	
	public UserService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("userDAO")==null) {
			ctx.setAttribute("userDAO", new UserDAO(ctx.getRealPath("/")));
		}
	}
	
	@GET
	@Path("helloWorld")
	public Response helloWOrld(@Context HttpServletRequest request) {
		
		return Response.status(200).entity("Hello World").build();
	}
	
	@PUT
	@Path("modify")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyUser(User newUser, @Context HttpServletRequest request) {
		
		UserDAO dao = (UserDAO) this.ctx.getAttribute("userDAO");
		
		if(dao.modifyUser(newUser)) {
			dao.saveUsers();
			request.getSession().setAttribute("user", newUser);
			return Response.status(200).entity("User successfully modified").build();
		}
		
		return Response.status(400).entity("User not found!").build();
	}
	
	@GET
	@Path("allUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Response allUsers(@Context HttpServletRequest request) {
		User admin = (User) request.getSession().getAttribute("user");
		
		if(admin==null) {
			return Response.status(400).entity("No logged users!").build();
		}
		
		if(admin.getUserRole().equals(UserRole.ADMIN) || admin.getUserRole().equals(UserRole.HOST)) {
			UserDAO dao = (UserDAO) this.ctx.getAttribute("userDAO");
			return Response.status(200).entity(dao.getUsers()).build();
		}
		return Response.status(403).entity("Access denied!").build();
	}
}
