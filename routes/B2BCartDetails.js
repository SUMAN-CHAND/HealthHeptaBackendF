const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

router.get('/b2b/cart', async (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id
        const user = req.session.user;

        if (user.role === 'b2b_employee') {
            try {
                // const user_id = req.session.user.id;
                const query = "SELECT b2b_product.product_id, product_name , product_price , cart_id,discount,quantity , sgst,cgst,productImageId FROM b2b_product INNER JOIN b2b_carttable ON b2b_product.product_id = b2b_carttable.product_id AND b2b_carttable.b2b_employee_id = ?;";
                const productResults = await new Promise((resolve, reject) => {
                    db.query(query, [user_id], (err, result) => {
                        if (err) {
                            console.error("Error retrieving data: " + err.message);
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
                            const sql = "SELECT * FROM images WHERE id = ?";
                            db.query(sql, [product.productImageId], (err, result) => {
                                if (err) {
                                    console.error("Database error: " + err);
                                    reject(err);
                                } else {
                                    // console.log(result[0]);
                                    resolve(result[0]);
                                }
                            });
                        });
                    });

                    const images = await Promise.all(imagesPromises);
                    // console.log([productResults, images]);
                    return res.json([productResults, images]);
                } else {
                    return res.json([]); // Return an empty response if no doctor details found
                }
            } catch (error) {
                console.error("Error: ", error);
                return res.status(500).json({
                    error: "Error retrieving product details from the database",
                });
            }

        } else {
            try {
                // const user_id = req.session.user.id;
                const query = "SELECT  product_name , product_price , cart_id,discount,quantity , sgst,cgst,productImageId FROM b2b_product INNER JOIN b2b_carttable ON b2b_product.product_id = b2b_carttable.product_id AND b2b_carttable.sub_admin_id = ?;";
                const productResults = await new Promise((resolve, reject) => {
                    db.query(query, [user_id], (err, result) => {
                        if (err) {
                            console.error("Error retrieving data: " + err.message);
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
                            const sql = "SELECT * FROM images WHERE id = ?";
                            db.query(sql, [product.productImageId], (err, result) => {
                                if (err) {
                                    console.error("Database error: " + err);
                                    reject(err);
                                } else {
                                    // console.log(result[0]);
                                    resolve(result[0]);
                                }
                            });
                        });
                    });

                    const images = await Promise.all(imagesPromises);
                    // console.log([productResults, images]);
                    return res.json([productResults, images]);
                } else {
                    return res.json([]); // Return an empty response if no doctor details found
                }
            } catch (error) {
                console.error("Error: ", error);
                return res.status(500).json({
                    error: "Error retrieving product details from the database",
                });
            }

        }
    } else {
        res.send(null);
    }
})


module.exports = router;