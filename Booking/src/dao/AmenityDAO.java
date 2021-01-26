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

public class AmenityDAO {
	
	private List<Amenity> amenities = new ArrayList<Amenity>();
	private String ctx;
	
	public AmenityDAO(String ctx) {
		this.ctx = ctx;
		try {
			loadAmenities();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//Ucitavanje sadrzaja apartmana
	public void loadAmenities() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		BufferedReader br = null;
		File amenities = new File(this.ctx + "data/amenity.json");
		StringBuilder json = new StringBuilder();
		String line;
		
		try {
			br = new BufferedReader(new BufferedReader(new FileReader(amenities)));
			while((line = br.readLine())!=null) {
				json.append(line);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			br.close();
		}
		
		List<Amenity> amenityList = mapper.readValue(json.toString(),new TypeReference<ArrayList<Amenity>>() {});
		this.amenities.clear();
		
		for(Amenity amenity : amenityList) {
			this.amenities.add(amenity);
		}
	}
	
	//cuvanje sadrzaja apartmana u falj
	public void saveAmenities() {
		ObjectMapper mapper = new ObjectMapper();
		File amenityFile = new File(this.ctx + "data/amenity.json");	
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(amenityFile, 
					this.amenities);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//trazenje sadrzaja po id
	public Amenity findByID(Long id) {
		for(Amenity a : amenities) {
			if(a.getId().equals(id)) {
				return a;
			}
		}
		return null;
	}
	
	public void putAmenity(Amenity amenity) {
		
		this.amenities.sort((a,b) -> Long.compare(b.getId(), a.getId()));
		Long maxId = this.amenities.get(0).getId();
		amenity.setId(++maxId);
		this.amenities.add(amenity);
	}
	
	public boolean modifyAmenity(Amenity amenity) {
		for(Amenity a : amenities) {
			if(a.getId().equals(amenity.getId())) {
				a.setName(amenity.getName());
				return true;
			}
		}
		return false;
	}
	
	public boolean deleteAmenity(Long id) {
		for(Amenity a : amenities) {
			if(a.getId().equals(id)) {
				this.amenities.remove(a);
				return true;
			}
		}
		return false;
	}

	public List<Amenity> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Amenity> amenities) {
		this.amenities = amenities;
	}

	public String getCtx() {
		return ctx;
	}

	public void setCtx(String ctx) {
		this.ctx = ctx;
	}
}
