const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

let userno;
let stocks = [];
var UserCount = [];
var salesCount = [];
var purchaseCount = [];
var orderCount = [];
let Orders = [];
let Service_Provider = [];
let Ordersbyhim = [];
let YearlySales = [];
let monthSales = [];
let YearlyPurchase = [];
let monthPurchase = [];
let expiry_product = [];
let expirying_product = [];
let lowStock = [];

router.get('/super_admin/b2b/dashboard/details', async (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id
        //This is for no of user in our platfrom
        const sql = "SELECT COUNT(*) as no FROM user_tbl;";

        db.query(sql, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                // return res.json(data);
                // console.log(data[0].no)
                userno = data[0].no;
            }
        })


        //This is for no of user are joining with in this week in our platfrom
        // const user_id = req.session.user.id
        const sql1 = "select COUNT(*) as no from sub_admin_details where  createdAt = DATE_SUB(CURDATE(), INTERVAL +0 DAY)";
        const sql2 = "select COUNT(*) as no from sub_admin_details where  createdAt = DATE_SUB(CURDATE(), INTERVAL +1 DAY);";
        const sql3 = "select COUNT(*) as no from sub_admin_details where  createdAt = DATE_SUB(CURDATE(), INTERVAL +2 DAY);";
        const sql4 = "select COUNT(*) as no from sub_admin_details where  createdAt = DATE_SUB(CURDATE(), INTERVAL +3 DAY);";
        const sql5 = "select COUNT(*) as no from sub_admin_details where  createdAt = DATE_SUB(CURDATE(), INTERVAL +4 DAY);";
        const sql6 = "select COUNT(*) as no from sub_admin_details where  createdAt = DATE_SUB(CURDATE(), INTERVAL +5 DAY);";
        const sql7 = "select COUNT(*) as no from sub_admin_details where  createdAt = DATE_SUB(CURDATE(), INTERVAL +6 DAY);";

        db.query(sql1, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            UserCount.push(data[0].no);
        })
        db.query(sql2, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            UserCount.push(data[0].no);
        })
        db.query(sql3, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            UserCount.push(data[0].no);
        })
        db.query(sql4, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            UserCount.push(data[0].no);
        })
        db.query(sql5, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            UserCount.push(data[0].no);
        })
        db.query(sql6, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            UserCount.push(data[0].no);
        })
        db.query(sql7, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            UserCount.push(data[0].no);
        })
        // console.log(UserCount)

        // const user_id = req.session.user.id
        //This is for no of sales are complete  with in this week from our platfrom

        const sql8 = "SELECT  COUNT(*) as no FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id  where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 0 DAY) and b2b_payments.payment_status = 'complete'";
        const sql9 = "SELECT  COUNT(*) as no FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id  where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 1 DAY) and b2b_payments.payment_status = 'complete'";
        const sql10 = "SELECT  COUNT(*) as no FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id  where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 2 DAY) and b2b_payments.payment_status = 'complete'";
        const sql11 = "SELECT  COUNT(*) as no FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id  where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 3 DAY) and b2b_payments.payment_status = 'complete'";
        const sql12 = "SELECT  COUNT(*) as no FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id  where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 4 DAY) and b2b_payments.payment_status = 'complete'";
        const sql13 = "SELECT  COUNT(*) as no FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id  where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 5 DAY) and b2b_payments.payment_status = 'complete'";
        const sql14 = "SELECT  COUNT(*) as no FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id  where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 6 DAY) and b2b_payments.payment_status = 'complete'";
        db.query(sql8, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql9, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql10, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql11, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql12, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql13, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql14, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        // console.log(salesCount)

        // const user_id = req.session.user.id
        //This is for no of Purchase are complete with in this week from our platfrom

        const sql15 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id     where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL +0 DAY) and b2b_payments.payment_status = 'pending'";
        const sql16 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id     where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL +1 DAY) and b2b_payments.payment_status = 'pending'";
        const sql17 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id     where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL +2 DAY) and b2b_payments.payment_status = 'pending'";
        const sql18 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id     where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL +3 DAY) and b2b_payments.payment_status = 'pending'";
        const sql19 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id     where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL +4 DAY) and b2b_payments.payment_status = 'pending'";
        const sql20 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id     where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL +5 DAY) and b2b_payments.payment_status = 'pending'";
        const sql21 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id     where b2b_orders.order_date = DATE_SUB(CURDATE(), INTERVAL +6 DAY) and b2b_payments.payment_status = 'pending'";

        db.query(sql15, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql16, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql17,  (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql18,  (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql19,  (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql20, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql21,  (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        // console.log(purchaseCount[0])
        // return res.json(purchaseCount);
        //This is for total stock with no of product and Price

        // const user_id = req.session.user.id
        const sql23 = "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM b2b_product;";


        db.query(sql23, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                stocks = data[0];
                // console.log(data[0])
                // return res.json(data);
            }
        })

        //This is for total low stock with no of product and Price

        const sql24 = "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM b2b_product where product_quantity<=250;";


        db.query(sql24, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                lowStock = data[0];
                // console.log(data[0])
                // return res.json(data);
            }
        })

        //This is for total expiry product  stock with no of product and Price

        const sql25 = "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM b2b_product where expiry < DATE_SUB(CURDATE(), INTERVAL -1 MONTH);";


        db.query(sql25, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                expirying_product = data[0];
                // console.log(data)
                // return res.json(data);
            }
        })
        //This is for total expiry product  stock with no of product and Price


        const sql26 = "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM b2b_product where expiry < CURDATE();";


        db.query(sql26, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                expiry_product = data[0];
                // console.log(data)
                // return res.json(data);
            }
        })

        //This is for total Monthly Purchase stock with no of product and Price

        const sql27 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_payments.order_id = b2b_orders.id   where b2b_orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 MONTH) and b2b_payments.payment_status = 'pending';";


        db.query(sql27, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                monthPurchase = data[0];
                // console.log(data)
                // return res.json(data);
            }
        })
        //This is for total Yearly Purchase stock with no of product and Price

        const sql28 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  b2b_product INNER JOIN b2b_order_items ON  b2b_product.product_id =  b2b_order_items.product_id INNER JOIN  b2b_orders ON  b2b_orders.id =  b2b_order_items.order_id INNER JOIN  b2b_payments ON  b2b_payments.order_id =  b2b_orders.id where  b2b_orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 YEAR) and  b2b_payments.payment_status = 'pending';";


        db.query(sql28, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                YearlyPurchase = data[0];
                // console.log(data)
                // return res.json(data);
            }
        })

        //This is for total Monthly sales stock with no of product and Price


        const sql29 = " SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM   b2b_product INNER JOIN  b2b_order_items ON b2b_product.product_id =  b2b_order_items.product_id INNER JOIN  b2b_orders ON  b2b_orders.id =  b2b_order_items.order_id INNER JOIN  b2b_payments ON  b2b_payments.order_id =  b2b_orders.id where  b2b_orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 MONTH) and  b2b_payments.payment_status = 'complete';";


        db.query(sql29, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                monthSales = data[0];
                // console.log(data)
            }
        })
        //This is for total Yearly sales stock with no of product and Price

        const sql30 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM   b2b_product INNER JOIN  b2b_order_items ON  b2b_product.product_id =  b2b_order_items.product_id INNER JOIN  b2b_orders ON  b2b_orders.id =  b2b_order_items.order_id INNER JOIN  b2b_payments ON  b2b_payments.order_id =  b2b_orders.id where  b2b_orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 YEAR) and  b2b_payments.payment_status = 'complete';";


        db.query(sql30, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                YearlySales = data[0];
                // console.log(data)
                // return res.json(data);
            }
        })

        //This is for total no of Orders  from HealthHepta
        const sql31 = "SELECT COUNT(*) as no FROM  b2b_orders;";


        db.query(sql31, async (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                Orders = data[0];
                // console.log(data)
                // return res.json(data);
            }
        })


        //This is for total Orders  with in a week
        const sql32 = "select COUNT(*) as no from b2b_orders  where  order_date = DATE_SUB(CURDATE(), INTERVAL +0 DAY);";
        const sql33 = "select COUNT(*) as no from b2b_orders where order_date = DATE_SUB(CURDATE(), INTERVAL +1 DAY);";
        const sql34 = "select COUNT(*) as no from b2b_orders where  order_date = DATE_SUB(CURDATE(), INTERVAL +2 DAY);";
        const sql35 = "select COUNT(*) as no from b2b_orders where  order_date = DATE_SUB(CURDATE(), INTERVAL +3 DAY);";
        const sql36 = "select COUNT(*) as no from b2b_orders where  order_date = DATE_SUB(CURDATE(), INTERVAL +4 DAY);";
        const sql37 = "select COUNT(*) as no from b2b_orders where  order_date = DATE_SUB(CURDATE(), INTERVAL +5 DAY);";
        const sql38 = "select COUNT(*) as no from b2b_orders where  order_date = DATE_SUB(CURDATE(), INTERVAL +6 DAY);";

        db.query(sql32, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            orderCount.push(data[0].no);
        })
        db.query(sql33, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            orderCount.push(data[0].no);
        })
        db.query(sql34, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            orderCount.push(data[0].no);
        })
        db.query(sql35, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            orderCount.push(data[0].no);
        })
        db.query(sql36, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            orderCount.push(data[0].no);
        })
        db.query(sql37, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            orderCount.push(data[0].no);
        })
        db.query(sql38, (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            orderCount.push(data[0].no);
        })

        const sql51 = "SELECT COUNT(*) as no from sub_admin;";

        db.query(sql51, (err, data) => {
            if (err) {
                return res.json(err);
            }
            else {
                //  res.json("Success");
                // console.log(data)
                Service_Provider = data[0];
                // return res.json(data);
            }
        })
        // console.log(orderCount)
        // return res.json(orderCount);
        // console.log([userno, UserCount, salesCount, purchaseCount, orderCount, stocks, lowStock, expirying_product, expiry_product, monthPurchase, YearlyPurchase, monthSales, YearlySales, Orders]);
        return res.json([userno, UserCount, salesCount, purchaseCount, orderCount, stocks, lowStock, expirying_product, expiry_product, monthPurchase, YearlyPurchase, monthSales, YearlySales, Orders, Service_Provider]);



    } else {
        res.status(500).send("data not found")
    }
})


module.exports = router;