INSERT INTO `bicycleapp`.`station` (`active_flag`, `longitude`, `latitude`, `station_name`)
VALUES (1, 23.321, 42.698, 'Serdika'),
       (1, 23.343, 42.655, 'Studentski grad'),
       (1, 23.274, 42.678, 'Slavia'),
       (1, 23.413, 42.707, 'Vrazhdebna'),
       (1, 23.343, 42.696, 'Serdika2'),
       (1, 23.313, 42.625, 'Vitosha'),
       (1, 23.314, 42.65, 'Krastova vada'),
       (1, 23.277, 42.656, 'Manastirski livadi');


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
       (1, 100, 'FREE');


INSERT INTO `bicycleapp`.`station_bicycle` (`bike_id`, `station_id`) VALUES ('1', '1'),
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
 ('12', '4'),
 ('13', '5'),
 ('14', '6'),
 ('15', '7'),
 ('16', '8'),
 ('17', '1'),
 ('18', '2'),
 ('19', '3'),
 ('20', '4'),
 ('21', '5'),
 ('22', '6'),
 ('23', '7'),
 ('24', '8'),
 ('25', '1'),
 ('26', '2'),
 ('27', '3'),
 ('28', '4'),
 ('29', '5'),
 ('30', '6');

INSERT INTO `bicycleapp`.`fault_report` (`date`, `fault_text`, `bike_id`, `user_id`)
VALUES ('2023-09-16', 'Flat tire', '1', '1');
UPDATE `bicycleapp`.`bicycle` SET `active_flag` = 0 WHERE (`id` = '1');

INSERT INTO `bicycleapp`.`fault_report` (`date`, `fault_text`, `bike_id`, `user_id`)
VALUES ('2023-09-16', 'Break issue', '1', '1');


INSERT INTO `bicycleapp`.`price` (`minute_price`, `start_date`, `unlock_price`) VALUES ('0.30', '2023-09-16', '1.50');
