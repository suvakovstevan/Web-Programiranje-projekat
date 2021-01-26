package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Apartment {

	private Long id;
	private ApartmentType type;
	private Integer roomNumber;
	private Integer guestNumber;
	private Location location;
	private Host host;
	private Double pricePerNight;
	private Date checkInTime;
	private Date checkOutTime;
	private boolean status;
	private List<DateState> reservationDates;
	private List<String> images;
	List<Amenity> amenidies;
	List<Reservation> reservations;
	
	
	public Apartment() {
		this.reservationDates = new ArrayList<DateState>();
		this.images = new ArrayList<String>();
		this.amenidies = new ArrayList<Amenity>();
		this.reservations = new ArrayList<Reservation>();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public ApartmentType getType() {
		return type;
	}
	public void setType(ApartmentType type) {
		this.type = type;
	}
	public Integer getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(Integer roomNumber) {
		this.roomNumber = roomNumber;
	}
	public Integer getGuestNumber() {
		return guestNumber;
	}
	public void setGuestNumber(Integer guestNumber) {
		this.guestNumber = guestNumber;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public Host getHost() {
		return host;
	}
	public void setHost(Host host) {
		this.host = host;
	}
	public Double getPricePerNight() {
		return pricePerNight;
	}
	public void setPricePerNight(Double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}
	public Date getCheckInTime() {
		return checkInTime;
	}
	public void setCheckInTime(Date checkInTime) {
		this.checkInTime = checkInTime;
	}
	public Date getCheckOutTime() {
		return checkOutTime;
	}
	public void setCheckOutTime(Date checkOutTime) {
		this.checkOutTime = checkOutTime;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public List<DateState> getReservationDates() {
		return reservationDates;
	}
	public void setReservationDates(List<DateState> reservationDates) {
		this.reservationDates = reservationDates;
	}
	public List<String> getImages() {
		return images;
	}
	public void setImages(List<String> images) {
		this.images = images;
	}
	
	public List<Amenity> getAmenidies() {
		return amenidies;
	}

	public void setAmenidies(List<Amenity> amenidies) {
		this.amenidies = amenidies;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}
}
