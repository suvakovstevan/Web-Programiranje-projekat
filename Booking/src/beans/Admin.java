package beans;

public class Admin extends User{
	
	public Admin() {
		super();
		this.setUserRole(UserRole.ADMIN);
	}
	
	public Admin(User user) {
		this.setUsername(user.getUsername());
		this.setPassword(user.getPassword());
		this.setFirstName(user.getFirstName());
		this.setLastName(user.getLastName());
		this.setGender(user.getGender());
		this.setUserRole(UserRole.ADMIN);
	}
}
