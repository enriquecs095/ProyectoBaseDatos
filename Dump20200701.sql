CREATE DATABASE  IF NOT EXISTS `DB1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `DB1`;
-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: proyecto-tbd.csezn4igdg4j.us-east-2.rds.amazonaws.com    Database: DB1
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Actividades`
--

DROP TABLE IF EXISTS `Actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Actividades` (
  `ID_Actividad` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo_actividad` varchar(30) NOT NULL,
  `ID_Funcionalidad` int(11) NOT NULL,
  PRIMARY KEY (`ID_Actividad`),
  KEY `ID_Funcionalidad_idx` (`ID_Funcionalidad`),
  CONSTRAINT `ID_Funcionalidad` FOREIGN KEY (`ID_Funcionalidad`) REFERENCES `Funcionalidad` (`ID_Funcionalidad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Actividades`
--

LOCK TABLES `Actividades` WRITE;
/*!40000 ALTER TABLE `Actividades` DISABLE KEYS */;
INSERT INTO `Actividades` VALUES (13,'Interfaz ',1),(14,'Autenticacion basica',11);
/*!40000 ALTER TABLE `Actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clientes`
--

DROP TABLE IF EXISTS `Clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clientes` (
  `Codigo_Clientes` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` varchar(20) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Correo_electronico` varchar(20) NOT NULL,
  `Telefonos` varchar(20) DEFAULT NULL,
  `Es_interno` tinyint(4) NOT NULL,
  PRIMARY KEY (`Codigo_Clientes`),
  KEY `IdUsuario_idx` (`ID_Usuario`),
  CONSTRAINT `IdUsuario` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuarios` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clientes`
--

LOCK TABLES `Clientes` WRITE;
/*!40000 ALTER TABLE `Clientes` DISABLE KEYS */;
INSERT INTO `Clientes` VALUES (1,'Cliente','Juan','asdasd@asdasd.com','999-999-99',0),(2,'Cliente1','Pablo','asdasd@asdad.com','123456789',1),(3,'Cliente2','Carlos','asdasd@asdads.com','145956565656',0),(10,'mario','Mario ','marzo@gmail.com','33901292',0),(11,'Cliente10','Generico1','gen@gmail.com','12345678',0),(12,'Cliente11','Generico1','gen@gmail.com','12345678',0),(13,'pruebaC','Cliente_Generico','Generio@gmail.com','33167895',0);
/*!40000 ALTER TABLE `Clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Detalle_Actividades`
--

DROP TABLE IF EXISTS `Detalle_Actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Detalle_Actividades` (
  `ID_Detalle_Actividades` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Actividad` int(11) NOT NULL,
  `Actividades_Realizadas` varchar(45) NOT NULL,
  `Estado_Actividad` tinyint(4) NOT NULL,
  `Tiempo_Trabajado` int(11) NOT NULL,
  `ID_nempleado` int(11) NOT NULL,
  PRIMARY KEY (`ID_Detalle_Actividades`),
  KEY `IdActividad_idx` (`ID_Actividad`),
  KEY `numero_empleado_idx` (`ID_nempleado`),
  CONSTRAINT `IdActividad` FOREIGN KEY (`ID_Actividad`) REFERENCES `Actividades` (`ID_Actividad`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `numero_empleado` FOREIGN KEY (`ID_nempleado`) REFERENCES `Empleados` (`Numero_Empleado`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Detalle_Actividades`
--

LOCK TABLES `Detalle_Actividades` WRITE;
/*!40000 ALTER TABLE `Detalle_Actividades` DISABLE KEYS */;
INSERT INTO `Detalle_Actividades` VALUES (8,13,'Interfaz Basica',1,20,13),(9,14,'Metodo pasaporte para el login :v',1,2000,19);
/*!40000 ALTER TABLE `Detalle_Actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Empleados`
--

DROP TABLE IF EXISTS `Empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Empleados` (
  `Numero_Empleado` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` varchar(20) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Direccion` varchar(30) NOT NULL,
  `Numero_empleado_jefe` int(11) DEFAULT NULL,
  `Tipo_empleado` varchar(20) DEFAULT NULL,
  `ID_Equipo_Trabajo` int(11) DEFAULT NULL,
  PRIMARY KEY (`Numero_Empleado`),
  KEY `Idusuarios_idx` (`ID_Usuario`),
  KEY `Id_usuarios_idx` (`ID_Usuario`),
  KEY `EquipoTrabajo_idx` (`ID_Equipo_Trabajo`),
  CONSTRAINT `EquipoTrabajo` FOREIGN KEY (`ID_Equipo_Trabajo`) REFERENCES `Equipo_Trabajo` (`ID_Equipo_Trabajo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Id_usuarios` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuarios` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Empleados`
--

LOCK TABLES `Empleados` WRITE;
/*!40000 ALTER TABLE `Empleados` DISABLE KEYS */;
INSERT INTO `Empleados` VALUES (1,'Empleado','Pablo','Sinaloa',1,'Jefe',1),(2,'Empleado1','Enrique','Lomas',1,'Lacayo',2),(12,'enriquecs','Juan Pablo','Col. Honduras',1,'Industrial',1),(13,'Empleado10','Generico1','Col. Honduras',0,'Generico',3),(14,'Empleado11','Generico1','Col. Honduras',12,'Generico',1),(15,'Empleado12','Generico1','Col. Honduras',13,'Generico',2),(16,'Admin10','Generico1','Col. Honduras',0,'Jefe',1),(17,'Admin11','Recio','Col. Honduras',0,'Jefe',2),(18,'prueba','Flash','Col. Honduras',12,'Administrador de sis',2),(19,'pruebaE','Empleado_Generico','Col. Honduras',12,'Empleado',2);
/*!40000 ALTER TABLE `Empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Empleados_x_Proyecto`
--

DROP TABLE IF EXISTS `Empleados_x_Proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Empleados_x_Proyecto` (
  `ID_Empleados_x_Proyectos` int(11) NOT NULL AUTO_INCREMENT,
  `NumeroEmpleado_x_Proyecto` int(11) NOT NULL,
  `ID_Proyecto` int(11) NOT NULL,
  PRIMARY KEY (`ID_Empleados_x_Proyectos`),
  KEY `numeroEmpleado_idx` (`NumeroEmpleado_x_Proyecto`),
  KEY `proyecto_idx` (`ID_Proyecto`),
  CONSTRAINT `numeroEmpleado` FOREIGN KEY (`NumeroEmpleado_x_Proyecto`) REFERENCES `Empleados` (`Numero_Empleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proyecto` FOREIGN KEY (`ID_Proyecto`) REFERENCES `Proyectos` (`ID_Proyectos`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Empleados_x_Proyecto`
--

LOCK TABLES `Empleados_x_Proyecto` WRITE;
/*!40000 ALTER TABLE `Empleados_x_Proyecto` DISABLE KEYS */;
INSERT INTO `Empleados_x_Proyecto` VALUES (7,13,1),(8,13,1),(9,14,1),(10,18,16),(11,19,16);
/*!40000 ALTER TABLE `Empleados_x_Proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Empleados_x_habilidades`
--

DROP TABLE IF EXISTS `Empleados_x_habilidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Empleados_x_habilidades` (
  `Id_empleadoxhabilidad` int(11) NOT NULL AUTO_INCREMENT,
  `ID_empleado` int(11) NOT NULL,
  `ID_habilidad` int(11) NOT NULL,
  PRIMARY KEY (`Id_empleadoxhabilidad`),
  KEY `nEmpleado_idx` (`ID_empleado`),
  KEY `Habilidades_idx` (`ID_habilidad`),
  CONSTRAINT `Habilidades` FOREIGN KEY (`ID_habilidad`) REFERENCES `Habilidades_conocimiento` (`ID_Habilidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nEmpleado` FOREIGN KEY (`ID_empleado`) REFERENCES `Empleados` (`Numero_Empleado`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Empleados_x_habilidades`
--

LOCK TABLES `Empleados_x_habilidades` WRITE;
/*!40000 ALTER TABLE `Empleados_x_habilidades` DISABLE KEYS */;
INSERT INTO `Empleados_x_habilidades` VALUES (27,12,5),(28,13,3),(29,14,2),(30,16,1),(31,17,5),(32,17,1),(33,18,3),(34,18,2),(35,19,3);
/*!40000 ALTER TABLE `Empleados_x_habilidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EquipoTrabajo_x_Proyectos`
--

DROP TABLE IF EXISTS `EquipoTrabajo_x_Proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EquipoTrabajo_x_Proyectos` (
  `ID_ET_x_Poyecto` int(11) NOT NULL AUTO_INCREMENT,
  `Id_EquipoTrabajo` int(11) NOT NULL,
  `ID_ProyectoAsignado` int(11) NOT NULL,
  `Esta_completado` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID_ET_x_Poyecto`),
  KEY `EquipoTrabajo_idx` (`Id_EquipoTrabajo`),
  KEY `proyecto_idx` (`ID_ProyectoAsignado`),
  CONSTRAINT `Equipo` FOREIGN KEY (`Id_EquipoTrabajo`) REFERENCES `Equipo_Trabajo` (`ID_Equipo_Trabajo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proyectox_ET` FOREIGN KEY (`ID_ProyectoAsignado`) REFERENCES `Proyectos` (`ID_Proyectos`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EquipoTrabajo_x_Proyectos`
--

LOCK TABLES `EquipoTrabajo_x_Proyectos` WRITE;
/*!40000 ALTER TABLE `EquipoTrabajo_x_Proyectos` DISABLE KEYS */;
/*!40000 ALTER TABLE `EquipoTrabajo_x_Proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipo_Trabajo`
--

DROP TABLE IF EXISTS `Equipo_Trabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Equipo_Trabajo` (
  `ID_Equipo_Trabajo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Equipo_Trabajo` varchar(20) NOT NULL,
  `ID_Funcionalidad` int(11) NOT NULL,
  PRIMARY KEY (`ID_Equipo_Trabajo`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipo_Trabajo`
--

LOCK TABLES `Equipo_Trabajo` WRITE;
/*!40000 ALTER TABLE `Equipo_Trabajo` DISABLE KEYS */;
INSERT INTO `Equipo_Trabajo` VALUES (1,'Recios',0),(2,'Plebes',1),(3,'Mirrey',0);
/*!40000 ALTER TABLE `Equipo_Trabajo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Etiquetas`
--

DROP TABLE IF EXISTS `Etiquetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Etiquetas` (
  `ID_Etiqueta` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo_Etiqueta` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_Etiqueta`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Etiquetas`
--

LOCK TABLES `Etiquetas` WRITE;
/*!40000 ALTER TABLE `Etiquetas` DISABLE KEYS */;
INSERT INTO `Etiquetas` VALUES (1,'Not Started'),(2,'On Track'),(3,'Slipping'),(4,'Done'),(5,'On Hold'),(6,'Off Track');
/*!40000 ALTER TABLE `Etiquetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Funcionalidad`
--

DROP TABLE IF EXISTS `Funcionalidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Funcionalidad` (
  `ID_Funcionalidad` int(11) NOT NULL AUTO_INCREMENT,
  `Orden_Prioridad` varchar(1) NOT NULL,
  `Caracteristica` varchar(45) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `Completado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID_Funcionalidad`),
  KEY `cliente_funcional_id_idx` (`id_cliente`),
  KEY `proyecto_fun_id_idx` (`id_proyecto`),
  CONSTRAINT `cliente_funcional_id` FOREIGN KEY (`id_cliente`) REFERENCES `Clientes` (`Codigo_Clientes`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proyecto_fun_id` FOREIGN KEY (`id_proyecto`) REFERENCES `Proyectos` (`ID_Proyectos`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Funcionalidad`
--

LOCK TABLES `Funcionalidad` WRITE;
/*!40000 ALTER TABLE `Funcionalidad` DISABLE KEYS */;
INSERT INTO `Funcionalidad` VALUES (1,'2','GUI',1,1,'0'),(10,'1','GUI',1,10,'0'),(11,'3','Crear pantalla login',16,13,'0');
/*!40000 ALTER TABLE `Funcionalidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Habilidades_conocimiento`
--

DROP TABLE IF EXISTS `Habilidades_conocimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Habilidades_conocimiento` (
  `ID_Habilidad` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_habilidad` varchar(20) NOT NULL,
  `Nombre_tecnologia` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_Habilidad`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Habilidades_conocimiento`
--

LOCK TABLES `Habilidades_conocimiento` WRITE;
/*!40000 ALTER TABLE `Habilidades_conocimiento` DISABLE KEYS */;
INSERT INTO `Habilidades_conocimiento` VALUES (1,'Build Designer','Python'),(2,'Backend developer','Python'),(3,'Diseño Web','HTML'),(4,'Backend developer','Java'),(5,'Full-stack developer','React-JS');
/*!40000 ALTER TABLE `Habilidades_conocimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Privilegios`
--

DROP TABLE IF EXISTS `Privilegios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Privilegios` (
  `ID_Privilegio` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_P` varchar(30) NOT NULL,
  `IDRol` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Privilegio`),
  KEY `Rol_idx` (`IDRol`),
  CONSTRAINT `roles` FOREIGN KEY (`IDRol`) REFERENCES `Rol` (`ID_Rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Privilegios`
--

LOCK TABLES `Privilegios` WRITE;
/*!40000 ALTER TABLE `Privilegios` DISABLE KEYS */;
INSERT INTO `Privilegios` VALUES (1,'Brindar Acceso',1),(2,'Gestionar Solicitudes',1),(3,'Agregar actividad',2),(4,'Solicitar Proyecto',3),(5,'Solicitudes Realizadas',3),(6,'Proyectos Asignados',2),(7,'Agregar Proyecto',1),(8,'Empleados a Proyectos',1),(9,'Agregar Funcionalidad',3),(10,'Solicitar Actividad',2),(11,'Funcionalidades',2),(14,'Agregar actividad',1);
/*!40000 ALTER TABLE `Privilegios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Proyectos`
--

DROP TABLE IF EXISTS `Proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Proyectos` (
  `ID_Proyectos` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) NOT NULL,
  `Conjunto_Tecnologia` varchar(20) NOT NULL,
  `Presupuesto` double NOT NULL,
  `Esta_asignado` tinyint(4) NOT NULL,
  `Pseudo_Nombre` varchar(20) NOT NULL,
  `URL_Proy_Github` varchar(45) DEFAULT NULL,
  `URL_Proy_Trello` varchar(45) DEFAULT NULL,
  `ID_Etiqueta` int(11) NOT NULL,
  `ID_Equipo_Trabajo` int(11) DEFAULT NULL,
  `ID_jefe_Encargado` int(11) DEFAULT NULL,
  `Fecha_Inicio` date NOT NULL,
  `Fecha_Entrega` date DEFAULT NULL,
  `Id_solicitud` int(11) NOT NULL,
  PRIMARY KEY (`ID_Proyectos`),
  KEY `Et_x_proyecto_idx` (`ID_Equipo_Trabajo`),
  KEY `Etiqueta_x_Proyecto_idx` (`ID_Etiqueta`),
  KEY `empleado_x_proyecto_idx` (`ID_jefe_Encargado`),
  KEY `solicitud_proyecto_idx` (`Id_solicitud`),
  CONSTRAINT `Et_x_proyecto` FOREIGN KEY (`ID_Equipo_Trabajo`) REFERENCES `Equipo_Trabajo` (`ID_Equipo_Trabajo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Etiqueta_x_Proyecto` FOREIGN KEY (`ID_Etiqueta`) REFERENCES `Etiquetas` (`ID_Etiqueta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Nempleado_x_proyecto` FOREIGN KEY (`ID_jefe_Encargado`) REFERENCES `Empleados` (`Numero_Empleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `solicitud_proyecto_id` FOREIGN KEY (`Id_solicitud`) REFERENCES `Solicitud_Proyecto` (`ID_Solicitud`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proyectos`
--

LOCK TABLES `Proyectos` WRITE;
/*!40000 ALTER TABLE `Proyectos` DISABLE KEYS */;
INSERT INTO `Proyectos` VALUES (1,'Bow','Angular',10000000,1,'Bow','github.com','trello.com',1,1,1,'0000-00-00','0000-00-00',1),(16,'Super Copia Maker 3','Python',9999999999,1,'copiamaker','https://docs.github.com/en/github/managing-fi','https://trello.com/copiabarata',1,2,12,'2020-07-02','2034-07-06',20);
/*!40000 ALTER TABLE `Proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Puesto_Empleado`
--

DROP TABLE IF EXISTS `Puesto_Empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Puesto_Empleado` (
  `ID_Puesto` int(11) NOT NULL AUTO_INCREMENT,
  `Numero_Empleado` int(11) NOT NULL,
  `Nombre_Puesto` varchar(20) NOT NULL,
  `Fecha_Inicio` date NOT NULL,
  `Fecha_Finalizacion` date DEFAULT NULL,
  PRIMARY KEY (`ID_Puesto`),
  KEY `empleado_x_puesto_idx` (`Numero_Empleado`),
  CONSTRAINT `empleado_x_puesto` FOREIGN KEY (`Numero_Empleado`) REFERENCES `Empleados` (`Numero_Empleado`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Puesto_Empleado`
--

LOCK TABLES `Puesto_Empleado` WRITE;
/*!40000 ALTER TABLE `Puesto_Empleado` DISABLE KEYS */;
INSERT INTO `Puesto_Empleado` VALUES (7,12,'Jefe de Proyecto','2020-07-01',NULL),(8,13,'Desarrollador','2020-07-01',NULL),(9,14,'Líder de Calidad','2020-07-01',NULL),(10,15,'Documentador Técnico','2020-07-01',NULL),(11,16,'Lider de Equipo','2020-07-01',NULL),(12,17,'Lider de Equipo','2020-07-01',NULL),(13,18,'Desarrollador','2020-07-01',NULL),(14,19,'Jefe de Proyecto','2020-07-01',NULL);
/*!40000 ALTER TABLE `Puesto_Empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rol`
--

DROP TABLE IF EXISTS `Rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rol` (
  `ID_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo_Rol` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rol`
--

LOCK TABLES `Rol` WRITE;
/*!40000 ALTER TABLE `Rol` DISABLE KEYS */;
INSERT INTO `Rol` VALUES (1,'Administrador'),(2,'Empleado'),(3,'Cliente');
/*!40000 ALTER TABLE `Rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Solicitud_Actividad`
--

DROP TABLE IF EXISTS `Solicitud_Actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Solicitud_Actividad` (
  `ID_Solicitud` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo_Actividad` varchar(30) NOT NULL,
  `ID_Funcionalidad` int(11) NOT NULL,
  `Fecha_Solicitud` date NOT NULL,
  `Aprobado` int(11) NOT NULL,
  PRIMARY KEY (`ID_Solicitud`),
  KEY `sa_funcionalidad_idx` (`ID_Funcionalidad`),
  CONSTRAINT `sa_funcionalidad` FOREIGN KEY (`ID_Funcionalidad`) REFERENCES `Funcionalidad` (`ID_Funcionalidad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Solicitud_Actividad`
--

LOCK TABLES `Solicitud_Actividad` WRITE;
/*!40000 ALTER TABLE `Solicitud_Actividad` DISABLE KEYS */;
INSERT INTO `Solicitud_Actividad` VALUES (3,'Interfaz ',1,'2020-07-01',1),(4,'Autenticacion basica',11,'2020-07-01',1);
/*!40000 ALTER TABLE `Solicitud_Actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Solicitud_Proyecto`
--

DROP TABLE IF EXISTS `Solicitud_Proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Solicitud_Proyecto` (
  `ID_Solicitud` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Proyecto` varchar(20) NOT NULL,
  `Descripcion_Proyecto` varchar(40) NOT NULL,
  `ID_cliente_solicita` int(11) DEFAULT NULL,
  `Estado_Solicitud` int(11) NOT NULL,
  `Fecha_Solicitud` date NOT NULL,
  PRIMARY KEY (`ID_Solicitud`),
  KEY `cliente_x_solicitud_idx` (`ID_cliente_solicita`),
  CONSTRAINT `cliente_x_solicitud` FOREIGN KEY (`ID_cliente_solicita`) REFERENCES `Clientes` (`Codigo_Clientes`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Solicitud_Proyecto`
--

LOCK TABLES `Solicitud_Proyecto` WRITE;
/*!40000 ALTER TABLE `Solicitud_Proyecto` DISABLE KEYS */;
INSERT INTO `Solicitud_Proyecto` VALUES (1,'Bowsetter','Juego Copia Mario',10,1,'2020-06-07'),(2,'Pokimon','Copia de Pokemon',11,0,'0000-00-00'),(3,'Pobremon','Pokemon version pobre',12,1,'0000-00-00'),(20,'Super Copia Maker 3','Proyecto Desarollado para videojuegos',13,1,'2020-07-01');
/*!40000 ALTER TABLE `Solicitud_Proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `ID_Usuario` varchar(20) NOT NULL,
  `Contrasena` varchar(70) NOT NULL,
  `ID_Rol` int(11) NOT NULL,
  `Privilegios` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Usuario`),
  KEY `Rol_usuarios_idx` (`ID_Rol`),
  CONSTRAINT `Rol_usuarios` FOREIGN KEY (`ID_Rol`) REFERENCES `Rol` (`ID_Rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES ('Admin10','$2a$10$6xcY8xtBi0NTfTEA9NfvnOLMNvLGaYpAsSgXJCF8xBkxvlVDvplqe',1,1),('Admin11','$2a$10$tSAKHxDiaeM1ltPPzyvfr.uFuNivGrI3xSMWkhO8iBFyT9I6g79UK',1,1),('Cliente','Cliente',3,0),('Cliente1','Cliente',2,0),('Cliente10','$2a$10$cytC1.yCvwyExxs8zAItPuWvMCArKdAdc9gmBwc3eSTzM4MkKptoe',3,1),('Cliente11','$2a$10$bfyBOXKI7ewNhIW.LO/Wzeq3qRL0z1ZfvklHzMt8ghwKtMdJs5bi2',3,1),('Cliente2','Cliente',1,0),('Empleado','Empleado',2,0),('Empleado1','Empleado',1,0),('Empleado10','$2a$10$zI.WLmLwLxV31d66ipuBs.Aq/7OyyGMz5xKG/rDIWcycMyDCXAH..',2,1),('Empleado11','$2a$10$aJxnPoAdtW4Q279MhsnPSOMjdjNZIH/Hx05ZPnLDbCj1Oy7Gf15Ey',2,1),('Empleado12','$2a$10$mUfNg89C/TZVu9v/3GiBzO8ft3LvQypRx9QvpHCcXU/dil7Vy7FoS',2,1),('enriquecs','$2a$10$G52UFrdc8rjQ9VQKMAqfveIEziZJd1PkdvQnIKDripKWWvP0WtRry',1,1),('mario','$2a$10$alj0K4CuPEX7vQYAE2w/0epPaXo3ge8xt0EmPR2eFd1Ha.Nu7YkE.',3,1),('prueba','$2a$10$KOelu5Bt2pzJ08EsRvy1m.npqS5c9Bwt0gG875zHRXRQtkflBKtri',1,1),('pruebaC','$2a$10$2z3NvK9B6vub1MunNyuXXekxtMtQTto8lqgFgSUyb4D8rAW2epKgG',3,1),('pruebaE','$2a$10$bb28uO/bIYxAghYWI9WX6euh6kFLh5ff3uh9nrckTGZW8qfA/ev4G',2,1);
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('Lejr4c7PE6DqeRmwaKOfn5vYw1yY1UWf',1593731191,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\"]},\"passport\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'DB1'
--

--
-- Dumping routines for database 'DB1'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-01 22:51:30
