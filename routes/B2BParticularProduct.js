const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

router.get('/b2b/addtocart/:product_id', async (req, res) => {

    // const sql2 = "Select * from product where `product_id` In sql1";
    // console.log(req.params.product_id)
    const product_id = req.params.product_id;
    const query = "Select *  from b2b_product where product_id = ?";
    const productResults = await new Promise((resolve, reject) => {
        db.query(query, [product_id], (err, result) => {
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

        const images = await Promise.all(imagesPromises);
        // console.log(images);
        return res.json([productResults, images]);
    } else {
        return res.json([]); // Return an empty response if no doctor details found
    }

})

//Add to Cart Route
router.post('/b2b/addtocart/:product_id/:quantity', async (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        // console.log(req.session.user)
        if (user.role === 'b2b_employee') {
            // console.log(user.role)

            const product_id = parseInt(req.params.product_id);
            const quantity = parseInt(req.params.quantity);
            const b2b_employee_id = parseInt(req.session.user.id);

            const product = [
                product_id,
                quantity,
                b2b_employee_id
            ]
            // console.log(product)

            const productInfo = await new Promise((resolve, reject) => {
                const findproduct =
                    "select * from b2b_carttable where product_id = ? and b2b_employee_id = ?";
                db.query(
                    findproduct,
                    [req.params.product_id, req.session.user.id],
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                    }
                );
            });
            if (productInfo.length > 0) {
                const sql =
                    "UPDATE b2b_carttable SET quantity = quantity+1 WHERE product_id = ? and b2b_employee_id = ?;";
                db.query(
                    sql,
                    [req.params.product_id, req.session.user.id],
                    (err, data) => {
                        if (err) {
                            console.log(err);
                            return res.json(err);
                        }
                        return res.json(data);
                    }
                );
            } else {
                const sql =
                    "insert into b2b_carttable (`product_id`,`quantity`,`b2b_employee_id`) values (?);";
                db.query(sql, [product], (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.json(err);
                    }
                    return res.json(data);
                });
            }

            

        } else {


            const product_id = parseInt(req.params.product_id);
            const quantity = parseInt(req.params.quantity);
            const sub_admin_id = parseInt(req.session.user.id);

            const product = [
                product_id,
                quantity,
                sub_admin_id
            ]
            // console.log(product)
            const productInfo = await new Promise((resolve, reject) => {
                const findproduct =
                    "select * from b2b_carttable where product_id = ? and sub_admin_id = ?";
                db.query(
                    findproduct,
                    [req.params.product_id, req.session.user.id],
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                    }
                );
            });
            if (productInfo.length > 0) {
                const sql =
                    "UPDATE b2b_carttable SET quantity = quantity+1 WHERE product_id = ? and sub_admin_id = ?;";
                db.query(
                    sql,
                    [req.params.product_id, req.session.user.id],
                    (err, data) => {
                        if (err) {
                            console.log(err);
                            return res.json(err);
                        }
                        return res.json(data);
                    }
                );
            } else {
                const sql =
                    "insert into b2b_carttable (`product_id`,`quantity`,`sub_admin_id`) values (?);";
                db.query(sql, [product], (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.json(err);
                    }
                    return res.json(data);
                });
            }
            
        }
    } else {
        return res.json(null);
    }
});

//add subadmin by b2b-employee
router.post('/b2b/add/subadmin/:subadmin_id', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        // console.log(req.session.user)
        if (user.role === 'b2b_employee') {
            // console.log(user.role)

            const sub_admin_id = parseInt(req.params.subadmin_id);
            // const quantity = parseInt(req.params.quantity);
            const b2b_employee_id = parseInt(req.session.user.id);

            const product = [
                sub_admin_id,
                b2b_employee_id
            ]
            // console.log(product)

            try {
                // Insert the product into the database
                db.query('update b2b_carttable set sub_admin_id = ? where b2b_employee_id=?;', product, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: 'Failed to add the product to CART' });
                    } else {
                        // console.log('Product added successfully');
                        res.status(200).json({ message: 'Product added to CART successfully' });
                    }
                });
            } catch (err) {
                console.error('Error while processing the request: ' + err.message);
                res.status(500).json({ error: 'An error occurred while processing the request' });
            }

        }

    } else {
        return res.json(null);
    }
})



module.exports = router;