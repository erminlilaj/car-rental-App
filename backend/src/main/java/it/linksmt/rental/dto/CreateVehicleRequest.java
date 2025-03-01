package it.linksmt.rental.dto;

import it.linksmt.rental.enums.FuelType;
import it.linksmt.rental.enums.GearboxType;
import it.linksmt.rental.enums.VehicleStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateVehicleRequest {
private String brand;
private String model;
private int year;
private GearboxType gearboxType;
private FuelType fuelType;
private String color;
private VehicleStatus vehicleStatus;
private double dailyFee;


}
