-- migrate:up
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login_id` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `kor_name` varchar(50) NOT NULL,
  `eng_name` varchar(50) NOT NULL,
  `country` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_id` (`login_id`),
  UNIQUE KEY `unique_name` (`login_id`,`email`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`)
)

-- migrate:down

