package com.app.bicycle.utils;


import com.app.bicycle.entities.User;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

@Component
public class ScheduledTimer {
    private Map<User, Timer> reservationTimers;
    private Map<User, Boolean> reservationValidity;
    private Map<User, Timer> rentTimers;
    private Map<User, Boolean> rentValidity;

    public ScheduledTimer() {
        reservationTimers = new HashMap<>();
        reservationValidity = new HashMap<>();
        rentTimers = new HashMap<>();
        rentValidity = new HashMap<>();
    }

    public void startReservation(User user) {
        Timer reservationTimer = new Timer();
        reservationTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                reservationValidity.put(user, false);
                reservationTimers.remove(user);
            }
        }, 15 * 60 * 1000); // 15 minutes in milliseconds
        reservationTimers.put(user, reservationTimer);
        reservationValidity.put(user, true);
    }

    public void completeReservation(User user) {
        Timer timer = reservationTimers.get(user);
        if (timer != null) {
            timer.cancel();
            reservationTimers.remove(user);
        }
    }

    public boolean isReservationValid(User user) {
        return reservationValidity.getOrDefault(user, false);
    }

    public void startRentTimer(User user) {
        Timer rentTimer = new Timer();
        long rentDurationInMillis = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
        long notificationTimeInMillis = rentDurationInMillis - (15 * 60 * 1000); // 15 minutes before expiration
        rentTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                rentValidity.put(user, false);
                rentTimers.remove(user);
            }
        }, notificationTimeInMillis); // 5 hours in milliseconds
        rentTimers.put(user, rentTimer);
        rentValidity.put(user, true);
    }

    public void completeRent(User user) {
        Timer timer = rentTimers.get(user);
        if (timer != null) {
            timer.cancel();
            rentTimers.remove(user);
        }
    }

    public boolean isRentValid(User user) {
        return rentValidity.getOrDefault(user, false);
    }
}
