CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

insert into products (product_name, department_name, price,stock_quantity)
values ("jacket", "clothing", 80, 25);
insert into products (product_name, department_name, price,stock_quantity)
values ("hat", "clothing", 30, 25);
insert into products (product_name, department_name, price,stock_quantity)
values ("shirt", "clothing", 30, 50);
insert into products (product_name, department_name, price,stock_quantity)
values ("shoes", "clothing", 100, 10);
insert into products (product_name, department_name, price,stock_quantity)
values ("soccer ball", "sporting goods", 30, 100);
insert into products (product_name, department_name, price,stock_quantity)
values ("football", "sporting goods", 30, 100);
insert into products (product_name, department_name, price,stock_quantity)
values ("basketball", "sporting goods", 30, 100);
insert into products (product_name, department_name, price,stock_quantity)
values ("camera", "electronics", 150, 25);
insert into products (product_name, department_name, price,stock_quantity)
values ("cellphone", "electronics", 200, 25);
insert into products (product_name, department_name, price,stock_quantity)
values ("pc", "electronics", 1000, 5);
