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

});
start();
function start() {
    //connects to mySQL table and displays inventory
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log("------------------------------------Welcome to Bamazon-----------------------------------------")
        //console.log("---------------------------------------------------------------------------------------------")

        // for (var i = 0; i < res.length; i++) {
        //     console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        //     console.log("---------------------------------------------------------------------------------------------")
        // }
        console.table(res);
        userPrompt(res);
    })
}

function userPrompt(res) {
    inquirer
        .prompt([

            {
                name: "choice",
                message: "What is the ID of the product you would like to purchase?",
                type: "input"
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many items do you want to purchase?'


            }
        ]).then(function (answer) {
            var query = "SELECT item_id, stock_quantity FROM products WHERE ?";
            var chosenItem;
            connection.query(query, { item_id: answer.choice, stock_quantity: answer.quantity }, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === answer.choice) {
                        chosenItem = res[i];
                        console.log("You selected: " + answer.quantity + " of item# " + answer.choice)

                    }
                }

            })




        });
}








