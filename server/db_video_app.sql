-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 04, 2023 lúc 07:07 AM
-- Phiên bản máy phục vụ: 8.1.0
-- Phiên bản PHP: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `db_video_app`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `image` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
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
-- Cấu trúc bảng cho bảng `food`
--

CREATE TABLE `food` (
  `id` int NOT NULL,
  `name` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ingredients` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `food`
--

INSERT INTO `food` (`id`, `name`, `price`, `image`, `ingredients`) VALUES
(1, 'Meat Pizza', 8.3, 'img_foods/meatPizza.png', 'Mixed Pizza'),
(2, 'Cheese Pizza', 7.1, 'img_foods/cheesePizza.png', 'Cheese Pizza'),
(3, 'Chicken Burger', 5.1, 'img_foods/chickenBurger.png', 'Fried Chicken'),
(4, 'Sushi Makizushi', 9.55, 'img_foods/sushiMakizushi.png', 'Salmon Meat');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `mail` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
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
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `food`
--
ALTER TABLE `food`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
