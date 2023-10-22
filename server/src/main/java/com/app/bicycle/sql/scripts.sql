INSERT INTO `bicycleapp`.`station` (`active_flag`, `longitude`, `latitude`, `station_name`)
VALUES (1, 23.321, 42.698, 'Serdika'),
       (1, 23.343, 42.655, 'Studentski grad'),
       (1, 23.274, 42.678, 'Slavia'),
       (1, 23.413, 42.707, 'Vrazhdebna'),
       (1, 23.343, 42.696, 'Serdika2'),
       (1, 23.313, 42.625, 'Vitosha'),
       (1, 23.314, 42.65, 'Krastova vada'),
       (1, 23.277, 42.656, 'Manastirski livadi'),
       (1, 23.363, 42.673, 'Tsarigradsko Shose'),
       (1, 23.397, 42.664, 'Drujba 1'),
       (1, 23.310, 42.678, 'NDK'),
       (1, 23.317, 42.710, 'Banishora');


INSERT INTO `bicycleapp`.`bicycle` (`active_flag`, `battery_level`, `state`)
VALUES (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE'),
       (1, 100, 'FREE');


INSERT INTO `bicycleapp`.`station_bicycle` (`bike_id`, `station_id`)
VALUES ('1', '1'),
       ('2', '2'),
       ('3', '3'),
       ('4', '4'),
       ('5', '5'),
       ('6', '6'),
       ('7', '7'),
       ('8', '8'),
       ('9', '1'),
       ('10', '2'),
       ('11', '3'),
       ('12', '9'),
       ('13', '5'),
       ('14', '6'),
       ('15', '7'),
       ('16', '8'),
       ('17', '1'),
       ('18', '9'),
       ('19', '3'),
       ('20', '4'),
       ('21', '5'),
       ('22', '6'),
       ('23', '7'),
       ('24', '9'),
       ('25', '1'),
       ('26', '2'),
       ('27', '3'),
       ('28', '4'),
       ('29', '5'),
       ('30', '6'),
       ('31', '2'),
       ('32', '3'),
       ('33', '9'),
       ('34', '4'),
       ('35', '5'),
       ('36', '9'),
       ('37', '1'),
       ('38', '5'),
       ('39', '3'),
       ('40', '9');

INSERT INTO `bicycleapp`.`fault_report` (`date`, `fault_text`, `bike_id`, `user_id`)
VALUES ('2023-10-13', 'Flat tire', '1', '1');
UPDATE `bicycleapp`.`bicycle`
SET `active_flag` = 0
WHERE (`id` = '1');

INSERT INTO `bicycleapp`.`fault_report` (`date`, `fault_text`, `bike_id`, `user_id`)
VALUES ('2023-10-13', 'Break issue', '2', '2');
UPDATE `bicycleapp`.`bicycle`
SET `active_flag` = 0
WHERE (`id` = '2');

INSERT INTO `bicycleapp`.`price` (`minute_price`, `start_date`, `unlock_price`)
VALUES ('0.30', '2023-09-16', '1.50');


INSERT INTO `bicycleapp`.`rental` (`date`, `distance`, `end_time`, `finished`, `price`, `start_time`, `bike_id`, `station_id`,
                      `user_id`)
VALUES ('2023-10-05 09:00:00.000000', 5.0, '2023-10-05 09:30:00.000000', 1, 10.50, '2023-10-05 09:00:00.000000', 2, 1,
        1),
       ('2023-10-07 10:00:00.000000', 20.5, '2023-10-07 11:30:00.000000', 1, 16.50, '2023-10-07 10:00:00.000000', 3, 2,
        1),
       ('2023-10-08 12:00:00.000000', 8.4, '2023-10-08 13:00:00.000000', 1, 10.50, '2023-10-08 12:00:00.000000', 4, 5,
        1),
       ('2023-10-10 14:00:00.000000', 10.7, '2023-10-10 15:00:00.000000', 1, 10.50, '2023-10-10 14:00:00.000000', 5, 3,
        1),
       ('2023-10-11 16:00:00.000000', 15.2, '2023-10-11 17:30:00.000000', 1, 16.50, '2023-10-11 16:00:00.000000', 6, 4,
        1);

INSERT INTO `bicycleapp`.`payment` (`amount`, `date`, `user_id`)
VALUES (10.50, '2023-10-05 09:30:00.000000', 1),
       (16.50, '2023-10-07 11:30:00.000000', 1),
       (10.50, '2023-10-08 13:00:00.000000', 1),
       (10.50, '2023-10-10 15:00:00.000000', 1),
       (16.50, '2023-10-11 17:30:00.000000', 1);

ALTER TABLE `bicycleapp`.`rental`
DROP
FOREIGN KEY FKm6f1r8a0m7w8n5upyjslprj25,
ADD FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE
CASCADE;