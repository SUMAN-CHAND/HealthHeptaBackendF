const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

router.post('/b2b/orders', async (req, res) => {


    if (req.session.user) {
        try {
            // const { userId, product, orderDetails } = req.body;
            const userId = req.session.user.id;
            const user_id = req.session.user.id;
            // const date = new Date().toISOString().split('T')[0];
            // const date = new Date().toISOString();
            const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

            console.log(date)
            const total_amount = req.body.total_amount;
            const payment_type = req.body.payment_type;
            console.log(req.body)
            // Create the order
            const createOrder = await new Promise((resolve, reject) => {
                const sql2 = "INSERT INTO b2b_orders (sub_admin_id, order_date, status) VALUES (?, ?, 'pending');";
                db.query(sql2, [user_id, date], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.insertId); // Get the newly inserted order ID
                    }
                });
            });

            // Get the product IDs and quantities from the user's cart
            const productInfo = await new Promise((resolve, reject) => {
                const sql1 = "SELECT b2b_product.product_id, b2b_carttable.quantity FROM b2b_product INNER JOIN b2b_carttable ON b2b_product.product_id = b2b_carttable.product_id AND b2b_carttable.sub_admin_id = ?;";
                db.query(sql1, [user_id], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });

            // Insert order items with quantities
            const insertOrderItems = await Promise.all(productInfo.map(product => {
                const { product_id, quantity } = product;
                const sql4 = "INSERT INTO b2b_order_items (order_id, product_id, quantity) VALUES (?, ?, ?);";
                return new Promise((resolve, reject) => {
                    db.query(sql4, [createOrder, product_id, quantity], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }));

            const createPayment = await new Promise((resolve, reject) => {
                const sql4 = "INSERT INTO b2b_payments (order_id, payment_date,total_amount,payment_status,payment_type) VALUES (?, ?,?,?,?);";
                db.query(sql4, [createOrder, date, total_amount, 'pending', payment_type], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            // decrease items from the anctual Quantity
            const decreaseQuantity = await Promise.all(productInfo.map(product => {
                const { product_id, quantity } = product;
                const sql5 = "UPDATE b2b_product SET product_quantity = product_quantity - ? WHERE product_id = ?;";
                return new Promise((resolve, reject) => {
                    db.query(sql5, [quantity, product_id], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }));

            // Add to User table that how many time he orders
            const OrderCountInUserTable = await new Promise((resolve, reject) => {
                // const sql = "select  OrderCount from user_tbl WHERE id = ?;";

                const sql2 = "UPDATE sub_admin SET OrderCount = OrderCount + 1 WHERE id = ?;";

                db.query(sql2, [userId], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });

            });

            const deleteCartItems = await Promise.all(productInfo.map(product => {
                const { product_id, quantity } = product;
                const sql5 = "DELETE FROM b2b_carttable WHERE sub_admin_id = ? AND product_id = ?;";
                return new Promise((resolve, reject) => {
                    db.query(sql5, [user_id, product_id], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }));
            // After processing the order, notify the super admin and sub-admins.
            // io.emit('new-order', 'A new order has been placed.');

            res.json("success");
            // res.json("success",{ message: 'Order placed successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    } else {
        res.status(404).send("Data not found");
    }
});


const orders = [];
// Function to check if an order can be canceled within a time period
function canCancelOrder(order) {
    const currentTime = new Date().toISOString();
    const currentTimeinMill = Date.parse(currentTime);
    const orderTime = order.order_date;
    const orderTimeinMill = Date.parse(orderTime);
    const timeElapsed = currentTimeinMill - orderTimeinMill;
    const allowedCancellationPeriod = 24 * 60 * 60 * 1000; // 1 hour in milliseconds

    return timeElapsed <= allowedCancellationPeriod;
}

// Cancel an order within the time period
router.delete('/sub-admin/delete/orders/:id', async (req, res) => {
    const orderId = parseInt(req.params.id);
    console.log(orderId)
    const findOrder = await new Promise((resolve, reject) => {
        const sql = "select * from b2b_orders where id=?";
        db.query(sql, [orderId], async (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result[0])
                // orders.push(result)
                // resolve(result);
                // Find the order in the orders array (or query the database in production)
                // const orderIndex = orders.findIndex((order) => order[0].id === orderId);

                if (result[0].id !== orderId) {

                    return res.status(404).json({ message: 'Order not found' });
                }

                // console.log(orderIndex)
                // const order = orders[orderIndex];
                if (!canCancelOrder(result[0])) {
                    console.log('no')
                    // return res.status(400).json({ message: 'Order cannot be canceled at this time' })
                    return res.json(null);
                }

                // Remove the order from the array (or mark it as canceled in the database)
                const deletePayment = await new Promise((resolve, reject) => {
                    const sql = "delete from b2b_payments where order_id=?";
                    db.query(sql, [orderId], async (err, result) => {
                        if (err) {
                            reject(err);
                        } else {

                            console.log("payment Delete")

                            // Remove the order from the array (or mark it as canceled in the database)
                            const orderItems = await new Promise((resolve, reject) => {
                                const sql = "delete from b2b_order_items where order_id=?";
                                db.query(sql, [orderId], async (err, result) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        console.log("order_items Delete")
                                        // Remove the order from the array (or mark it as canceled in the database)
                                        const deleteOrder = await new Promise((resolve, reject) => {
                                            const sql = "delete from b2b_orders where id=?";
                                            db.query(sql, [orderId], (err, result) => {
                                                if (err) {
                                                    reject(err);
                                                } else {
                                                    console.log("orders Delete")
                                                    //orders.push(result) 
                                                    // res.status(204).send('success');
                                                    return res.json('success');
                                                    //resolve(result);
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });
                });


                //orders.splice(orderIndex, 1);

                // res.status(204).send('success');
            }
        });
    });

    // console.log(orders)


});




module.exports = router;

