package com.app.bicycle.utils;

public class Endpoints {

    //Stations
    public final String ALL_STATIONS = "app/stations/getAllActiveStations";
    public final String DEACTIVATE_STATION = "app/stations/deactivateStation";
    public final String ACTIVATE_STATION = "app/stations/activateStation";
    public final String ADD_STATION = "app/stations/newStation";
    public final String ADD_BICYCLE_TO_STATION = "app/stations/addBicycleToStation";

    //Bicycles
    public final String ALL_BICYCLES = "app/bicycles/getAllBicycles";
    public final String ADD_BICYCLE = "app/bicycles/newBicycle";
    public final String DEACTIVATE_BICYCLE = "app/bicycles/deactivateBicycle";
    public final String ACTIVATE_BICYCLE = "app/bicycles/activateBicycle";
    public final String SWITCH_DAMAGE_FLAG = "app/bicycles/switchDamageFlag";
}
