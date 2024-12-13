## Install MySQL. (MacOS + brew example) 
>brew install mysql

## Install the MySQL Node.js package
>npm install mysql

## Setup your user. Replace hyfuser and hyfpassword with your actual MySQL credentials
Start MySQL
>mysql -u root -p

Create a new user
>CREATE USER 'hyfuser'@'localhost' IDENTIFIED BY 'hyfpassword';

Add user rights
>GRANT ALL PRIVILEGES ON *.* TO 'hyfuser'@'localhost' WITH GRANT OPTION;

Save changes
>FLUSH PRIVILEGES;

Check your conection
>mysql -u hyfuser -p

## Run the script
>node mysql-ex2.js