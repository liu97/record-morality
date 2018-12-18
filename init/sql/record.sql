/*
Navicat MySQL Data Transfer

Source Server         : project
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : record

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-12-17 21:10:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for birthday
-- ----------------------------
DROP TABLE IF EXISTS `birthday`;
CREATE TABLE `birthday` (
  `birthday_id` int(12) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `point_path` varchar(255) DEFAULT NULL,
  `upload_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_id` int(12) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`birthday_id`),
  UNIQUE KEY `birthday_id` (`birthday_id`) USING BTREE,
  KEY `user_id` (`user_id`),
  CONSTRAINT `birthday_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for folder
-- ----------------------------
DROP TABLE IF EXISTS `folder`;
CREATE TABLE `folder` (
  `folder_id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `upload_time` datetime DEFAULT NULL,
  `parent_id` int(12) DEFAULT NULL,
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`folder_id`),
  UNIQUE KEY `folder_id` (`folder_id`) USING BTREE,
  KEY `user_id` (`user_id`),
  CONSTRAINT `folder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `note_id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `note_path` varchar(255) DEFAULT NULL,
  `upload_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `note_type` varchar(255) DEFAULT NULL,
  `user_id` int(12) DEFAULT NULL,
  `folder_id` int(12) DEFAULT NULL,
  PRIMARY KEY (`note_id`),
  UNIQUE KEY `note_id` (`note_id`) USING BTREE,
  KEY `user_id` (`user_id`),
  KEY `folder_id` (`folder_id`),
  CONSTRAINT `note_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `note_ibfk_2` FOREIGN KEY (`folder_id`) REFERENCES `folder` (`folder_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(12) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `register_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
