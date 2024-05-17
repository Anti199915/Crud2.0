-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2024 a las 21:43:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ingredientespastel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredientes`
--

CREATE TABLE `ingredientes` (
  `id_ingredientes` int(11) NOT NULL,
  `ingrediente` varchar(100) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ingredientes`
--

INSERT INTO `ingredientes` (`id_ingredientes`, `ingrediente`, `descripcion`, `fecha_ingreso`, `fecha_vencimiento`, `stock`) VALUES
(18, 'Arroz', 'Arroz blanco', '2024-05-16', '2028-09-05', 10),
(20, 'Harina', 'Harina blanca 6 libras', '2024-05-17', '2024-05-18', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasteles`
--

CREATE TABLE `pasteles` (
  `id_pastel` int(11) NOT NULL,
  `nombre_pastel` varchar(100) NOT NULL,
  `preparado` varchar(100) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_de_vencimiento` date NOT NULL,
  `stock_pastel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pasteles`
--

INSERT INTO `pasteles` (`id_pastel`, `nombre_pastel`, `preparado`, `fecha_creacion`, `fecha_de_vencimiento`, `stock_pastel`) VALUES
(7, 'Fresas con crema', 'Sergio', '2024-05-16', '2024-05-18', 1),
(8, 'Fresas con chocolate', 'Miguel Martinez', '2024-05-17', '2024-05-17', 4),
(9, 'Chocolate', 'David', '2024-05-17', '2024-05-25', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasteles_ingredientes`
--

CREATE TABLE `pasteles_ingredientes` (
  `id_pastel` int(11) NOT NULL,
  `id_ingredientes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`id_ingredientes`);

--
-- Indices de la tabla `pasteles`
--
ALTER TABLE `pasteles`
  ADD PRIMARY KEY (`id_pastel`);

--
-- Indices de la tabla `pasteles_ingredientes`
--
ALTER TABLE `pasteles_ingredientes`
  ADD PRIMARY KEY (`id_pastel`,`id_ingredientes`),
  ADD KEY `id_ingredientes` (`id_ingredientes`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `id_ingredientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `pasteles`
--
ALTER TABLE `pasteles`
  MODIFY `id_pastel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pasteles_ingredientes`
--
ALTER TABLE `pasteles_ingredientes`
  ADD CONSTRAINT `pasteles_ingredientes_ibfk_1` FOREIGN KEY (`id_pastel`) REFERENCES `pasteles` (`id_pastel`) ON DELETE CASCADE,
  ADD CONSTRAINT `pasteles_ingredientes_ibfk_2` FOREIGN KEY (`id_ingredientes`) REFERENCES `ingredientes` (`id_ingredientes`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
