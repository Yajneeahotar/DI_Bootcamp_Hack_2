CREATE TABLE users
(
 username VARCHAR (50) PRIMARY KEY,
 email VARCHAR (50) NOT NULL,
 First_name VARCHAR (100) NOT NULL,
 Last_name VARCHAR (100) NOT NULL,
 Password VARCHAR (10) NOT NULL
)
INSERT INTO users (username, email,first_name,last_name,Password)
--VALUES ( 'Emma','emma@gmail.com', 'Emma', 'Johnson', '1234')
VALUES ( 'Jane','jane@gmail.com', 'Jane', 'Smith', '1234')

SELECT * FROM users;



CREATE TABLE orders
(
 Order_id SERIAL PRIMARY KEY,
 Username VARCHAR (50) NOT NULL,
 First_name VARCHAR (100) NOT NULL,
 Last_name VARCHAR (100) NOT NULL,
 Menu  VARCHAR (100) NOT NULL,
 Quantity INTEGER NOT NULL,
 id INTEGER,
 FOREIGN KEY (id) REFERENCES users(username)
)
INSERT INTO users (Order_id,Username,First_name,Last_name,Menu, Quantity,price)
VALUES 

SELECT * FROM orders;
DELETE FROM orders;