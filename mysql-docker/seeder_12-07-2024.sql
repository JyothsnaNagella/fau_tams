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
INSERT INTO `instructor` (`id`, `email`, `password`, `firstname`, `lastname`, `department_id`) VALUES
    (1, 'harikalva@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Hari', 'Kalva', 1),
    (2, 'ashanperera@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Ashan', 'Perera', 2),
    (3, 'behnazghoraani@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Behnaz', 'Ghoraani', 3),
    (4, 'danielraviv@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Daniel', 'Raviv', 4),
    (5, 'borivojefurht@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Borivoje', 'Furht', 5);

-- 4. Course Table
INSERT INTO `course` (`id`, `coursename`, `status`, `department_id`, `instructor_id`) VALUES
    (1, 'Software Engineering', 'Open', 1, 1),
    (2, 'Intro to Data Science', 'Open', 2, 2),
    (3, 'Database Implementation', 'Closed', 3, 3),
    (4, 'Machine Learning', 'Open', 4, 4),
    (5, 'Deep Learning', 'Open', 5, 5);

-- 5. Applicant Table
INSERT INTO `applicant` (`id`, `firstname`, `lastname`, `znumber`, `email`, `password`) VALUES
    (1, 'Jyothsna', 'Nagella', 'Z23736087', 'jyothsna.nagella@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2'),
    (2, 'Sharanya', 'Yasa', 'Z23736088', 'sharanya.yasa@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2'),
    (3, 'Kailash', 'Adapa', 'Z23736089', 'kailash.adapa@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2'),
    (4, 'Arnav', 'Reddy', 'Z23736090', 'arnav.reddy@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2'),
    (5, 'Varnith', 'Dubbaka', 'Z23736091', 'varnith.dubbaka@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2');

-- 6. Applications Table
INSERT INTO `applications` (`id`, `applicant_id`, `gpa`, `level_of_education`, `date_of_graduation`, `resume`, `previous_experience`, `duration`, `department_id`, `course_id`, `instructor_id`, `status`) VALUES
    (1, 1, 3.8, 'Bachelors', '2025-05-15', 'resume.pdf', '2 years of experience in software development', '2 semesters', 1, 1, 1, 'Pending'),
    (2, 2, 3.7, 'Bachelors', '2025-05-15', 'resume.pdf', 'Internship in data analysis', '1 semester', 2, 2, 2, 'Pending'),
    (3, 3, 3.9, 'Bachelors', '2025-05-15', 'resume.pdf', '2 years in machine learning projects', '1 semester', 3, 3, 3, 'Recommended'),
    (4, 4, 3.6, 'Bachelors', '2025-05-15', 'resume.pdf', 'Worked as an intern at AI company', '2 semesters', 4, 4, 4, 'Recommended'),
    (5, 5, 3.5, 'Bachelors', '2025-05-15', 'resume.pdf', 'Worked on a research project in AI', '1 semester', 5, 5, 5, 'Pending');

-- 7. Committee Table
INSERT INTO `committee` (`id`, `email`, `password`, `firstname`, `lastname`) VALUES
    (1, 'john.doe@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'John', 'Doe'),
    (2, 'mary.jones@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Mary', 'Jones'),
    (3, 'alex.smith@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Alex', 'Smith'),
    (4, 'patricia.brown@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'Patricia', 'Brown'),
    (5, 'david.white@fau.edu', '$2b$10$FtcnBRaGg47BfqgKBcHQz.9mc4o47260JzwwB4rkNTRDzbhGD7Sb2', 'David', 'White');

-- 8. Selected TA Table
INSERT INTO `selected_ta` (`id`, `applicant_id`, `course_id`, `application_id`, `offer_sent_date`, `offer_status`) VALUES
    (1, 1, 1, 1, '2024-12-10', 'Pending'),
    (2, 2, 2, 2, '2024-12-10', 'Pending'),
    (3, 3, 3, 3, '2024-12-10', 'Pending'),
    (4, 4, 4, 4, '2024-12-10', 'Pending'),
    (5, 5, 5, 5, '2024-12-10', 'Pending');

-- 9. Instructor Feedback Table
INSERT INTO `instructor_feedback` (`id`, `application_id`, `performance_rating`, `feedback`, `created_at`) VALUES
    (1, 1, 4, 'Great work in the course, very attentive and responsive.', CURRENT_TIMESTAMP),
    (2, 2, 5, 'Excellent understanding of data science concepts and applied learning.', CURRENT_TIMESTAMP),
    (3, 3, 4, 'Good engagement, but needs to improve technical writing skills.', CURRENT_TIMESTAMP),
    (4, 4, 3, 'Solid performance, but needs more interaction with students.', CURRENT_TIMESTAMP),
    (5, 5, 5, 'Outstanding work in both theory and practice.', CURRENT_TIMESTAMP);

