/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `praktikum` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `praktikum`;

CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(1, 'Nikic', '123123123123123123'),
	(2, 'Marko', '7DD29A9C9643FD524E1B4360964B89CE59914E68D1FD1AB04DD61FBAAABC58E579DCFFB5B7454AB01E586C8AE98E538B5D6E0FF3AE7DD442DE7333486DC9DF1A'),
	(3, 'novi', '260FDFA9DD036152068CCEA792FEB6A8CF1982F5B0573B9282A5C82C91F2D9BE355A0E2160E149E96EC773122A0385E6662E07F632A1B7F7BE1220F8BF27A60E');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `administrator_token` (
  `administrator_token_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `administrator_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valid` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`administrator_token_id`),
  KEY `fk_administrator_token_administrator_id` (`administrator_id`),
  CONSTRAINT `fk_administrator_token_administrator_id` FOREIGN KEY (`administrator_id`) REFERENCES `administrator` (`administrator_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

DELETE FROM `administrator_token`;
/*!40000 ALTER TABLE `administrator_token` DISABLE KEYS */;
INSERT INTO `administrator_token` (`administrator_token_id`, `administrator_id`, `created_at`, `token`, `expires_at`, `is_valid`) VALUES
	(1, 3, '2020-06-19 02:00:11', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTIwMzIxMS42OTksImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTI1MjQ4MTF9.qUmAlkvT0krk7tQ0zn_jC7YUhe3SxPfE64iYfbGWCyc', '2020-07-20 00:00:11', 1),
	(2, 3, '2020-06-19 13:19:51', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTI0Mzk5MS44NzQsImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTI1NjU1OTF9.aJHrgw_Q3YQUP16IIBoIzLQG7VR92N5mnKT3ehM8krs', '2020-07-20 11:19:51', 1),
	(3, 3, '2020-06-19 13:21:41', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTI0NDEwMS4xMDMsImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTI1NjU3MDF9.d_h94-FSwPuvPKkCpNn9V16tkPUJCC0iNtP7juXo3aM', '2020-07-20 11:21:41', 1),
	(4, 3, '2020-06-20 22:34:15', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTM2MzY1NS41MzYsImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTI2ODUyNTV9.6rrs1ertWzyJBvWk-o3WsBRo3qWcRzW3Tdd9hMZXmX8', '2020-07-21 20:34:15', 1),
	(5, 3, '2020-06-22 23:03:24', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTUzODIwNC4yNDYsImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCA2LjE7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS84My4wLjQxMDMuMTA2IFNhZmFyaS81MzcuMzYiLCJpYXQiOjE1OTI4NTk4MDR9.Ly_uhmmtthuat60nIR0HkgFfebAoyaPEsxcLbevt07Y', '2020-07-23 21:03:24', 1),
	(6, 3, '2020-06-24 00:53:09', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTYzMTE4OS43MzMsImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTI5NTI3ODl9.uLzDa7qBXYRu83YICemRb4pXeU92LasQEWlGzNRHccM', '2020-07-24 22:53:09', 1),
	(7, 3, '2020-06-24 19:17:11', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTY5NzQzMS45NjEsImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI2LjEiLCJpYXQiOjE1OTMwMTkwMzF9.uF8bfyW1OXFYNQ75o4Xjm-byxNYtV_Xnzd1m6RQWnA8', '2020-07-25 17:17:11', 1),
	(8, 3, '2020-06-24 21:00:54', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTcwMzY1NC42NjMsImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI2LjEiLCJpYXQiOjE1OTMwMjUyNTR9.6vbLcMB-z4NU9NJjuwXkhBbMvth9XlTNXWkRF5alAA8', '2020-07-25 19:00:54', 1),
	(9, 3, '2020-06-24 21:06:57', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTcwNDAxNy4wMDEsImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI2LjEiLCJpYXQiOjE1OTMwMjU2MTd9.N2W7YV_HohpT0Gfh-nErBKdFkY-ektuZNy8uriIniVY', '2020-07-25 19:06:57', 1),
	(10, 3, '2020-06-24 21:12:49', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTcwNDM2OS45ODMsImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI2LjEiLCJpYXQiOjE1OTMwMjU5Njl9.KCRvURQ3pLoYUZVIVvhsB2I8LyL6S6SaEtrsVovdf9c', '2020-07-25 19:12:49', 1),
	(11, 3, '2020-06-25 11:39:58', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTc1NjM5OC4xOTksImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCA2LjE7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS84My4wLjQxMDMuMTE2IFNhZmFyaS81MzcuMzYiLCJpYXQiOjE1OTMwNzc5OTh9.LCssZYX7W02laM1opBhR6Mv0c9Q8a26bshF0OpeIwOE', '2020-07-26 09:39:58', 1),
	(12, 3, '2020-06-25 13:55:06', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTc2NDUwNi4wOTQsImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI2LjEiLCJpYXQiOjE1OTMwODYxMDZ9.MnyBfC1cJwdI6Iixt8dPahjND3Ne4xodNaFRnxB4C3w', '2020-07-26 11:55:06', 1),
	(13, 3, '2020-06-25 18:50:27', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTc4MjIyNy4yMjgsImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCA2LjE7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS84My4wLjQxMDMuMTE2IFNhZmFyaS81MzcuMzYiLCJpYXQiOjE1OTMxMDM4Mjd9.vuVYqlHNOtXTV28gPBXLRDEnAXBS-K4JMBoU9wKGqrI', '2020-07-26 16:50:27', 1),
	(14, 3, '2020-06-25 18:59:12', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTc4Mjc1Mi43MTUsImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCA2LjE7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS84My4wLjQxMDMuMTE2IFNhZmFyaS81MzcuMzYiLCJpYXQiOjE1OTMxMDQzNTJ9.K9LvojxRV6BSz_lS9-vF7f6213k1HHh3IxMqUbAmbhY', '2020-07-26 16:59:12', 1);
/*!40000 ALTER TABLE `administrator_token` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `article` (
  `article_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL DEFAULT '0',
  `category_id` int(11) unsigned NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  `ingredients` varchar(128) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL,
  PRIMARY KEY (`article_id`),
  UNIQUE KEY `uq_article_image_path` (`image_path`),
  KEY `fk_article_category_id` (`category_id`),
  CONSTRAINT `fk_article_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

DELETE FROM `article`;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`article_id`, `name`, `category_id`, `description`, `image_path`, `ingredients`, `price`) VALUES
	(1, 'Oreo torta', 1, 'Opis oreo torte', 'assets/img/oreocake1.jpg', 'Sastojci', 500),
	(2, 'Cokoladni mafin', 3, 'Opis cokoladnog mafina', 'assets/img/chocmuffin', 'Sastojci', 50),
	(3, 'Vocni mafin', 3, 'Opis vocnog mafina', 'assets/img/vocnimuffin', 'Sastojci', 40),
	(4, 'Cokoladne bombonice', 4, 'Opis cokoladnih bombonica', 'assets/img/bombonice.jpg', 'Sastojci', 5),
	(5, 'Cokoladne rolnice', 2, 'Opis cokoladnih rolnica', 'assets/img/rolnice.jpg', 'Sastojci', 100);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `note` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

DELETE FROM `cart`;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` (`cart_id`, `created_at`, `note`) VALUES
	(17, '2020-06-24 14:28:16', NULL),
	(33, '2020-06-24 15:53:18', NULL),
	(34, '2020-06-24 15:53:22', NULL),
	(35, '2020-06-24 15:53:23', NULL),
	(36, '2020-06-24 16:21:44', NULL),
	(37, '2020-06-24 16:21:47', NULL),
	(38, '2020-06-24 19:16:18', NULL),
	(39, '2020-06-24 19:19:55', NULL),
	(40, '2020-06-25 00:27:20', NULL),
	(41, '2020-06-25 00:28:06', NULL),
	(42, '2020-06-25 01:15:12', NULL),
	(43, '2020-06-25 01:15:12', NULL),
	(44, '2020-06-25 01:15:23', NULL),
	(45, '2020-06-25 01:15:23', NULL),
	(46, '2020-06-25 01:22:30', NULL),
	(47, '2020-06-25 01:22:31', NULL),
	(48, '2020-06-25 01:22:33', NULL),
	(49, '2020-06-25 01:23:08', NULL),
	(50, '2020-06-25 01:23:10', NULL),
	(51, '2020-06-25 01:23:58', NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `cart_article` (
  `cart_article_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) unsigned NOT NULL,
  `article_id` int(11) unsigned NOT NULL DEFAULT '0',
  `quantity` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`cart_article_id`),
  UNIQUE KEY `uq_cart_article_cart_id_article_id` (`cart_id`,`article_id`),
  KEY `fk_cart_article_article_id` (`article_id`),
  CONSTRAINT `fk_cart_article_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_article_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

DELETE FROM `cart_article`;
/*!40000 ALTER TABLE `cart_article` DISABLE KEYS */;
INSERT INTO `cart_article` (`cart_article_id`, `cart_id`, `article_id`, `quantity`) VALUES
	(13, 17, 3, 10),
	(14, 33, 3, 2),
	(15, 38, 1, 1),
	(16, 39, 3, 2),
	(18, 39, 5, 2),
	(19, 39, 4, 1),
	(21, 41, 5, 3),
	(22, 41, 1, 1),
	(23, 42, 5, 1),
	(24, 44, 5, 1),
	(25, 45, 2, 1),
	(26, 51, 2, 1);
/*!40000 ALTER TABLE `cart_article` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  `description` varchar(128) NOT NULL,
  `measurement` enum('unit','gram') NOT NULL DEFAULT 'unit',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`),
  UNIQUE KEY `uq_category_image_path` (`image_path`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`, `image_path`, `description`, `measurement`) VALUES
	(1, 'Torte', 'assets/img/cake1.jpg', 'Ovo je kratak opis torti.', 'unit'),
	(2, 'Rolnice', 'assets/img/roll1.jpg', 'Ovo je kratak opis rolnica.', 'unit'),
	(3, 'Mafini', 'assets/img/muffin1.jpg', 'Ovo je kratak opis mafina.', 'unit'),
	(4, 'Bombonice', 'assets/img/bombonice.jpg', 'Ovo je kratak opis bombica.', 'gram');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `category_photo` (
  `category_photo_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) unsigned NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`category_photo_id`),
  UNIQUE KEY `uq_category_photo_image_path` (`image_path`),
  UNIQUE KEY `uq_category_photo_category_id` (`category_id`),
  CONSTRAINT `fk_category_photo_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

DELETE FROM `category_photo`;
/*!40000 ALTER TABLE `category_photo` DISABLE KEYS */;
INSERT INTO `category_photo` (`category_photo_id`, `category_id`, `image_path`) VALUES
	(2, 4, '2020620-1018864135-bombonice.jpg'),
	(3, 1, '2020625-3387325298-chocolatecake.jpg'),
	(4, 2, '2020625-8718103465-chocolateroll2.jpg'),
	(5, 3, '2020625-3828637454-chocolatemuffin.jpg');
/*!40000 ALTER TABLE `category_photo` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cart_id` int(11) unsigned NOT NULL,
  `status` enum('rejected','accepted','shipped','pending') NOT NULL DEFAULT 'pending',
  `buyer_email` varchar(128) NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  CONSTRAINT `fk_order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

DELETE FROM `order`;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`order_id`, `created_at`, `cart_id`, `status`, `buyer_email`) VALUES
	(1, '2020-06-24 16:21:21', 17, 'pending', ''),
	(12, '2020-06-24 19:17:25', 33, 'shipped', ''),
	(13, '2020-06-24 19:19:17', 38, 'pending', ''),
	(14, '2020-06-25 00:27:10', 39, 'pending', ''),
	(15, '2020-06-25 01:14:58', 41, 'pending', '');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(11) unsigned NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_image_path` (`image_path`),
  UNIQUE KEY `uq_photo_article_id` (`article_id`),
  CONSTRAINT `fk_photo_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

DELETE FROM `photo`;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` (`photo_id`, `article_id`, `image_path`) VALUES
	(5, 2, '2020620-7988885828-chocolateroll2.jpg'),
	(6, 3, '2020625-2838167335-fruitmuffin.jpg'),
	(7, 4, '2020625-3252521162-bombonice.jpg'),
	(8, 5, '2020625-1689204154-chocolateroll.jpg'),
	(9, 1, '2020625-8093198525-chocolatecake.jpg');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
