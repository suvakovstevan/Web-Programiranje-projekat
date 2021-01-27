package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Apartment;
import beans.DateState;
import beans.Reservation;
import beans.User;

public class ReservationDAO {

	private List<Reservation> reservations = new ArrayList<Reservation>();

	private String ctx;
	
	public ReservationDAO(String ctx) {
		this.ctx=ctx;
		try {
			loadReservations();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void loadReservations() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		BufferedReader br = null;
		File reservations = new File(this.ctx + "data/reservation.json");
		StringBuilder json = new StringBuilder();
		String line;
		
		try {
			br = new BufferedReader(new BufferedReader(new FileReader(reservations)));
			while((line = br.readLine())!=null) {
				json.append(line);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			br.close();
		}
		
		List<Reservation> reservationList = mapper.readValue(json.toString(),new TypeReference<ArrayList<Reservation>>() {});
		this.reservations.clear();
		
		for(Reservation reservation : reservationList) {
			this.reservations.add(reservation);
		}
	}
	
	public void saveReservations() {
		ObjectMapper mapper = new ObjectMapper();
		File reservationFile = new File(this.ctx + "data/reservation.json");	
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(reservationFile, 
					this.reservations);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void putReservation(Reservation reservation) {	
		this.reservations.sort((a,b) -> Long.compare(b.getId(), a.getId()));
		Long maxId = this.reservations.get(0).getId();
		reservation.setId(++maxId);
		this.reservations.add(reservation);
	}
	
	public Reservation findByID(Long id) {
		for(Reservation r : reservations) {
			if(r.getId().equals(id)) {
				return r;
			}
		}
		return null;
	}
	public boolean modifyReservation(Reservation reservation) {
		for(Reservation r : reservations) {
			if(r.getId().equals(reservation.getId())) {
				r.setGuest(reservation.getGuest());
				r.setMessage(reservation.getMessage());
				r.setNightNumber(reservation.getNightNumber());
				r.setResApartment(reservation.getResApartment());
				r.setStartDate(reservation.getStartDate());
				r.setStatus(reservation.getStatus());
				r.setSumPrice(reservation.getSumPrice());
				return true;
			}
		}
		return false;
	}
	
	public boolean checkIfAvaliable(Reservation reservation, Apartment apartment) {
		// TODO Auto-generated method stub
		for(DateState ds : apartment.getReservationDates()) {
			if(ds.getDate().equals(reservation.getStartDate()) || 
					ds.getDate().equals((reservation.getStartDate().getTime() + (reservation.getNightNumber() *86400*1000)))) {
				return false;
			}
		}
		return true;
	}
	
	public ArrayList<Reservation> findByUser(String username) {
		// TODO Auto-generated method stub
		ArrayList<Reservation> reservationList = new ArrayList<Reservation>();
		for(Reservation r : this.reservations) {
			if(r.getGuest().getUsername().equals(username)) {
				reservationList.add(r);
			}	
		}
		return reservationList;
	}
	
	public ArrayList<User> getHostsReservationUsernames(User user) {
		ArrayList<User> usersList = new ArrayList<User>();
		for(Reservation r : this.reservations) {
			if(r.getResApartment().getHost().getUsername().equals(user.getUsername())) {
				usersList.add(r.getGuest());
			}
		}
		return usersList;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

	public String getCtx() {
		return ctx;
	}

	public void setCtx(String ctx) {
		this.ctx = ctx;
	}

}
