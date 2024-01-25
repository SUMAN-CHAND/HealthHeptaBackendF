const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

router.post('/b2b/search', async (req, res) => {
    const likefiled = req.body.input[0];
    console.log(likefiled)
    const input = `%${likefiled}%`
   

    try {
        // const user_id = req.session.user.id;
        // const query = "SELECT  sub_admin.id ,product_sub_admin.product_id as id ,name , address_sub_admin.address_id  ,City,product_name,typeOfMedicine,product.product_id,product_price,discount,description,phone,productImageId FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id INNER JOIN product_sub_admin ON sub_admin.id = product_sub_admin.sub_admin_id INNER JOIN product ON product_sub_admin.product_id = product.product_id where product.product_name Like ? Or address.city Like ? Or name Like  ?  Or typeOfMedicine Like ?;";
        const query = "SELECT  * from b2b_product where b2b_product.product_name Like ? Or category Like ? Or fromOfMedicine Like ? Or PackTypeOfMedicine Like ? Or manufacturing_Company_Name Like ?  Or type Like ?;";
        const productResults = await new Promise((resolve, reject) => {
            db.query(query, [input, input, input, input,input,input], (err, result) => {
                if (err) {
                    console.error('Error retrieving data: ' + err.message);
                    reject(err);
                } else {
                    // console.log('Data retrieved successfully');
                    // console.log(result)
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
            console.log([productResults, images]);
            return res.json([productResults, images]);
        } else {
            return res.json([]); // Return an empty response if no doctor details found
        }
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({ error: 'Error retrieving product details from the database' });
    }
   
});



module.exports = router;