# BACKLOG
* Done -> Add Recommended status tothe application table 

* As a staff, I want to view the application from a modal - Make view appliction button open modal - display all the data in that  modal
* Instructor should see approved applications only - Change this role to see approved status only
* Staff should see recommended applications 
* Instructor sample data applicants
* Verified Token


---------

* Update the sql table to remove course from the applications table
* You need to add the missing input fields in applicant form
* gpa                    
level_of_education     
date_of_graduation  
previous_experience                
duration  # duration of previous experience            
department_id  
----+-------------------------+
|  1 | Computer Science        |
|  2 | Data Science            |
|  3 | Artificial Intelligence |
|  4 | Electrical Engineering  |
|  5 | Mechanical Engineering  |


--
* All the user type workflows 
    * Applicants - This user type will need to upload a file
        * Applicant form -> form fields, ability to upload a file
    * Committee - Can recommend or deny applications
    * Instructor - Approve or reject applications
    * Admin (Staff) - View all applications and their current state can do all actions add/remove/update/delete statuses




## COMPLETED 

create  the middleware for the backend this verifies the jwt token -> Done


create the login component frontend this should get the jwt token and use it for api interceptor
create the api interceptor on the frontend - this should apply it to all subsequent request

Create a protected page called applicant - this will be your applicants home page 

Show file structure, file names