# bamazon

Bamazon is a fictional Amazon-like storefront powered by a MySQL database. The app takes in orders from customers and depletes stock from the store's inventory.

The MySQL database is called Bamazon and includes a table for "products." The products table includes the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

The database is populated with 10 mock products and users are prompted for the ID of the product they would like to buy and prompted for the quantity they would like to buy. The application then checks to ensure the quantity of the product is available. If the quantity is not available, users are prompted with a message indicating insufficient quantity-- otherwise the order is fulfilled and the user is prompted with a message showing the total cost of the purchase and thanking them for their order. 

# Demo

https://drive.google.com/file/d/1wMaVT0BftkayY0biJEnmFG3uZzA8MFv2/view

Created by: Erin Lyden 
