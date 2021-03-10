DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
)

CREATE TABLE role (
    title VARCHAR(30),
    salary INT NOT NULL UNSIGNED
    department_id INT NOT NULL UNSIGNED,
    INDEX dep_id (department_id),
)

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    INDEX role_id (role_id)

    manager_id INT UNSIGNED
    INDEX man_id (manager_id)
)