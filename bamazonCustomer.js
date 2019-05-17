//Connect to dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");


// Define the MySQL connection parameters
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the display function after the connection is made to prompt the user

    start();
});

function start(){
    //connects to mySQL table and displays inventory
    connection.query('SELECT * FROM products', function(err, res){
      if(err) throw err;
    
      console.log("-----Welcome to Bamazon--------")
      console.log("---------------------------------------------------------------------------------------------")
    
      for(var i = 0; i<res.length;i++){
        console.log("ID: " + res[i].item_id+ " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        console.log("---------------------------------------------------------------------------------------------")
      }
    })
}
userPrompt();

function userPrompt() {
    inquirer
        .prompt([
            {
              name: "id",
              type: "input",
              message: "What is the ID of the product you would like to purchase?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ])
}



