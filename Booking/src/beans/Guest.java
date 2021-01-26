package beans;

public class Guest extends User{
	
	public Guest() {
		super();
		this.setUserRole(UserRole.GUEST);
	}
	
	public Guest(User user) {
		this.setUsername(user.getUsername());
		this.setPassword(user.getPassword());
		this.setFirstName(user.getFirstName());
		this.setLastName(user.getLastName());
		this.setGender(user.getGender());
		this.setUserRole(UserRole.GUEST);
	}
}
