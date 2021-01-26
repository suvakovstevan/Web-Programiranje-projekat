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
import beans.Amenity;
import beans.Apartment;
import beans.Host;

public class ApartmentDAO {

	private String ctx;
	private List<Apartment> apartments = new ArrayList<Apartment>();
	
	public ApartmentDAO() {
		
	}
	
	public ApartmentDAO(String ctx) {
		this.ctx=ctx;
		try {
			loadApartments();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//ucitavanje apartmana iz fajla
	public void loadApartments() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		BufferedReader br = null;
		File apartments = new File(this.ctx + "data/apartment.json");
		StringBuilder json = new StringBuilder();
		String line;
		
		try {
			br = new BufferedReader(new BufferedReader(new FileReader(apartments)));
			while((line = br.readLine())!=null) {
				json.append(line);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			br.close();
		}
		
		List<Apartment> apartmentList = mapper.readValue(json.toString(),new TypeReference<ArrayList<Apartment>>() {});
		this.apartments.clear();
		
		for(Apartment apartment : apartmentList) {
			this.apartments.add(apartment);
		}
	}
	
	//cuvanje apartmana u file
	public void saveApartments() {
		ObjectMapper mapper = new ObjectMapper();
		File apartmentFile = new File(this.ctx + "data/apartment.json");	
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(apartmentFile, 
					this.apartments);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//trazenje apartmana po id
	public Apartment findByID(Long id) {
		for(Apartment a : apartments) {
			if(a.getId().equals(id)) {
				return a;
			}
		}
		return null;
	}
	
	//dodavanje apartmana
	public void putApartment(Apartment apartment) {
		
		this.apartments.sort((a,b) -> Long.compare(b.getId(), a.getId()));
		Long maxId = this.apartments.get(0).getId();
		apartment.setId(++maxId);
		this.apartments.add(apartment);
	}
	
	public boolean modifyAapartment(Apartment apartment) {
		for(Apartment a : apartments) {
			if(a.getId().equals(apartment.getId())) {
				a.setType(apartment.getType());
				a.setRoomNumber(apartment.getRoomNumber());
				a.setRoomNumber(apartment.getRoomNumber());
				a.setGuestNumber(apartment.getGuestNumber());
				a.setLocation(apartment.getLocation());
				a.setHost(apartment.getHost());
				a.setPricePerNight(apartment.getPricePerNight());
				a.setCheckInTime(apartment.getCheckInTime());
				a.setCheckOutTime(apartment.getCheckOutTime());
				a.setStatus(apartment.isStatus());
				a.setReservationDates(apartment.getReservationDates());
				a.setAmenidies(apartment.getAmenidies());
				a.setReservations(apartment.getReservations());
				return true;
			}
		}
		return false;
	}
	
	public boolean deleteApartment(Long id) {
		for(Apartment a : apartments) {
			if(a.getId().equals(id)) {
				this.apartments.remove(a);
				return true;
			}
		}
		return false;
	}

	public List<Apartment> getHostApartments(Host host){
		List<Apartment> hostApartmentList = new ArrayList<Apartment>();
		for(Apartment a : apartments) {
			if(a.getHost().getUsername().equals(host.getUsername())) {
				hostApartmentList.add(a);
			}
		}
		return hostApartmentList;
	}

	public List<Apartment> getAllActiveApartments(){
		ArrayList<Apartment> activeApartments = new ArrayList<Apartment>();
		for(Apartment a : apartments) {
			if(a.isStatus()) {
				activeApartments.add(a);
			}
		}
		return activeApartments;
	}
	
	public void deleteAmenityfromApartment(Amenity amenity) {
		ArrayList<Apartment> apartments = new ArrayList<Apartment>(this.getApartments());
		for(Apartment a: apartments) {
			if(a.getAmenidies()!= null) {
				ArrayList<Amenity> amenities = (ArrayList<Amenity>) a.getAmenidies();
				for(Amenity am: amenities) {
					if(am.getId().equals(amenity.getId())) {
						amenities.remove(am);
						break;
					}
				}
			}
		}
	}
	
	public void editAmenityFromApartment(Amenity amenity) {
		ArrayList<Apartment> apartments = new ArrayList<Apartment>(this.getApartments());
		for(Apartment a: apartments) {
			if(a.getAmenidies()!=null) {
				ArrayList<Amenity> amenities = (ArrayList<Amenity>) a.getAmenidies();
				for(Amenity am : amenities) {
					if(am.getId().equals(amenity.getId())) {
						am.setName(amenity.getName());
						break;
					}
				}
			}
		}
	}
	
	public ArrayList<String> getApartmentImages(Long id) {
		Apartment apartment = this.findByID(id);
		if(apartment != null) {
			return (ArrayList<String>) apartment.getImages();
		}
		return null;
	}

	public String getCtx() {
		return ctx;
	}

	public void setCtx(String ctx) {
		this.ctx = ctx;
	}

	public List<Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(List<Apartment> apartments) {
		this.apartments = apartments;
	}
}
