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


    const sql1 = ` SELECT b2b_orders.id, b2b_product.product_id,product_name , sub_admin_id ,name,order_date,status,payment_status,payment_type,expected_delivery_date,order_by  FROM b2b_product
     INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id 
     INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id 
     INNER JOIN b2b_payments ON b2b_orders.id = b2b_payments.order_id
     INNER JOIN sub_admin ON sub_admin.id = b2b_orders.sub_admin_id;
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

    const sql2 = " select payment_id,sub_admin_id,order_id,payment_date,total_amount,payment_status,payment_type FROM b2b_payments INNER JOIN b2b_orders ON b2b_payments.order_id = b2b_orders.id;";

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



module.exports = router;