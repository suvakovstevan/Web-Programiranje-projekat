package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Admin;
import beans.Guest;
import beans.Host;
import beans.User;
import beans.UserRole;

public class UserDAO {
	
	private List<User> users = new ArrayList<User>();

	private String ctx;
	
	public UserDAO(String ctx) {
		this.ctx=ctx;
		try {
			loadUsers();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//Metoda koja ucitava usere iz faljova
	private void loadUsers() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		BufferedReader br = null;
		
		//Ucitavanje admina
		File admins = new File(this.ctx + "data/admin.json");
		StringBuilder json = new StringBuilder();
		String line;
		
		try {
			br = new BufferedReader(new BufferedReader(new FileReader(admins)));
			while((line = br.readLine())!=null) {
				json.append(line);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			br.close();
		}
		
		List<Admin> adminList = mapper.readValue(json.toString(),new TypeReference<ArrayList<Admin>>() {});
		this.users.clear();
		
		for(Admin admin : adminList) {
			this.users.add(admin);
		}
		
		//Ucitavanje gostiju
		File guests = new File(this.ctx + "data/guest.json");
		json.setLength(0);
		json = new StringBuilder();
		
		try {
			br = new BufferedReader(new BufferedReader(new FileReader(guests)));
			while((line = br.readLine())!=null) {
				json.append(line);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			br.close();
		}
		
		List<Guest> guestList = mapper.readValue(json.toString(),new TypeReference<ArrayList<Guest>>() {});
		for(Guest guest : guestList) {
			this.users.add(guest);
		}
		
		//Ucitavanje domacina
		File hosts = new File(this.ctx + "data/host.json");
		json.setLength(0);
		json = new StringBuilder();
		
		try {
			br = new BufferedReader(new BufferedReader(new FileReader(hosts)));
			while((line = br.readLine())!=null) {
				json.append(line);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			br.close();
		}
		
		List<Host> hostList = mapper.readValue(json.toString(),new TypeReference<ArrayList<Host>>() {});
		for(Host host : hostList) {
			this.users.add(host);
		}
	}
	
	//Metoda koja pronalazi usera po username-u
	public User findByUsername(String username) {
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				return u;
			}
		}
		return null;
	}
	
	public User findByUsernameAndPass(String username, String password) {
		for(User u : users) {
			if(u.getUsername().equals(username) && u.getPassword().equals(password)) {
				return u;
			}
		}
		return null;
	}
		
	public void saveUsers() {
		ObjectMapper mapper = new ObjectMapper();
		
		//lista administratora
		ArrayList<Admin> admins = new ArrayList<Admin>();
		for (User u : users) {
			if(u.getUserRole().equals(UserRole.ADMIN)) {
				Admin temp = new Admin(u);
				admins.add(temp);
			}
		}
		
		//lista gostiju
		ArrayList<Guest> guests = new ArrayList<Guest>();
		for (User u : users) {
			if(u.getUserRole().equals(UserRole.GUEST)) {
				Guest temp = new Guest(u);
				guests.add(temp);
			}
		}
		
		//lista domacina
		ArrayList<Host> hosts = new ArrayList<Host>();
		for (User u : users) {
			if(u.getUserRole().equals(UserRole.HOST)) {
				Host temp = new Host(u);
				hosts.add(temp);
			}
		}
		
		//upisivanje admina
		File adminFile = new File(this.ctx + "data/admin.json");
		
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(adminFile, 
					admins);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//upisivanje gostiju
		File guestFile = new File(this.ctx + "data/guest.json");
		
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(guestFile, 
					guests);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//upisivanje domacina
		File hostFile = new File(this.ctx + "data/host.json");
		
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(hostFile, 
					hosts);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void putUser(User user) {
		this.users.add(user);
	}
	
	public boolean modifyUser(User user) {
		for(User u : users) {
			if(u.getUsername().equals(user.getUsername())) {
				this.users.remove(u);
				this.users.add(user);
				return true;
			}
		}
		return false;
	}
	

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public String getCtx() {
		return ctx;
	}

	public void setCtx(String ctx) {
		this.ctx = ctx;
	}

}
