# Backend of e-commerce application

Created the backend of the e-commerce applicaiton.
Used token based authentication.

Following are the end points:

User endpoint:

- **/signup**: To register yourself and can also assign role. By default role is **'customer'**.
- **/signin**: To generate the token used to access other endpoints.

Product endpoint:

- **/product**: To get all the products.
- **/product/add**: To add a product.
- **/product/update/:productId**: To update a product.
- **/product/:productId**: To delete a product.

Cart endpoint:

- **/cart**: To get products from the cart.
- **/cart/add**: To add a product to the cart.
- **/cart/update**: To update products present in the cart.
- **/cart/delete**: To delete product from the cart.

Order endpoint:

- **/order**: To get all the orders. Only accessible by admin.
- **/order/customer/:customerId**: To get the orders of a customer. Only accessible by admin.
- **/order/add**: To add order.
