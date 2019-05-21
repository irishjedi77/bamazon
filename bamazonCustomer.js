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
function start(overQuantity) {
  //connects to mySQL table and displays inventory
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;

    console.log("------------------------------------Welcome to Bamazon-----------------------------------------")
    console.table(res);
    if (overQuantity === true) {
      console.log("Insufficient quantity available. Please try again.")
    }
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
      var query = "SELECT product_name, price, item_id, stock_quantity FROM products WHERE item_id = ?";
      var chosenItem;

      const queryTest = connection.query(query, [answer.choice, answer.quantity], function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(answer.choice)) {
            chosenItem = res[i];
            console.log("You selected: " + answer.quantity + " of " + chosenItem.product_name)
          }
        }
        if (answer.quantity <= parseInt(chosenItem.stock_quantity)) {
          var difference = Math.abs(parseInt(answer.quantity) - parseInt(chosenItem.stock_quantity));
          connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: difference
          }, {
            product_name: chosenItem.product_name
          }
          ], function (err, res){
            if (err) throw err;
            console.log("Thank you for purchasing " + chosenItem.product_name + ". Your total is " + "$" + chosenItem.price * answer.quantity)
          })
          //start();
          connection.end();
          
        } else {
          start(true);
        }
      })
      
    }

  
    )

}
