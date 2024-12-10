-- Create Table for Staff
CREATE TABLE `staff` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

-- Create Table for Course
CREATE TABLE `course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `coursename` VARCHAR(100) NOT NULL,
  `status` ENUM('Open', 'Closed') DEFAULT 'Open',
  `department_id` INT NOT NULL,
  `instructor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`department_id`) REFERENCES `department`(`id`),
  FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`)
);

-- Create Table for Department
CREATE TABLE `department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Create Table for Instructor
CREATE TABLE `instructor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `course_name` VARCHAR(100) NOT NULL,
  `course_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`course_id`) REFERENCES `course`(`id`),
  FOREIGN KEY (`department_id`) REFERENCES `department`(`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

-- Create Table for Instructor Feedback
CREATE TABLE `instructor_feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `instructor_name` VARCHAR(100) NOT NULL,
  `performance_rating` INT NOT NULL,
  `ta_id` INT NOT NULL,
  `feedback` TEXT,
  `instructor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`course_id`) REFERENCES `course`(`id`),
  FOREIGN KEY (`ta_id`) REFERENCES `selected_ta`(`id`),
  FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`)
);

-- Create Table for Applicant
CREATE TABLE `applicant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `znumber` VARCHAR(50) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

-- Create Table for Applications
CREATE TABLE `applications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `applicant_id` INT NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `znumber` VARCHAR(50) NOT NULL,
  `gpa` DECIMAL(3, 2),
  `level_of_education` VARCHAR(100),
  `date_of_graduation` DATE,
  `resume` TEXT,
  `previous_experience` TEXT,
  `duration` VARCHAR(50),
  `department_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `instructor_feedback_id` INT,
  `instructor_id` INT NOT NULL,
  `has_been_notified` BOOLEAN DEFAULT FALSE,
  `status` ENUM('Pending', 'Offer Pending', 'Accepted', 'Approved', 'Denied', 'Rejected', 'Recommended') DEFAULT 'Pending',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`),
  FOREIGN KEY (`department_id`) REFERENCES `department`(`id`),
  FOREIGN KEY (`course_id`) REFERENCES `course`(`id`),
  FOREIGN KEY (`instructor_feedback_id`) REFERENCES `instructor_feedback`(`id`),
  FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`)
);

-- Create Table for Committee
CREATE TABLE `committee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

-- Create Table for Selected TA
CREATE TABLE `selected_ta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `instructor_id` INT NOT NULL,
  `applicant_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `application_id` INT NOT NULL,
  `offer_sent` DATE,
  `offer_status` ENUM('Pending', 'Accepted', 'Declined') DEFAULT 'Pending',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`),
  FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`),
  FOREIGN KEY (`course_id`) REFERENCES `course`(`id`),
  FOREIGN KEY (`department_id`) REFERENCES `department`(`id`),
  FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`)
);

