const express = require("express");
const router = express.Router();
const db = require('../../DB_Con.js');
const bcrypt = require('bcrypt')
const salt = 10;


// route to handle the POST request to add a partner
router.post('/b2b/emp/addnew/customer', async (req, res) => {
    try {
        const customer = [
          req.body.fullname,
          req.body.phone,
          req.body.landmark,
          req.body.Village,
          req.body.P_O,
          req.body.City,
          req.body.district,
          req.body.state,
          req.body.pin,
        ];
        const createCustomer = await new Promise((resolve, reject) => {
          const sql =
            "insert into b2b_customer (fullname,phone,landmark,Village,P_O,City,district,state,pin_code)values(?);";
          db.query(sql, [customer], (err, result) => {
            if (err) {
              reject(err);
            } else {
              // console.log(result.insertId);
              // console.log('success address')
              resolve(result.insertId);
              return res.json("success");
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
});



//add new product by super admin

router.post("/b2b/emp/quary/product", async (req, res) => {
    const date = new Date().toISOString().split("T")[0];
    const sql =
      "Insert into b2b_product_not_present (`product_name`,`category`,`description`,`AddedAt`,`moleculesName`,`manufacturing_Company_Name`) values(?)";
  
    const values = [
      req.body.product_name,
      req.body.category,
      req.body.description,
      date,
      req.body.manufacturing_Company_Name,
      req.body.moleculesName
    ];
    // console.log(values)
    try {
      db.query(sql, [values], (err, data) => {
        if (err) {
          console.log(err);
          return res.json("Error");
        }
        return res.json("success");
      });
    } catch (error) {
      return res.json(error);
    }
  });

module.exports = router;