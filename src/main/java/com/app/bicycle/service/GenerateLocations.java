package com.app.bicycle.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


//Use for generating locations, remove later!
public class GenerateLocations {
    public static void main(String[] args) {
        List<double[]> locations = generateRandomLocations(50);

        // Print the generated locations
        for (int i = 0; i < locations.size(); i++) {
            double[] coordinates = locations.get(i);
            double latitude = coordinates[0];
            double longitude = coordinates[1];
            System.out.println("Location " + (i + 1) + ": Latitude: " + latitude + ", Longitude: " + longitude);
        }
    }

    public static List<double[]> generateRandomLocations(int count) {
        // Sofia, Bulgaria approximate boundaries (latitude and longitude)
        double minLatitude = 42.64;
        double maxLatitude = 42.73;
        double minLongitude = 23.26;
        double maxLongitude = 23.41;

        Random random = new Random();
        List<double[]> locations = new ArrayList<>();

        // Generate random coordinates for the specified count
        for (int i = 0; i < count; i++) {
            double latitude = minLatitude + (maxLatitude - minLatitude) * random.nextDouble();
            double longitude = minLongitude + (maxLongitude - minLongitude) * random.nextDouble();
            locations.add(new double[]{latitude, longitude});
        }

        return locations;
    }
}



