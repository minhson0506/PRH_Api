# PRH_Api

PRH_Api App was created to receive data from [PRH Api](http://avoindata.prh.fi/index_en.html) and store data in local to help people can get company data faster.

## App features

<ul>
  <li> Store database of PRH in localhost
  <li> Display all data of company in area
  </ul>
  
## A sneak peek of PRH_Api App!!

<p align="center">
  <img width="1924" alt="Screenshot 2023-02-05 at 20 45 04" src="https://user-images.githubusercontent.com/73076333/228629927-ca7a4c53-07f1-495a-88c1-2c2b2c8856d1.png">
</p> 

## Stack

#Backend: Node with Typecript, MySql

## Installation

1. Clone Helsinki Bike App to local:
```
$ git clone git@github.com:minhson0506/PRH_Api.git
```
2. Open project in Visual Studio

4. Create database in local:
<li>	Connect to your database server as a root user on command line: mysql -u root -p / mysql -u root -p / mysql (command depends on you operating system/version installed) or using the MariaDB Client application (Windows) and create a database and a user with privileges on it:
<li>	CREATE DATABASE PRH;
<li>	CREATE USER 'demo'@'localhost' identified by 'Password123@';;
<li>	GRANT USAGE ON *.* TO 'demo'@'localhost';
<li>	GRANT ALL ON PRH.* TO 'demo'@'localhost';
<li>	FLUSH PRIVILEGES;
exit

5. Create file .env in root folder of project with content (same level with src folder)
```
NODE_ENV=development
PORT=3000
DB_NAME=PRH
DB_HOST=localhost
DB_USER=demo
DB_PASS=Password123@
```

5. Build and run project.
```
$ npm i

$ npm run dev
```



