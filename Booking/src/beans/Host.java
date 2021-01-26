package beans;

public class Host extends User{
	
	public Host() {
		super();
		this.setUserRole(UserRole.HOST);
	}
	
	public Host(User user) {
		this.setUsername(user.getUsername());
		this.setPassword(user.getPassword());
		this.setFirstName(user.getFirstName());
		this.setLastName(user.getLastName());
		this.setGender(user.getGender());
		this.setUserRole(user.getUserRole());
	}	
}
