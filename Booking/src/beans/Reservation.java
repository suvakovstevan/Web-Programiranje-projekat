package beans;

import java.util.Date;

public class Reservation {

	private Long id;
	private Apartment resApartment;
	private Date startDate;
	private Integer nightNumber = 1;
	private Double sumPrice;
	private String message;
	private Guest guest;
	private ReservationState status;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Apartment getResApartment() {
		return resApartment;
	}
	public void setResApartment(Apartment resApartment) {
		this.resApartment = resApartment;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Double getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(Double sumPrice) {
		this.sumPrice = sumPrice;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Guest getGuest() {
		return guest;
	}
	public void setGuest(Guest guest) {
		this.guest = guest;
	}
	public ReservationState getStatus() {
		return status;
	}
	public void setStatus(ReservationState status) {
		this.status = status;
	}
	public Integer getNightNumber() {
		return nightNumber;
	}
	public void setNightNumber(Integer nightNumber) {
		this.nightNumber = nightNumber;
	}
}
