
var mysql = require("mysql")
require("console.table")
var inquirer = require("inquirer")


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
 
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to Bamazon ");
    enterInventory();
  });


function enterInventory(){
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.table(result);
        userInput();
    })
}


function userInput() {
    
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;

        inquirer.prompt([
            {
                name: "id",
                message: "Enter the ID of the desired product",
                type: "input",
               
                validate: function(value) {
                
                    return /^[0-9]+$/.test(value);
                }
            },
            {
                name: "quantity",
                message: "How many would you like?",
                type: "input",
                validate: function(value) {
                
                    return /^[0-9]+$/.test(value);
                }
            },
        ]).then(function(answers){
            var id = answers.id
            var quantity= answers.quantity
            console.log ("You want " + quantity + " of item number " + id);
            connection.query("SELECT stock_quantity FROM products WHERE item_id= ?",
            id, 
            function(err, res){
                if(err) throw err;

                if(quantity > res[0].stock_quantity){
                    console.log(" Our inventory is low");
                    console.log("Stock remaining: " + res[0].stock_quantity)
                    } else {

                        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                            [
                                res[0].stock_quantity - quantity,
                                id
                            ],
                            function(err){
                                if(err) throw err;

                                console.log("Order placed!");
                                cost(id, quantity);
                                shop();
                            }
                        )
                    }
                }
            )
        })
    })
}

function cost(item, quantity){
    connection.query("SELECT product_name, price FROM products WHERE item_id= ?",
        [item],
    function(err, res){
        var price = quantity * res[0].price
        if(err) throw err;
        console.log("The cost of your order of " + quantity + " " + res[0].product_name + " is $" + price);
        }
    )
}

function shop(){
    inquirer.prompt([
        {
            name: "verify",
            message: "Would you like to buy something else?",
            type: "confirm"
        }
    ]).then(function(answers){
        if (answers.verify === true){
            console.log("Anything else?");
            enterInventory();
        } else {
            console.log("Thank you for shopping!")
        }
    });
}

