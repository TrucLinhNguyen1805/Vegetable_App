-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 07:51 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doan_reactcn2`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `image`) VALUES
(1, 'Pizza', 'img_categories/pizza.png'),
(2, 'Burger', 'img_categories/burger.png'),
(3, 'Sushi', 'img_categories/sushi.png'),
(4, 'Salad', 'img_categories/salad.png'),
(5, 'Donut ', 'img_categories/pizza.png'),
(6, 'Cake', 'img_categories/burger.png'),
(7, 'Chili', 'img_categories/sushi.png'),
(8, 'Salad', 'img_categories/salad.png');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` int(11) NOT NULL,
  `name` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ingredients` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name`, `price`, `image`, `ingredients`) VALUES
(1, 'Meat Pizza', 8.3, 'img_foods/meatPizza.png', 'Mixed Pizza'),
(2, 'Cheese Pizza', 7.1, 'img_foods/cheesePizza.png', 'Cheese Pizza'),
(3, 'Chicken Burger', 5.1, 'img_foods/chickenBurger.png', 'Fried Chicken'),
(4, 'Sushi Makizushi', 9.55, 'img_foods/sushiMakizushi.png', 'Salmon Meat');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mail`, `password`) VALUES
(1, 'Trong', 'Td@gmail.com', '$2b$10$OHtEGI/Hr21BwMXDKsf4KeLsgfsTT/wyM7j0dSKFlpvz7wijyiYL.'),
(2, 'Dong', 'Dong@gmail.com', '$2b$10$x66QwhSzzDZkFa548gHCtel2GYLpGlDGBjBMzp.gDvpbRTha0Sjea'),
(3, 'Td', '123@gmail.com', '$2b$10$RnonLg2GA4VvNtecnOgoHOWWpAYyhtobDV9J4GL7Dkj4TV3L/5OpS'),
(4, 'Linh', 'Linh@gmail.com', '$2b$10$m/hdp8U/QPTY0L/MrIt63uiPU4F3xsWLHSVk1GCxMonmDm8ClN2ie'),
(5, 'Hiện', 'Hien@gmail.com', '$2b$10$1Qp1SJD4Pq13AzfL.ijXleLQDsftZqtg/RGWJv5y83BZbtSKS6KD2'),
(6, 'Mình', 'Minh@gmail.com', '$2b$10$rmZbujsMoj6iugZyG0/DCutRgHdDalQsE1oYq5DJw5AzS2xrYxUvG'),
(7, 'Han', 'Han@gmail.com', '$2b$10$m6TMpo7GS7NConrZMCY6WOJBcF.lVGk7JjXUnnYzUWCVejCCBEOJK'),
(8, 'Dong', 'Da@gmail.com', '$2b$10$D2sMyTupZMkshRWL.12SjObVBLXjaPY9/73r84A3vHXI4Ai5aXGYy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
