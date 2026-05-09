-- Progettazione Web 
DROP DATABASE if exists meschini_635172; 
CREATE DATABASE meschini_635172; 
USE meschini_635172; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: meschini_635172
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `punti`
--

DROP TABLE IF EXISTS `punti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `punti` (
  `username` varchar(50) NOT NULL,
  `punti` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punti`
--

LOCK TABLES `punti` WRITE;
/*!40000 ALTER TABLE `punti` DISABLE KEYS */;
INSERT INTO `punti` VALUES ('1.2.3.4.5',6200),('alessandro',2110),('Amedeo',3300),('feliX_32',210),('filippo9',8050),('furiAAAA',20),('iron_MAN_2',440),('Luisa1',880),('nIcCoLo',3980),('Robby9',4520),('TomTomTomTom',7030),('user2847156',10250),('Utente',4000),('winnie',620),('_Stefano_',590),('_____i_____',5170);
/*!40000 ALTER TABLE `punti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utenti` (
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `domanda` varchar(100) NOT NULL,
  `risposta` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES ('1.2.3.4.5','12345@12345.com','$2y$10$OzrgS3GaWy4nTtJZYdNLteXlLL2B9NuQ9HPzY9reVn56EM4l571WC','3','Up'),('alessandro','alessandro@yahoo.com','$2y$10$z9IONEndI9HfF36pM91iZuB/hhm1bJ9J/bopqayUy78wTZYHG9WcW','3','Interstellar'),('Amedeo','a.meschini@studenti.unipi.it','$2y$10$y7MuS0Ty5El9m8uojQoFpeZPk9BDuUVKOuAQ/RO1aTr67gFpmwqsa','1','Birba'),('feliX_32','felix.X@gmail.com','$2y$10$Qk976Vf4hHZVFSsQhgEZRu.MMmFCUipAr6a7Vu6uHcChgqhq3XqJK','2','Felix'),('filippo9','filippo.9@yahoo.com','$2y$10$7dczU6D/PSyyZpoxJSkI6eqI5KXdQAFcjxOAGu1oHpXyvl52.ZsBm','1','Otto'),('furiAAAA','furia@alice.it','$2y$10$tp9Am7hkvwAifbVfv7bGqesyF9P1.RJSWPT51Mq9skkyZaMnBe4XO','2','cavallo'),('iron_MAN_2','ironman@alice.it','$2y$10$uhimwOgErHpsbCztczSBse3jaGz7pazQI/Gs2qh15uCCwUWYKHBGC','2','IronMan'),('Luisa1','luisa@studenti.uniba.it','$2y$10$gdRraIDoGNXu0QzbA.9aoOzUoNHUk5uaqXBSi2N4MIeLN9ifPuRru','1','Stellina'),('Martina03','martina@alice.it','$2y$10$qWFYx4JKybErI8v6f6Wjn.dSD.aSwNGwvcfbHSOnCpzvMGaKot7hq','2','Principessa'),('nIcCoLo','niccolo@gmail.com','$2y$10$EHe2P.cOU8HRE3qv2tVd3OP4qzJWlQup2D65rouYO5WKyPgeVZrOO','2','Nicco'),('Robby9','roberto@studenti.unibo.it','$2y$10$lJvSdgJXarLFfaA8czBDWO/7M.SaLVMMm2sJWBniP4rZos0eI5586','1','Luna'),('TomTomTomTom','tommaso@hotmail.com','$2y$10$IQxZra5KUVmfoCk25ieOIeZWBV890syDGXlILD.skdCVCpnEj0Lh2','1','Scheggia'),('user2847156','gormiti05@hotmail.com','$2y$10$qsZyKgZqRVyTnT3uOekGMeKaiXW/rkVUqmNSGLMGJ3JJulJgl2ooy','3','Avengers'),('Utente','utente@gmail.com','$2y$10$7jO92/hEeEtTuJDia4PDWuyASKv6kr3DqxWiWrmTDpRSsJZfOKvmi','3','21'),('winnie','winnie@apple.com','$2y$10$IeW25zBfSDAZeNlgJuMAVOA.XlpTh7Qxt09VkliSl2a51r.lciF1W','2','Pooh'),('_Stefano_','stefano@gmail.com','$2y$10$Ik2BwQ.u4Qm9mxi4mMXy2ebPX/YVHGZQeYyGPuxJG8daA07Hs/M22','3','Avatar'),('_____i_____','i@i.it','$2y$10$t0Gw9FxZAsTNSnk/fAc9jeMxsliS.6RhKqjjaWntM13pO/iLB/1aO','3','Transformers iii');
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  1:13:35
