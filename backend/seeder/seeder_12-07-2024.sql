-- 1. Staff Table
INSERT INTO `staff` (`id`, `email`, `password`, `firstname`, `lastname`) VALUES
    (1, 'james.jones@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'James', 'Jones'),
    (2, 'susan.white@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Susan', 'White'),
    (3, 'michael.green@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Michael', 'Green'),
    (4, 'linda.brown@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Linda', 'Brown'),
    (5, 'robert.smith@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Robert', 'Smith');

-- 2. Department Table
INSERT INTO `department` (`id`, `name`) VALUES
    (1, 'Computer Science'),
    (2, 'Data Science'),
    (3, 'Artificial Intelligence'),
    (4, 'Electrical Engineering'),
    (5, 'Mechanical Engineering');

-- 3. Instructor Table
INSERT INTO `instructor` (`id`, `email`, `password`, `firstname`, `lastname`, `course_name`, `course_id`, `department_id`) VALUES
    (1, 'harikalva@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Hari', 'Kalva', 'Software Engineering', 1, 1),
    (2, 'ashanperera@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Ashan', 'Perera', 'Intro to Data Science', 2, 2),
    (3, 'behnazghoraani@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Behnaz', 'Ghoraani', 'Database Implementation', 3, 3),
    (4, 'danielraviv@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Daniel', 'Raviv', 'Machine Learning', 4, 4),
    (5, 'borivojefurht@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Borivoje', 'Furht', 'Deep Learning', 5, 5);

-- 4. Course Table
INSERT INTO `course` (`id`, `coursename`, `status`, `department_id`, `instructor_id`) VALUES
    (1, 'Software Engineering', 'Open', 1, 1),
    (2, 'Intro to Data Science', 'Open', 2, 2),
    (3, 'Database Implementation', 'Closed', 3, 3),
    (4, 'Machine Learning', 'Open', 4, 4),
    (5, 'Deep Learning', 'Open', 5, 5);

-- 5. Applicant Table
INSERT INTO `applicant` (`id`, `firstname`, `lastname`, `Znumber`, `email`, `password`) VALUES
    (1, 'Jyothsna', 'Nagella', 'Z23736087', 'jyothsna.nagella@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2'),
    (2, 'Sharanya', 'Yasa', 'Z23736088', 'sharanya.yasa@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2'),
    (3, 'Kailash', 'Adapa', 'Z23736089', 'kailash.adapa@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2'),
    (4, 'Arnav', 'Reddy', 'Z23736090', 'arnav.reddy@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2'),
    (5, 'Varnith', 'Dubbaka', 'Z23736091', 'varnith.dubbaka@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2');

-- 6. Applicantions Table
INSERT INTO `applications` (`id`, `applicant_id`, `firstname`, `lastname`, `email`, `Znumber`, `gpa`, `level_of_education`, `date_of_graduation`, `resume`, `previous_experience`, `duration`, `department_id`, `course_id`, `instructor_feedback_id`, `instructor_id`, `status`) VALUES
    (1, 1, 'Jyothsna', 'Nagella', 'jyothsna.nagella@fau.edu', 'Z23736087', 3.8, 'Bachelors', '2025-05-15', 'resume.pdf', '2 years of experience in software development', '2 semesters', 1, 1, NULL, 1, 'Pending'),
    (2, 2, 'Sharanya', 'Yasa', 'sharanya.yasa@fau.edu', 'Z23736088', 3.7, 'Bachelors', '2025-05-15', 'resume.pdf', 'Internship in data analysis', '1 semester', 2, 2, NULL, 2, 'Pending'),
    (3, 3, 'Kailash', 'Adapa', 'kailash.adapa@fau.edu', 'Z23736089', 3.9, 'Bachelors', '2025-05-15', 'resume.pdf', '2 years in machine learning projects', '1 semester', 3, 3, NULL, 3, 'Pending'),
    (4, 4, 'Arnav', 'Reddy', 'arnav.reddy@fau.edu', 'Z23736090', 3.6, 'Bachelors', '2025-05-15', 'resume.pdf', 'Worked as an intern at AI company', '2 semesters', 4, 4, NULL, 4, 'Pending'),
    (5, 5, 'Varnith', 'Dubbaka', 'varnith.dubbaka@fau.edu', 'Z23736091', 3.5, 'Bachelors', '2025-05-15', 'resume.pdf', 'Worked on a research project in AI', '1 semester', 5, 5, NULL, 5, 'Pending');

-- 7. Instructor Feedback Table
INSERT INTO `instructor_feedback` (`id`, `course_id`, `instructor_name`, `performance_rating`, `ta_id`, `feedback`, `instructor_id`) VALUES
    (1, 1, 'Hari Kalva', 4, 1, 'Great work in the course, very attentive and responsive.', 1),
    (2, 2, 'Ashan Perera', 5, 2, 'Excellent understanding of data science concepts and applied learning.', 2),
    (3, 3, 'Behnaz Ghoraani', 4, 3, 'Good engagement, but needs to improve technical writing skills.', 3),
    (4, 4, 'Daniel Raviv', 3, 4, 'Solid performance, but needs more interaction with students.', 4),
    (5, 5, 'Borivoje Furht', 5, 5, 'Outstanding work in both theory and practice.', 5);

-- 8. Committee Table
INSERT INTO `committee` (`id`, `email`, `password`, `firstname`, `lastname`) VALUES
    (1, 'john.doe@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'John', 'Doe'),
    (2, 'mary.jones@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Mary', 'Jones'),
    (3, 'alex.smith@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Alex', 'Smith'),
    (4, 'patricia.brown@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Patricia', 'Brown'),
    (5, 'david.white@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'David', 'White');

-- 9. Selected TA Table
INSERT INTO `selected_ta` (`id`, `name`, `instructor_id`, `applicant_id`, `course_id`, `department_id`, `email`, `application_id`, `offer_sent`, `offer_status`) VALUES
    (1, 'Jyothsna Nagella', 1, 1, 1, 1, 'jyothsna.nagella@fau.edu', 1, '2024-12-10', 'Pending'),
    (2, 'Sharanya Yasa', 2, 2, 2, 2, 'sharanya.yasa@fau.edu', 2, '2024-12-10', 'Pending'),
    (3, 'Kailash Adapa', 3, 3, 3, 3, 'kailash.adapa@fau.edu', 3, '2024-12-10', 'Pending'),
    (4, 'Arnav Reddy', 4, 4, 4, 4, 'arnav.reddy@fau.edu', 4, '2024-12-10', 'Pending'),
    (5, 'Varnith Dubbaka', 5, 5, 5, 5, 'varnith.dubbaka@fau.edu', 5, '2024-12-10', 'Pending');
