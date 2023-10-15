// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { changeBicycleState } from '../api/bicycles';

// const ReservationTimer = ({ bikeId, setReservation }) => {
//   const countdownDuration = 15 * 60 * 1000
//   // const countdownDuration = .1 * 60 * 1000
//   const endTime = Date.now() + countdownDuration;
//   const [remainingTime, setRemainingTime] = useState(countdownDuration);

//   useEffect(() => {
//     const timerInterval = setInterval(() => {
//       const currentTime = Date.now();
//       const newRemainingTime = endTime - currentTime;

//       if (newRemainingTime > 0) {
//         setRemainingTime(newRemainingTime);
//       } else {
//         clearInterval(timerInterval);
//         console.log('timeout');
//         changeBicycleState(bikeId, 'FREE')
//         setReservation(false)
//       }
//     }, 100);

//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, []);

//   const formatTime = (remainingTime) => {
//     const minutes = Math.floor(remainingTime / 1000 / 60);
//     const remainingSeconds = Math.floor((remainingTime / 1000) % 60);
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Remaining time: </Text>
//       <Text style={styles.text}>{formatTime(remainingTime)}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row'
//   },
//   text: {
//     fontFamily: 'Roboto-Bold'
//   }
// });

// export default ReservationTimer;
