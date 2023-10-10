package com.app.bicycle.utils;

public class Endpoints {

    //Stations
    public final String ALL_STATIONS = "app/stations/getAllStations";
    public final String STATIONS_WITH_BICYCLES = "app/stations/getStationWithBicycles";
    public final String ADD_STATION = "app/stations/newStation";
    public final String DEACTIVATE_STATION = "app/stations/deactivateStation";
    public final String ACTIVATE_STATION = "app/stations/activateStation";
    public final String ADD_BICYCLE_TO_STATION = "app/stations/addBicycleToStation";

    //Bicycles
    public final String ALL_BICYCLES = "app/bicycles/getAllBicycles";
    public final String ADD_BICYCLE = "app/bicycles/newBicycle";
    public final String DEACTIVATE_BICYCLE = "app/bicycles/deactivateBicycle";
    public final String ACTIVATE_BICYCLE = "app/bicycles/activateBicycle";

    //Users
    public final String REGISTER_USER = "app/user/registerUser";
    public final String RENT_BICYCLE = "app/user/rent";
    public final String REPORT_FAULTS = "app/user/reportFault";

    //Payment
    public final String CHARGE = "app/payment/charge";
    public final String CHECKOUT = "app/payment/checkout";
}
