package com.app.bicycle.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class User extends BaseEntity {
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private String password;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Column(name = "stripe_id")
    private String stripeId;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<Reservation> reservations;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<FaultReport> faultReports;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<Rental> rentals;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<Payment> payments;

    @Transient
    private Integer userRentedBicycles = 0;

    @Transient
    private Integer userReservedBicycles = 0;

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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getStripeId() {
        return stripeId;
    }

    public void setStripeId(String stripeId) {
        this.stripeId = stripeId;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

    public Set<FaultReport> getFaultReports() {
        return faultReports;
    }

    public void setFaultReports(Set<FaultReport> faultReports) {
        this.faultReports = faultReports;
    }

    public Set<Rental> getRentals() {
        return rentals;
    }

    public void setRentals(Set<Rental> rentals) {
        this.rentals = rentals;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public Integer getUserRentedBicycles() {
        return userRentedBicycles;
    }

    public void setUserRentedBicycles(Integer userRentedBicycles) {
        this.userRentedBicycles = userRentedBicycles;
    }

    public Integer getUserReservedBicycles() {
        return userReservedBicycles;
    }

    public void setUserReservedBicycles(Integer userReservedBicycles) {
        this.userReservedBicycles = userReservedBicycles;
    }
}
