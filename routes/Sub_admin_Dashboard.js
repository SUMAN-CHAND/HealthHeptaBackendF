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
let Ordersbyhim = [];
let YearlySales = [];
let monthSales = [];
let YearlyPurchase = [];
let monthPurchase = [];
let expiry_product = [];
let expirying_product = [];
let lowStock = [];

router.get('/sub-admin/dashboard/details', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id
        //This is for no of user in our platfrom
        const sql = "SELECT COUNT(*) as no FROM user_tbl;";

        db.query(sql,   (err, data) => {
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
        const sql1 = "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +0 DAY);";
        const sql2 = "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +1 DAY);";
        const sql3 = "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +2 DAY);";
        const sql4 = "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +3 DAY);";
        const sql5 = "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +4 DAY);";
        const sql6 = "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +5 DAY);";
        const sql7 = "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +6 DAY);";

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

        const sql8 = "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 0 DAY) and payments.payment_status = 'complete' and  order_sub_admin.sub_admin_id = ?";
        const sql9 = "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 1 DAY) and payments.payment_status = 'complete' and  order_sub_admin.sub_admin_id = ?";
        const sql10 = "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 2 DAY) and payments.payment_status = 'complete' and  order_sub_admin.sub_admin_id = ?";
        const sql11 = "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 3 DAY) and payments.payment_status = 'complete' and  order_sub_admin.sub_admin_id = ?";
        const sql12 = "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 4 DAY) and payments.payment_status = 'complete' and  order_sub_admin.sub_admin_id = ?";
        const sql13 = "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 5 DAY) and payments.payment_status = 'complete' and  order_sub_admin.sub_admin_id = ?";
        const sql14 = "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL + 6 DAY) and payments.payment_status = 'complete' and  order_sub_admin.sub_admin_id = ?";
        db.query(sql8, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql9, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql10, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql11, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql12, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql13, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        db.query(sql14, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            salesCount.push(data[0].no);
        })
        // console.log(salesCount)

        // const user_id = req.session.user.id
        //This is for no of Purchase are complete with in this week from our platfrom

        const sql15 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL +0 DAY) and payments.payment_status = 'pending' and  order_sub_admin.sub_admin_id = ?;";
        const sql16 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL +1 DAY) and payments.payment_status = 'pending' and  order_sub_admin.sub_admin_id = ?;";
        const sql17 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL +2 DAY) and payments.payment_status = 'pending' and  order_sub_admin.sub_admin_id = ?;";
        const sql18 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL +3 DAY) and payments.payment_status = 'pending' and  order_sub_admin.sub_admin_id = ?;";
        const sql19 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL +4 DAY) and payments.payment_status = 'pending' and  order_sub_admin.sub_admin_id = ?;";
        const sql20 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL +5 DAY) and payments.payment_status = 'pending' and  order_sub_admin.sub_admin_id = ?;";;
        const sql21 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id   where orders.order_date = DATE_SUB(CURDATE(), INTERVAL +6 DAY) and payments.payment_status = 'pending' and  order_sub_admin.sub_admin_id = ?;";

        db.query(sql15, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql16, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql17, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql18, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql19, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql20, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            purchaseCount.push(data[0].no);
        })
        db.query(sql21, [user_id], (err, data) => {
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
        const sql23 = "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM product INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ?;";


        db.query(sql23, [user_id],   (err, data) => {
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

        const sql24 = "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM product INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ? and product_quantity<=250;";


        db.query(sql24, [user_id],   (err, data) => {
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

        const sql25 = "  SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM product INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ? and expiry < DATE_SUB(CURDATE(), INTERVAL -1 MONTH);";


        db.query(sql25, [user_id],   (err, data) => {
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


        const sql26 = "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM product INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ? and expiry < CURDATE();";


        db.query(sql26, [user_id],   (err, data) => {
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

        const sql27 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ?  and orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 MONTH) and payments.payment_status = 'pending';";


        db.query(sql27, [user_id],   (err, data) => {
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

        const sql28 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ?  and orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 YEAR) and payments.payment_status = 'pending';";


        db.query(sql28, user_id,   (err, data) => {
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


        const sql29 = " SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ?   and orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 MONTH) and payments.payment_status = 'complete';";


        db.query(sql29, [user_id],   (err, data) => {
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

        const sql30 = "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ?  and orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 YEAR) and payments.payment_status = 'complete';";


        db.query(sql30, [user_id],   (err, data) => {
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
        const sql31 = "SELECT COUNT(*) as no FROM orders INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = ?;";


        db.query(sql31, [user_id],   (err, data) => {
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

        //This is for total no of Orders the  sub Admin place in Healthheapta

        const sql50 = "SELECT COUNT(*) as no FROM b2b_orders where sub_admin_id = ?;";


        db.query(sql50, [user_id],   (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else {
                //  res.json("Success");
                Ordersbyhim = data[0];
                // console.log(data)
                // return res.json(data);
            }
        })
        //This is for total Orders  with in a week
        const sql32 = "select COUNT(*) as no from Orders  INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = '?' and  order_date = DATE_SUB(CURDATE(), INTERVAL +0 DAY);";
        const sql33 = "select COUNT(*) as no from Orders INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = '?' and  order_date = DATE_SUB(CURDATE(), INTERVAL +1 DAY);";
        const sql34 = "select COUNT(*) as no from Orders INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = '?' and  order_date = DATE_SUB(CURDATE(), INTERVAL +2 DAY);";
        const sql35 = "select COUNT(*) as no from Orders INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = '?' and  order_date = DATE_SUB(CURDATE(), INTERVAL +3 DAY);";
        const sql36 = "select COUNT(*) as no from Orders INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = '?' and  order_date = DATE_SUB(CURDATE(), INTERVAL +4 DAY);";
        const sql37 = "select COUNT(*) as no from Orders INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = '?' and  order_date = DATE_SUB(CURDATE(), INTERVAL +5 DAY);";
        const sql38 = "select COUNT(*) as no from Orders INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = '?' and  order_date = DATE_SUB(CURDATE(), INTERVAL +6 DAY);";

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
        // console.log(orderCount)
        // return res.json(orderCount);
        // console.log([userno, UserCount, salesCount, purchaseCount, orderCount, stocks, lowStock, expirying_product, expiry_product, monthPurchase, YearlyPurchase, monthSales, YearlySales, Orders]);
        return res.json([userno, UserCount, salesCount, purchaseCount, orderCount, stocks, lowStock, expirying_product, expiry_product, monthPurchase, YearlyPurchase, monthSales, YearlySales, Orders,Ordersbyhim]);



    } else {
        res.status(500).send("data not found")
    }
})


module.exports = router;