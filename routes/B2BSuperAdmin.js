const express = require("express");
const mysql = require('mysql');
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');
// const server = http.createServer(app);
// const io = socketIo(server);
// app.use(session({
//     secret: '1234567890abcdefghijklmnopqrstuvwxyz',
//     resave: true,
//     saveUninitialized: true,
//     // cookie: { secure: false, maxAge: oneDay }
// }));
// // Define the /add-product POST route
router.post('/', (req, res) => {
  const AddedAt = new Date().toISOString().split('T')[0];
  const product = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_quantity: req.body.product_quantity,
    category: req.body.category,
    discount: req.body.discount,
    description: req.body.description,
    manufacturing: req.body.manufacturing,
    expiry: req.body.expiry,
    fromOfMedicine: req.body.fromOfMedicine,
    PackTypeOfMedicine: req.body.PackTypeOfMedicine,
    AddedAt,
    type: req.body.type,
    sgst: req.body.sgst,
    cgst: req.body.cgst,
    productImageId: req.body.productImageId,
  };

  try {
    // Insert the product into the database
    db.query('INSERT INTO b2b_product SET ?', product, (err, result) => {
      if (err) {
        console.error('Error inserting product: ' + err.message);
        res.status(500).json({ error: 'Failed to add the product' });
      } else {
        console.log('Product added successfully');
        res.status(200).json({ message: 'Product added successfully' });
      }
    });
  } catch (err) {
    console.error('Error while processing the request: ' + err.message);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});

//This Router for Getting all Product at a time

router.get('/', async (req, res) => {

  // app.get("/superadmin/product", async (req, res) => {
  // if (req.session.user) {
  try {
    // const user_id = req.session.user.id;
    const query = " select * from b2b_product;";
    const productResults = await new Promise((resolve, reject) => {
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

      const images = await Promise.all(imagesPromises);
      // console.log(images);
      // console.log(productResults, images);
      return res.json([productResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ error: 'Error retrieving product details from the database' });
  }
  // } else {
  //     return res.status(500).send("Data not found");
  // }
  // });
})




module.exports = router;