package com.app.bicycle.dto;


import com.app.bicycle.entities.FaultReport;
import com.app.bicycle.entities.Payment;
import com.app.bicycle.entities.Rental;
import com.app.bicycle.entities.Reservation;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    //maybe delete later!

    public UserDTO() {

    }

    private Long id;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String email;

    private String age;

    private String username;

    private String password;

    private String role;

    private Integer userRentedBicycles = 0;

    private List<Reservation> reservations = new ArrayList<>();

    private List<FaultReport> faultReports = new ArrayList<>();

    private List<Rental> rentals = new ArrayList<>();

    private List<Payment> payments = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getUserRentedBicycles() {
        return userRentedBicycles;
    }

    public void setUserRentedBicycles(Integer userRentedBicycles) {
        this.userRentedBicycles = userRentedBicycles;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public List<FaultReport> getFaultReports() {
        return faultReports;
    }

    public void setFaultReports(List<FaultReport> faultReports) {
        this.faultReports = faultReports;
    }

    public List<Rental> getRentals() {
        return rentals;
    }

    public void setRentals(List<Rental> rentals) {
        this.rentals = rentals;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }
}
