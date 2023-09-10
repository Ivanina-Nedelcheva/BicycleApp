package com.app.bicycle.utils;

public class Constants {
    public static final CustomResponse SUCCESSFUL_OPERATION = new CustomResponse(99, "Successful operation!");

    //ErrorCodes
    public static final CustomResponse CONNECTION_ALREADY_EXISTS = new CustomResponse(100, "Connection already exists!");
    public static final CustomResponse BICYCLE_ALREADY_ADDED_TO_A_STATION = new CustomResponse(101, "Bicycle already added to a station!");
    public static final CustomResponse STATION_AT_FULL_CAPACITY = new CustomResponse(102, "Station at full capacity!");
    public static final CustomResponse BICYCLE_DOESNT_EXIST = new CustomResponse(103, "Bicycle doesn't exist!");
    public static final CustomResponse STATION_DOESNT_EXIST = new CustomResponse(104, "Station doesn't exist!");
    public static final CustomResponse STATION_ALREADY_DEACTIVATED = new CustomResponse(105, "Station already deactivated!");
    public static final CustomResponse STATION_ALREADY_ACTIVATED = new CustomResponse(106, "Station already activated!");
    public static final CustomResponse BICYCLE_ALREADY_DEACTIVATED = new CustomResponse(107, "Bicycle already deactivated!");
    public static final CustomResponse BICYCLE_ALREADY_ACTIVATED = new CustomResponse(108, "Bicycle already activated!");
    public static final CustomResponse CANNOT_RENT_MORE_THAN_ONE_BICYCLE = new CustomResponse(109, "Cannot rent more than one bicycle!");
    public static final CustomResponse NO_BICYCLES_AVAILABLE = new CustomResponse(110, "No bicycles available!");
    public static final CustomResponse BICYCLE_IS_NOT_FREE = new CustomResponse(111, "Bicycle is not free!");
}
