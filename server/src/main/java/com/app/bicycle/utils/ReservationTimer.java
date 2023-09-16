package com.app.bicycle.utils;


import com.app.bicycle.entities.User;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

@Component
public class ReservationTimer {
    private Map<User, Timer> reservationTimers;
    private Map<User, Boolean> reservationValidity;

    public ReservationTimer() {
        reservationTimers = new HashMap<>();
        reservationValidity = new HashMap<>();
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
}
