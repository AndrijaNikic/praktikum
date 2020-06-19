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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

DELETE FROM `administrator_token`;
/*!40000 ALTER TABLE `administrator_token` DISABLE KEYS */;
INSERT INTO `administrator_token` (`administrator_token_id`, `administrator_id`, `created_at`, `token`, `expires_at`, `is_valid`) VALUES
	(1, 3, '2020-06-19 02:00:11', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoibm92aSIsImV4cCI6MTU5NTIwMzIxMS42OTksImlwIjoiOjoxIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTI1MjQ4MTF9.qUmAlkvT0krk7tQ0zn_jC7YUhe3SxPfE64iYfbGWCyc', '2020-07-20 00:00:11', 1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

DELETE FROM `article`;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`article_id`, `name`, `category_id`, `description`, `image_path`, `ingredients`, `price`) VALUES
	(1, 'Oreo torta', 1, 'Opis oreo torte', 'assets/img/oreocake1.jpg', 'Sastojci', 500),
	(2, 'Cokoladni mafin', 3, 'Opis cokoladnog mafina', 'assets/img/chocmuffin', 'Sastojci', 50),
	(3, 'Vocni mafin', 3, 'Opis vocnog mafina', 'assets/img/vocnimuffin', 'Sastojci', 50);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `note` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

DELETE FROM `cart`;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` (`cart_id`, `created_at`, `note`) VALUES
	(1, '2020-05-19 12:20:32', NULL),
	(2, '2020-05-19 12:33:18', NULL),
	(3, '2020-05-26 13:38:09', NULL),
	(4, '2020-05-26 13:39:48', NULL),
	(5, '2020-05-26 13:40:05', NULL),
	(6, '2020-05-26 13:40:27', NULL),
	(7, '2020-05-26 13:42:12', NULL),
	(8, '2020-05-26 13:42:45', NULL),
	(9, '2020-05-26 13:44:38', NULL),
	(10, '2020-05-26 13:48:47', NULL),
	(11, '2020-05-26 13:49:44', NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `cart_article` (
  `cart_article_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) unsigned NOT NULL DEFAULT '0',
  `article_id` int(11) unsigned NOT NULL DEFAULT '0',
  `quantity` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`cart_article_id`),
  UNIQUE KEY `uq_cart_article_cart_id_article_id` (`cart_id`,`article_id`),
  KEY `fk_cart_article_article_id` (`article_id`),
  CONSTRAINT `fk_cart_article_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_article_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

DELETE FROM `cart_article`;
/*!40000 ALTER TABLE `cart_article` DISABLE KEYS */;
INSERT INTO `cart_article` (`cart_article_id`, `cart_id`, `article_id`, `quantity`) VALUES
	(1, 1, 1, 5),
	(2, 11, 2, 2);
/*!40000 ALTER TABLE `cart_article` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`),
  UNIQUE KEY `uq_category_image_path` (`image_path`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`, `image_path`) VALUES
	(1, 'Torte', 'assets/img/cake1.jpg'),
	(2, 'Rolnice', 'assets/img/roll1.jpg'),
	(3, 'Mafini', 'assets/img/muffin1.jpg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cart_id` int(11) unsigned NOT NULL,
  `status` enum('rejected','accepted','shipped','pending') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  CONSTRAINT `fk_order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

DELETE FROM `order`;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`order_id`, `created_at`, `cart_id`, `status`) VALUES
	(1, '2020-05-19 12:32:52', 1, 'shipped'),
	(2, '2020-06-18 14:44:09', 2, 'shipped'),
	(3, '2020-05-26 13:38:09', 3, 'pending'),
	(4, '2020-05-26 13:39:48', 4, 'pending'),
	(5, '2020-05-26 13:40:05', 5, 'pending'),
	(6, '2020-05-26 13:40:27', 6, 'pending'),
	(7, '2020-05-26 13:42:12', 7, 'pending'),
	(8, '2020-05-26 13:42:45', 8, 'pending'),
	(9, '2020-05-26 13:44:38', 9, 'pending'),
	(10, '2020-05-26 13:48:47', 10, 'pending'),
	(11, '2020-05-26 13:50:57', 11, 'pending');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(11) unsigned NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_image_path` (`image_path`),
  KEY `fk_photo_article_id` (`article_id`),
  CONSTRAINT `fk_photo_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

DELETE FROM `photo`;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` (`photo_id`, `article_id`, `image_path`) VALUES
	(2, 2, '2020429-3551588253-chocolatemuffin.jpg'),
	(3, 2, '202054-9841330923-chocolatecake.jpg'),
	(4, 2, '202054-9152162667-chocolateroll.jpg'),
	(5, 2, '202054-8775486366-chocolateroll2.jpg');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
