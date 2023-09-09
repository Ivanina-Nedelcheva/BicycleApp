import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import WebSocket from 'react-native-websocket';

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://192.168.1.156:8080');

        socket.onmessage = (e) => {
            const message = JSON.parse(e.data);
            if (message.type === 'notification') {
                setNotifications([...notifications, message.message]);
            }
        };

        return () => {
            socket.close();
        };
    }, [notifications]);

    return (
        <View>
            {notifications.map((notification, index) => (
                <Text key={index} style={styles.notification}>
                    {notification}
                </Text>
            ))}
        </View>
    );
};

const styles = {
    notification: {
        // Style your notification text here
    },
};

export default NotificationComponent;
