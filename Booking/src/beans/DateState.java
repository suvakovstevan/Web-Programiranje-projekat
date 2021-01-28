package beans;

import java.util.Date;

public class DateState {

	private Date date;
	private boolean state;
	
	public DateState() {
		
	}
	
	public DateState(Date date, boolean state) {
		super();
		this.date = date;
		this.state = state;
	}
	
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public boolean isState() {
		return state;
	}
	public void setState(boolean state) {
		this.state = state;
	}
	
	
}
