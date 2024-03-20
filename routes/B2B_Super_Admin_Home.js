const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');
const e = require("express");


let Orders = [];
let productResults = [];
let images = [];
let payment = [];
let sub_admin = [];

router.get('/superadmin/b2b/home', async (req, res) => {
    // if (req.session.user) {
    //     const user_id = req.session.user.id

    //Show All the B2B Products
    try {
        // const user_id = req.session.user.id;
        const query = " select * from b2b_product;";
        productResults = await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    console.error('Error retrieving data: ' + err.message);
                    reject(err);
                } else {
                    // console.log('Data retrieved successfully');
                    resolve(result);
                }
            });
        });

        if (productResults.length > 0) {
            const imagesPromises = productResults.map((product) => {
                return new Promise((resolve, reject) => {
                    const sql = 'SELECT * FROM images WHERE id = ?';
                    db.query(sql, [product.productImageId], (err, result) => {
                        if (err) {
                            console.error('Database error: ' + err);
                            reject(err);
                        } else {
                            // console.log(result[0]);
                            resolve(result[0]);
                        }
                    });
                });
            });

            images = await Promise.all(imagesPromises);
            // console.log(images);
            // return res.json([productResults, images]);
        } else {
            return res.json([]); // Return an empty response if no doctor details found
        }
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({ error: 'Error retrieving product details from the database' });
    }


    const sql1 = `
    SELECT 
        b2b_orders.id,
        b2b_product.product_id,
        product_name,
        sub_admin_id,
        phone,
        name,
        order_date,
        status,
        payment_status,
        payment_type,
        expected_delivery_date,
        order_by,
        paid_amount,
        due_amount,
        total_amount
    FROM
        b2b_product
            INNER JOIN
        b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id
            INNER JOIN
        b2b_orders ON b2b_orders.id = b2b_order_items.order_id
            INNER JOIN
        b2b_payments ON b2b_orders.id = b2b_payments.order_id
            INNER JOIN
        sub_admin ON sub_admin.id = b2b_orders.sub_admin_id;
    
    `
    // " SELECT b2b_orders.id, b2b_product.product_id , sub_admin_id,order_date,status,payment_status,payment_type,expected_delivery_date,order_by  FROM b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_orders.id = b2b_payments.order_id;";
    db.query(sql1, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            //  res.json("Success");
            // return res.json(data);
            Orders = data;
        }
    })

    const sql2 = " select payment_id,sub_admin_id,order_id,payment_date,total_amount,paid_amount,due_amount,payment_status,payment_type FROM b2b_payments INNER JOIN b2b_orders ON b2b_payments.order_id = b2b_orders.id;";

    db.query(sql2, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            //  res.json("Success");
            // console.log(data)
            // return res.json(data);
            payment = data;
        }
    })

    const sql3 = "select * from sub_admin;";

    db.query(sql3, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            //  res.json("Success");
            // console.log(data)
            // return res.json(data);
            sub_admin = data;
        }
    })

    // console.log([userno, UserCount, salesCount, purchaseCount, orderCount, stocks, lowStock, expirying_product, expiry_product, monthPurchase, YearlyPurchase, monthSales, YearlySales, Orders]);
    return res.json([productResults, images, Orders, payment, sub_admin]);



    // } else {
    //     res.status(500).send("data not found")
    // }
})

// Route for super admin to view Order details
router.get("/superadmin/b2b/payment/status/:order_id", (req, res) => {
    const order_id = req.params.order_id;

    // View Product details by id
    const sql = "select * from b2b_payments where order_id = ?"

    db.query(sql, [order_id], (err, data) => {
        if (err) {
            console.error("Error updating order status:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        // console.log(data);
        res.json(data);
    });
});

//update Payment details
router.post("/superadmin/b2b/update/payment", (req, res) => {
    const values = [
        (order_id = req.body.order_id),
        (payment_status = req.body.payment_status),
        (paid_amount = req.body.paid_amount),
    ];
    //   const due_amount = total_amount - paid_amount;
    // Update the order Delivery Date in the database to indicate acceptance
    const user_id = req.session.user.id;
    const user_name = req.session.user.name;
    const user_role = req.session.user.role;
    const sql =
        "UPDATE `b2b_payments` SET `payment_status` = ? ,  `paymentacceptedby` = ? , `paymentacceptedUserId` = ?, `paid_amount`= (`paid_amount` + ?),`due_amount` = (`total_amount`- `paid_amount`)   WHERE `order_id` = ?;"
    try {
        db.query(
            sql,
            [payment_status, user_name,user_id, paid_amount, order_id],
           async (err, data) => {
                if (err) {
                    console.error("Error updating order status:", err);
                    // res.status(500).json({ error: "Internal server error" });
                    res.json(null);
                } if (data.changedRows > 0) {
                    // update the sub admin due amount
                    // const dueAmount = await Promise.all(
                    //     productInfo.map(() => {
                    const sql4 =
                        "SELECT due_amount  FROM b2b_payments where order_id = ?";
                        const dueAmount = await new Promise((resolve, reject) => {
                        db.query(sql4, [order_id], (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    });
                    const sql5 =
                        "SELECT sub_admin_id  FROM b2b_orders where id = ?";
                    const SubAdminIDs = await new Promise((resolve, reject) => {
                        db.query(sql5, [order_id], (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    });
                    const sql6 =
                        " UPDATE `sub_admin` SET `total_due_payment` = ? WHERE `sub_admin_id` = ?;"

                    const SubAdminDetails_id = await new Promise((resolve, reject) => {
                        db.query(sql5, [dueAmount.due_amount, SubAdminIDs.sub_admin_id], (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                
                                resolve(result);
                            }
                        });
                    });

                    res.json({status : "success",role:user_role});
                } else {
                    res.json(null);

                }
            }
        );
    } catch (error) {
        res.status(500).sendStatus("Internal Server Error");
    }
});

module.exports = router;