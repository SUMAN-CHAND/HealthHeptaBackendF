const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;
const db = require("./DB_Con.js");
const bodyParser = require("body-parser"); // Configure Socket.io
const nodemailer = require("nodemailer");
// const { multer } = require('multer')
// const { path } = require('path')
// const express = require('express');
// const mysql = require('mysql');
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const socketIo = require('socket.io');
const http = require("http");
const twilio = require("twilio");

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
// const diff = require("dialogflow-fulfillment");
const webhook = require("./routes/webhook.js");
const addProduct = require("./routes/B2BSuperAdmin.js");
const particularProduct = require("./routes/B2BParticularProduct.js");
const b2b_cartDetails = require("./routes/B2BCartDetails.js");
const b2b_profile = require("./routes/B2BProfile.js");
const b2b_order_place = require("./routes/B2BOrderPlace.js");
const b2b_cart_profile = require("./routes/B2BCartProfile.js");
const b2b_search = require("./routes/B2BSearchFuntion.js");
const sub_admin_dashboard = require("./routes/sub_admin_Dashboard.js");
const b2b_superadmin_dashboard = require("./routes/B2b_Super_Dashboard.js");
const b2b_superadmin_home = require("./routes/B2B_Super_Admin_Home.js");
const showProduct = require("./routes/B2B_Get_All_Product_by_Catagory.js");
const partner_signup = require("./routes/Partner routes/Partner_Signup.js");
const partner_details = require("./routes/Partner routes/Partner_Details.js");
const partner_commission = require("./routes/Partner routes/Partner_Commission.js");
const ShowDocuments = require("./routes/ShowDocuments.js");
const delivery_partner_signup = require("./routes/Delivery Partner Routes/Delivery_Partner_SignUp.js");
const delivery_partner_details = require("./routes/Delivery Partner Routes/Delivery_Partner_Details.js");
const orderoperation = require("./routes/Delivery Partner Routes/OrderOperation.js");
const delivery_partner_commission = require("./routes/Delivery Partner Routes/DeliveryPartnerCommission.js");
const myMap = require("./routes/Map/MyMap.js");
// const videocall = require('./routes/VideoCallBackEnd.js')
const e = require("express");
const { error } = require("console");

// // *Middleware for HTTP to HTTPS redirection*
// app.use((req, res, next) => {
//     if (req.secure) {
//         // Already on HTTPS, continue processing
//         next();
//     } else {
//         // Redirect to HTTPS version of the same URL
//         res.redirect(301, `https://${req.headers.host}${req.url}`);
//     }
// });

// server.listen(3000); // Use your desired port.

app.use(
  cors({
    origin: ["https://localhost:3000"],
    // origin: ["http://localhost:3000"],
    methods: ["POST", "PUT", "GET", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders:
      "origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
const oneDay = 1000 * 60 * 60 * 24;
// const server = http.createServer(app);
// const io = socketIo(server);
app.use(
  session({
    secret: "1234567890abcdefghijklmnopqrstuvwxyz",
    // resave: true,
    resave: false,
    saveUninitialized: true,
    proxy: true,
  })
);

app.use("/uploads", express.static("uploads"));
// ***************************************************************************************00000000000000000000000000000000000000000000

// Create a nodemailer transporter
// const transporter = nodemailer.createTransport({
//     service: 'your-email-service-provider',
//     auth: {
//         user: 'your-email@example.com',
//         pass: 'your-email-password',
//     },
// });

// // Function to send order notifications
// const sendOrderNotification = (recipientEmail, message) => {
//     const mailOptions = {
//         from: 'your-email@example.com',
//         to: recipientEmail,
//         subject: 'New Order Notification',
//         text: message,
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// };

// // Example usage
// const userOrder = {
//     user: 'User123',
//     pharmacyAdminEmail: 'pharmacy-admin@example.com',
//     superAdminEmail: 'super-admin@example.com',
// };

// // Send notifications to pharmacy admin and super admin
// const orderMessage = `New order from ${userOrder.user}`;
// sendOrderNotification(userOrder.pharmacyAdminEmail, orderMessage);
// sendOrderNotification(userOrder.superAdminEmail, orderMessage);

const user = {};

// var loggedIn = false
// app.get('/',(req,res)=>{
//     req.session.isAuth = true
//     console.log(req.session);
//     res.send("Hi")
// })

// app.get('/', (req, res) => {
//     if (req.session.view) {

//         // The next time when user visits,
//         // he is recognized by the cookie
//         // and variable gets updated.
//         req.session.view++;
//         res.send("You visited this page for "
//             + req.session.view + " times");
//     }
//     else {

//         // If user visits the site for
//         // first time
//         req.session.view = 1;
//         res.send("You have visited this page"
//            + " for first time ! Welcome....");
//     }
// })
// const storage =  multer.diskStorage({
//     destination:(req,file,cb)=>{
//         db(null,'public/image')
//     },
//     fileName:(req,file,cb)=>{
//         db(null,file.fieldname+"_",+Date.now+path.extname(file.originalname));
//     }
// })

//   const upload = multer({ storage: storage })
// const  upload = multer({
//     storage: storage
// })
// app.post('/upload',upload.single('image'),(req,res)=>{
//     console.log(req.file)
// })

app.use("/", webhook); // Use the router for chat app
app.use("/superadmin/b2b/addproduct", addProduct); // Use the router to add product

app.use("/b2b/product", addProduct); // Use the router to see Product
app.use("/", showProduct); // Use the router to see Product
app.use("/", showProduct); // Use the router to see Product
app.use("/", showProduct); // Use the router to see Product
app.use("/", particularProduct); // Use the router to see Particular  Product
app.use("/", particularProduct); // Use the router to add to cart one Product
app.use("/", b2b_cartDetails); // Use the router to see cart details
app.use("/", b2b_profile); // Use the router to see Profile
app.use("/", b2b_order_place); // Use the router to Place the Order
app.use("/", b2b_order_place); // Use the router to cancle the orders
app.use("/", b2b_cart_profile); // Use the router to see Profile under cart
app.use("/", b2b_search); // Use the router to search product in B2B
app.use("/", sub_admin_dashboard); // Use the router to search productin B2B
app.use("/", b2b_superadmin_dashboard); // Use the router to search productin B2B
app.use("/", b2b_superadmin_home); // Use the router to search productin B2B
app.use("/", partner_signup); // Use this router to Sign up Partner
app.use("/", partner_signup); // Use this router to Sign up Partner
app.use("/", partner_details); // Use this router to Sign up Partner
app.use("/", partner_commission); // Use this router to Sign up Partner
app.use("/", ShowDocuments); // Use this router see documents
app.use("/", delivery_partner_signup); // Use this router to Sign up,login,complete profile for Delivery Partners
app.use("/", delivery_partner_details); // Use this router to see Profile details of Delivery Partner
app.use("/", orderoperation); // Use this router to see order status
app.use("/", delivery_partner_commission); // Use this for delivery persion commission
app.use("/", myMap); // Use this router for Map
// app.use('/', videocall); // Use this router see documents

app.get("/locations", async (req, res) => {
  const sql = "select name from locations;";
  try {
    db.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

/////****Search suggetion
app.get("/search", async (req, res) => {
  // const sql = 'select * from product;';
  const sql = "select product_id as id,product_name as name from product;";
  try {
    const productResults = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });
    // const allLabTestsQuery = 'SELECT * FROM hh_dev_db.laboratory_tests_details;;';
    const allLabTestsQuery =
      "select Test_id as id,Test_Name as name from laboratory_tests_details;";

    const labResults = await new Promise((resolve, reject) => {
      db.query(allLabTestsQuery, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });
    // const alldoctorTestsQuery = 'SELECT * FROM hh_dev_db.doctors_details;';
    const alldoctorTestsQuery =
      "select id as id,doc_name as name,specializes as name from doctors_details;";

    const DoctorResults = await new Promise((resolve, reject) => {
      db.query(alldoctorTestsQuery, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });
    let allResult = [].concat(productResults);
    allResult = allResult.concat(labResults);
    allResult = allResult.concat(DoctorResults);
    // console.log(allResult)
    return res.json(allResult);
  } catch (error) {
    console.log(error);
  }
});
/////*****B2B Search suggetion
app.get("/b2b/search", async (req, res) => {
  // const sql = 'select * from product;';
  const sql = "select product_id as id,product_name as name from b2b_product;";
  try {
    const productResults = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });

    return res.json(productResults);
  } catch (error) {
    console.log(error);
  }
});
// app.get('/doctorsearch', async (req, res) => {
// app.post('/search', (req, res) => {
//     const query = 'SELECT * FROM doctors_details WHERE 1 = 1';
//     const params = [];

//     if (req.query.name) {
//         query += ' AND name LIKE ?';
//         params.push("%" + req.query.name + "%");
//     }

//     if (req.query.specialist) {
//         query += ' AND specialist LIKE ?';
//         params.push("%" + req.query.specialist + "%");
//     }

//     if (req.query.clinic) {
//         query += ' AND clinic LIKE ?';
//         params.push("%" + req.query.clinic + "%");
//     }

//     if (req.query.pincode) {
//         query += ' AND pincode = ?';
//         params.push(req.query.pincode);
//     }

//     db.query(query, params, (err, results) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send({ message: 'Error searching for doctors' });
//         } else {
//             console.log(results)
//             res.json({ doctors: results });
//         }
//     });
// });

// const mysql = require('mysql');
// const express = require('express');

// const app = express();

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'username',
//   password: 'password',
//   database: 'database_name'
// });
// Search doctor in modal
app.post("/doctorsearch", async (req, res) => {
  //   const { name, specialist, clinic, pincode } = req.query;
  const likefiled = req.body.input[0];
  // console.log(likefiled)
  const input = `%${likefiled}%`;

  try {
    const query = `
    SELECT doctors_details.id,doc_name,doc_desc,location,clinic,clinic_id,clinic_desc,type,doctor_imageId,address.pin  from doctors_details
    INNER JOIN sub_admin ON sub_admin.id = doctors_details.clinic_id 
    INNER JOIN address_sub_admin ON address_sub_admin.sub_admin_id = sub_admin.id 
    INNER JOIN address ON address_sub_admin.sub_admin_id = address.address_id   
    where doc_name Like ?
    Or doc_desc Like ?
    Or specializes Like ? 
    Or location Like ? 
     Or pin Like ?
    Or clinic Like ?  
    Or type Like ?;
   `;

    const doctorResults = await new Promise((resolve, reject) => {
      db.query(
        query,
        [input, input, input, input, input, input, input],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send({ message: "Error searching for doctors" });
          } else {
            // console.log(results)
            resolve(results);
          }
        }
      );
    });

    if (doctorResults.length > 0) {
      const imagesPromises = doctorResults.map((doctor) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [doctor.doctor_imageId], (err, result) => {
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
      // console.log(doctorResults, images);
      return res.json([doctorResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving Doctor details from the database" });
  }
});

//Search Labs in Modal
app.post("/labsearch", async (req, res) => {
  //   const { name, specialist, clinic, pincode } = req.query;
  const likefiled = req.body.input[0];
  // console.log(likefiled)
  const input = `%${likefiled}%`;

  try {
    const query = `
        SELECT Test_id, Test_Name ,name,role,Test_Desc,Clinic_id,test_imageId,Price,address.pin from  laboratory_tests_details
        INNER JOIN sub_admin ON sub_admin.id = laboratory_tests_details.clinic_id 
        INNER JOIN address_sub_admin ON address_sub_admin.sub_admin_id = sub_admin.id 
        INNER JOIN address ON address_sub_admin.sub_admin_id = address.address_id   
        where Test_Name Like ?
        Or Test_Desc Like ?
        Or name Like ?
        Or role Like ?
         Or pin Like ?
        Or city Like ?;
   `;

    const labResults = await new Promise((resolve, reject) => {
      db.query(
        query,
        [input, input, input, input, input, input, input],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send({ message: "Error searching for doctors" });
          } else {
            // console.log(results)
            resolve(results);
          }
        }
      );
    });

    if (labResults.length > 0) {
      const imagesPromises = labResults.map((lab) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [lab.test_imageId], (err, result) => {
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
      // console.log(labResults, images);
      return res.json([labResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving Doctor details from the database" });
  }
});
//Search Labs in Modal
app.post("/clinic-test", async (req, res) => {
  //   const { name, specialist, clinic, pincode } = req.query;
  const likefiled = req.body.input;
  console.log(req.body);
  const input = `%${likefiled}%`;

  try {
    const query = `
        SELECT sub_admin.id,name,Landmark,SubAdminImageId,address.pin  from sub_admin
        INNER JOIN address_sub_admin ON address_sub_admin.sub_admin_id = sub_admin.id 
        INNER JOIN sub_admin_details ON sub_admin_details.sub_admin_id = sub_admin.id 
        INNER JOIN address ON address_sub_admin.sub_admin_id = address.address_id   
        where name Like ?
        Or Landmark Like ?
        and role = 'Clinic'
        and permission = 'Approve';`;

    const clinicResult = await new Promise((resolve, reject) => {
      db.query(query, [input, input], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message: "Error searching for doctors" });
        } else {
          // console.log(results)
          resolve(results);
        }
      });
    });

    if (clinicResult.length > 0) {
      const imagesPromises = clinicResult.map((clinic) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [clinic.SubAdminImageId], (err, result) => {
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
      // console.log(clinicResult, images);
      return res.json([clinicResult, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving Doctor details from the database" });
  }
});

//search doctor by chose specializes

// app.post('/doctorspecializes', async (req, res) => {

//     const specializes = req.body.specializes; // assuming 'specialization' is the property

//     console.log(req.body)
//     console.log(specializes)
//     const searchCriteria = [];
//     const queryParams = [];

//     if (req.body.specialization) {
//         searchCriteria.push('specializes Like ?');
//         queryParams.push(`%${req.body.specialization}%`);
//     }

//     if (req.body.location) {
//         searchCriteria.push('location Like ?');
//         queryParams.push(`%${req.body.location}%`);
//     }
//     if (req.body.doc_name) {
//         searchCriteria.push('doc_name Like ?');
//         queryParams.push(`%${req.body.doc_name}%`);
//     }
//     if (req.body.doc_desc) {
//         searchCriteria.push('doc_desc Like ?');
//         queryParams.push(`%${req.body.doc_desc}%`);
//     }
//     if (req.body.pin) {
//         searchCriteria.push('pin Like ?');
//         queryParams.push(`%${req.body.pin}%`);
//     }
//     if (req.body.clinic) {
//         searchCriteria.push('clinic Like ?');
//         queryParams.push(`%${req.body.clinic}%`);
//     }
//     if (req.body.type) {
//         searchCriteria.push('type Like ?');
//         queryParams.push(`%${req.body.type}%`);
//     }
//     console.log(searchCriteria)
//     console.log(queryParams)

//     // Add other fields with 'Like ?', '%...?%' pattern like above

//     const sql = `
// SELECT doctors_details.id, doc_name, doc_desc, location, clinic, end_time, start_time, day_of_week,clinic_id,clinic_desc,type,doctor_imageId, address.pin from doctors_details
// INNER JOIN sub_admin ON sub_admin.id = doctors_details.clinic_id
// INNER JOIN address_sub_admin ON address_sub_admin.sub_admin_id = sub_admin.id
// INNER JOIN address ON address_sub_admin.sub_admin_id = address.address_id
// INNER JOIN hospitals ON hospitals.id = address.hospital_id // *Replace hospitals with your actual table name*
// WHERE ${searchCriteria.join(' OR ')}`;

//     console.log(sql); // This will print the complete SQL query before sending it to the database.

//     db.query(sql, queryParams, (err, results) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send({ message: 'Error searching for doctors' });
//         } else {
//             console.log(results)
//             resolve(results);
//         }
//     });

//     //     const searchCriteria = [];
//     //     const queryParams = [];

//     //     if (req.body.specialization) {
//     //         searchCriteria.push('specializes Like ?');
//     //         queryParams.push(`%${req.body.specialization}%`);
//     //     }

//     //     if (req.body.location) {
//     //         searchCriteria.push('location Like ?');
//     //         queryParams.push(`%${req.body.location}%`);
//     //     }
//     //     if (req.body.doc_name) {
//     //         searchCriteria.push('doc_name Like ?');
//     //         queryParams.push(`%${req.body.doc_name}%`);
//     //     }
//     //     if (req.body.doc_desc) {
//     //         searchCriteria.push('doc_desc Like ?');
//     //         queryParams.push(`%${req.body.doc_desc}%`);
//     //     }
//     //     if (req.body.pin) {
//     //         searchCriteria.push('pin Like ?');
//     //         queryParams.push(`%${req.body.pin}%`);
//     //     }
//     //     if (req.body.clinic) {
//     //         searchCriteria.push('clinic Like ?');
//     //         queryParams.push(`%${req.body.clinic}%`);
//     //     }
//     //     if (req.body.type) {
//     //         searchCriteria.push('type Like ?');
//     //         queryParams.push(`%${req.body.type}%`);
//     //     }

//     //     // Add other fields with 'Like ?', '%...?%' pattern like above

//     //     const sql = `
//     // SELECT doctors_details.id, doc_name, doc_desc, location, clinic, end_time, start_time, day_of_week,clinic_id,clinic_desc,type,doctor_imageId, address.pin from doctors_details
//     // INNER JOIN sub_admin ON sub_admin.id = doctors_details.clinic_id
//     // INNER JOIN address_sub_admin ON address_sub_admin.sub_admin_id = sub_admin.id
//     // INNER JOIN address ON address_sub_admin.sub_admin_id = address.address_id
//     // WHERE  ${searchCriteria.join(' OR ')} `;

//     //     console.log(sql); // This will print the complete SQL query before sending it to the database.

//     //     db.query(sql, queryParams, (err, results) => {
//     //         if (err) {
//     //             console.error(err);
//     //             res.status(500).send({ message: 'Error searching for doctors' });
//     //         } else {
//     //             console.log(results)
//     //             resolve(results);
//     //         }
//     //     });

// });
app.post("/doctorspecializes", async (req, res) => {
  //   const { name, specialist, clinic, pincode } = req.query;
  // const likefiled = req.body;
  const likefiled = req.body.specializes; // assuming 'specialization' is the property
  // console.log(req.body)
  // console.log(likefiled)
  const input = `%${likefiled}%`;

  try {
    const query = `
    SELECT doctors_details.id,doc_name,doc_desc,location,clinic,clinic_id,clinic_desc,type,doctor_imageId,address.pin  from doctors_details
    INNER JOIN sub_admin ON sub_admin.id = doctors_details.clinic_id 
    INNER JOIN address_sub_admin ON address_sub_admin.sub_admin_id = sub_admin.id 
    INNER JOIN address ON address_sub_admin.sub_admin_id = address.address_id   
    where doc_name Like ?
    Or doc_desc Like ?
    Or specializes Like ? 
    Or location Like ? 
     Or pin Like ?
    Or clinic Like ?  
    Or type Like ?;
   `;

    const doctorResults = await new Promise((resolve, reject) => {
      db.query(
        query,
        [input, input, input, input, input, input, input],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send({ message: "Error searching for doctors" });
          } else {
            // console.log(results)
            resolve(results);
          }
        }
      );
    });

    if (doctorResults.length > 0) {
      const imagesPromises = doctorResults.map((doctor) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [doctor.doctor_imageId], (err, result) => {
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
      // console.log(doctorResults, images);
      return res.json([doctorResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving Doctor details from the database" });
  }
});

// const sql = 'select * from doctors_details;';
// try {
//     db.query(sql, (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         else {

//             // console.log(data)
//             return res.json(data);
//         }
//     })
// } catch (error) {
//     console.log(error)
// }
// })
app.get("/doctorsearch/:id", async (req, res) => {
  const doctor_id = Number(req.params.id);

  try {
    // const user_id = req.session.user.id;
    const query = "select * from doctors_details where id = ?;";
    const doctorResults = await new Promise((resolve, reject) => {
      db.query(query, [doctor_id], (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (doctorResults.length > 0) {
      const imagesPromises = doctorResults.map((doctor) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [doctor.doctor_imageId], (err, result) => {
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
      // console.log(images);
      return res.json([doctorResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }
});
// get doctor_id, day_of_week, start_time, end_time from doctor_regular_time with doctor_id
app.get("/doctortime/:id", async (req, res) => {
  const doctor_id = Number(req.params.id);
  const sql = `SELECT * FROM doctor_regular_time WHERE doctor_id = ${db.escape(
    doctor_id
  )}`;
  try {
    db.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data)
        return res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
// get doctor_id, day_of_week, start_time, end_time from doctor_regular_time with doctor_id
app.get("/doctor/:id", async (req, res) => {
  const doctor_id = Number(req.params.id);
  const sql = `SELECT * FROM doctors_timetable WHERE doctor_id = ?`;
  try {
    db.query(sql, [doctor_id], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data)
        return res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// appointment booking insert the data to booking table
// INSERT INTO booking (doctor_id, appoint_date, appoint_time, name, ph_number) VALUES (1, '2023-10-20', '10:00 AM', 'John Doe', 1234567890);
// app.post('/doctorbook', async (req, res) => {
//     console.log(req.body);
//     const { doctor_id, appoint_date, appoint_time, name, ph_number } = req.body;
//     const sql = `INSERT INTO booking (doctor_id, appoint_date, appoint_time, name, ph_number) VALUES (?, ?, ?, ?, ?)`;
//     try {
//         db.query(sql, [doctor_id, appoint_date, appoint_time, name, ph_number], (err, data) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {

//                 // console.log(data)
//                 return res.json(data);
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }

// });

// appointment booking insert the data to booking table

// Twilio account details
const accountSid = "AC766f2d6962580495f8535d0ee1986823";
const authToken = "8ff28c638192441ae670d8d5af94d382";
const client = new twilio(accountSid, authToken);
app.post("/doctorbook", async (req, res) => {
  if (req.session.user) {
    try {
      const user = req.session.user;
      let doctor;
      // console.log(user);
      if (user.role === "customer") {
        const {
          doctor_id,
          appoint_date,
          appoint_time,
          name,
          ph_number,
          clinic_id,
          user_id,
          type_of_visite,
        } = req.body;
        const sql1 = `SELECT * FROM doctors_details WHERE id = ${db.escape(
          doctor_id
        )}`;
        try {
          db.query(sql1, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(data)
              doctor = data;
              // console.log(data)
              // console.log(data[0].Phone_number)
              const Phone_number = `+91${data[0].Phone_number}`;
              //    console.log(Phone_number)
              // console.log(req.body)
              const sql = `INSERT INTO appointmenttable (doctor_id, appoint_date, appoint_time, name, ph_number, clinic_id, user_id,AppointmentStatus,role,type_of_visite) VALUES (?, ?, ?, ?, ?, ?, ?,'apply','customer',?)`;
              try {
                db.query(
                  sql,
                  [
                    doctor_id,
                    appoint_date,
                    appoint_time,
                    name,
                    ph_number,
                    clinic_id,
                    user_id,
                    type_of_visite,
                  ],
                  async (err, data) => {
                    if (err) {
                      console.log(err);
                      return res
                        .status(500)
                        .json({ error: "Failed to book appointment" });
                    } else {
                      // The appointment was successfully booked
                      try {
                        await client.messages.create({
                          to: Phone_number,
                          from: +12059316656,
                          body: `Appointment booked by ${name} on ${appoint_date} at ${appoint_time}.,`,
                        });
                        // console.log("Message Send");
                      } catch (error) {
                        console.error(error);
                      }
                      return res
                        .status(200)
                        .json({ message: "Appointment booked successfully" });
                    }
                  }
                );
              } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "An error occurred" });
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        const {
          doctor_id,
          appoint_date,
          appoint_time,
          name,
          ph_number,
          clinic_id,
          user_id,
          type_of_visite,
        } = req.body;
        // console.log(req.body)
        const sql = `INSERT INTO appointmenttable (doctor_id, appoint_date, appoint_time, name, ph_number, clinic_id, user_id,AppointmentStatus,role,type_of_visite) VALUES (?, ?, ?, ?, ?, ?, ?,'apply','partner',?)`;

        try {
          const appoimentBook = await new Promise((resolve, reject) => {
            db.query(
              sql,
              [
                doctor_id,
                appoint_date,
                appoint_time,
                name,
                ph_number,
                clinic_id,
                user_id,
                type_of_visite,
              ],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .json({ error: "Failed to book appointment" });
                } else {
                  resolve(result.insertId);
                  // The appointment was successfully booked
                  // return res.status(200).json({ message: 'Appointmxent booked successfully' });
                }
              }
            );
          });

          // Get the Commission from DB
          const commission = await new Promise((resolve, reject) => {
            const sql1 =
              "select * from partner_services where service_type = 'Appoiment Book';";
            db.query(sql1, (err, rows) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
            });
          });
          // console.log(commission);
          const addOrderToPartner = await new Promise((resolve, reject) => {
            const sql2 =
              "INSERT INTO partner_commision (partner_id, service_type,order_id, commision_type,commision) VALUES (?,'Appoiment Book' ,?, ?,?);";
            db.query(
              sql2,
              [
                user_id,
                appoimentBook,
                commission[0].commision_type,
                commission[0].commision,
              ],
              (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result.insertId); // Get the newly inserted order ID
                }
              }
            );
          });
          return res
            .status(200)
            .json({ message: "Appointmxent booked successfully" });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: "An error occurred" });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  } else {
    res.status(404).send("Data not found");
  }
});

//Lab booking
app.post("/labbook", async (req, res) => {
  if (req.session.user) {
    try {
      const user = req.session.user;
      const user_id = user.id;
      let doctor;
      // console.log(req.body)

      // console.log(user);
      if (user.role === "customer") {
        const {
          Test_id,
          appoint_date,
          appoint_time,
          name,
          ph_number,
          gender,
          sample_collection,
          payment,
        } = req.body[0];
        const { clinic_id } = req.body[1];
        // const { user_id } = req.body[2];
        // console.log(req.body[1])
        // console.log(user_id)
        const sql1 = `SELECT * FROM sub_admin WHERE id = ?`;
        try {
          db.query(sql1, [req.body[1]], async (err, data) => {
            if (err) {
              console.log(err);
            } else {
              const date = new Date()
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "");

              const total_amount = req.body[3];
              // const payment_type = req.body.payment;
              // console.log(data)
              doctor = data;
              // console.log(data)
              // console.log(data[0].phone)
              const Phone_number = `+91${data[0].phone}`;
              //    console.log(Phone_number)
              // console.log(req.body)
              const sql = `INSERT INTO labtestbookedtable (Test_id, appoint_date, appoint_time, name, ph_number, clinic_id, user_id,LabTestStatus,role,gender,sample_collection) VALUES (?, ?, ?, ?, ?, ?, ?,'apply','customer',?,?)`;
              try {
                const labBooking = await new Promise((resolve, reject) => {
                  db.query(
                    sql,
                    [
                      Test_id,
                      appoint_date,
                      appoint_time,
                      name,
                      ph_number,
                      req.body[1],
                      user_id,
                      gender,
                      sample_collection,
                    ],
                    async (err, result) => {
                      if (err) {
                        console.log(err);
                        return res
                          .status(500)
                          .json({ error: "Failed to book appointment" });
                      } else {
                        resolve(result.insertId); // Get the newly inserted order ID
                        // The appointment was successfully booked
                        // try {
                        //     await client.messages.create({
                        //         to: Phone_number,
                        //         from: +12059316656,
                        //         body: `Appointment booked by ${name} on ${appoint_date} at ${appoint_time}.,`
                        //     });
                        //     console.log("Message Send");
                        // } catch (error) {
                        //     console.error(error);
                        // }
                        // return res.status(200).json({ message: 'Appointment booked successfully' });
                      }
                    }
                  );
                });

                // Insert payment method
                const createPayment = await new Promise((resolve, reject) => {
                  const sql4 =
                    "INSERT INTO payments (labbooking_id, payment_date,total_amount,payment_status,payment_type,service_type) VALUES (?, ?,?,?,?,'Lab Book');";
                  db.query(
                    sql4,
                    [labBooking, date, total_amount, "pending", payment],
                    (err, result) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(result);
                      }
                    }
                  );
                });
                // db.query(sql, [Test_id, appoint_date, appoint_time, name, ph_number, req.body[1], user_id, gender, sample_collection], async (err, data) => {
                //     if (err) {
                //         console.log(err);
                //         return res.status(500).json({ error: 'Failed to book appointment' });
                //     } else {

                //         // The appointment was successfully booked
                //         // try {
                //         //     await client.messages.create({
                //         //         to: Phone_number,
                //         //         from: +12059316656,
                //         //         body: `Appointment booked by ${name} on ${appoint_date} at ${appoint_time}.,`
                //         //     });
                //         //     console.log("Message Send");
                //         // } catch (error) {
                //         //     console.error(error);
                //         // }
                //         return res.status(200).json({ message: 'Appointment booked successfully' });
                //     }
                // });
                return res
                  .status(200)
                  .json({ message: "Appointment booked successfully" });
              } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "An error occurred" });
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        const date = new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "");

        const total_amount = req.body[3];
        // const payment_type = req.body.payment;

        const {
          Test_id,
          appoint_date,
          appoint_time,
          name,
          ph_number,
          gender,
          sample_collection,
          payment,
        } = req.body[0];
        const { clinic_id } = req.body[1];
        // const { user_id } = req.body[2];
        // console.log(req.body[1])
        // console.log(user_id)
        const sql1 = `SELECT * FROM sub_admin WHERE id = ?`;
        try {
          db.query(sql1, [req.body[1]], async (err, data) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(data)
              doctor = data;
              // console.log(data)
              // console.log(data[0].phone)
              const Phone_number = `+91${data[0].phone}`;
              //    console.log(Phone_number)
              // console.log(req.body)
              const sql = `INSERT INTO labtestbookedtable (Test_id, appoint_date, appoint_time, name, ph_number, clinic_id, user_id,LabTestStatus,role,gender,sample_collection) VALUES (?, ?, ?, ?, ?, ?, ?,'apply','partner',?,?)`;
              try {
                const labBooking = await new Promise((resolve, reject) => {
                  db.query(
                    sql,
                    [
                      Test_id,
                      appoint_date,
                      appoint_time,
                      name,
                      ph_number,
                      req.body[1],
                      user_id,
                      gender,
                      sample_collection,
                    ],
                    async (err, result) => {
                      if (err) {
                        console.log(err);
                        return res
                          .status(500)
                          .json({ error: "Failed to book appointment" });
                      } else {
                        resolve(result.insertId); // Get the newly inserted order ID
                        // The appointment was successfully booked
                        // try {
                        //     await client.messages.create({
                        //         to: Phone_number,
                        //         from: +12059316656,
                        //         body: `Appointment booked by ${name} on ${appoint_date} at ${appoint_time}.,`
                        //     });
                        //     console.log("Message Send");
                        // } catch (error) {
                        //     console.error(error);
                        // }
                        // return res.status(200).json({ message: 'Appointment booked successfully' });
                      }
                    }
                  );
                });

                // Insert payment method
                const createPayment = await new Promise((resolve, reject) => {
                  const sql4 =
                    "INSERT INTO payments (labbooking_id, payment_date,total_amount,payment_status,payment_type,service_type) VALUES (?, ?,?,?,?,'Lab Book');";
                  db.query(
                    sql4,
                    [labBooking, date, total_amount, "pending", payment],
                    (err, result) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(result);
                      }
                    }
                  );
                });

                // Get the Commission from DB
                const commission = await new Promise((resolve, reject) => {
                  const sql1 =
                    "select * from partner_services where service_type = 'Lab Book';";
                  db.query(sql1, (err, rows) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(rows);
                    }
                  });
                });
                // console.log(commission);
                const addOrderToPartner = await new Promise(
                  (resolve, reject) => {
                    const sql2 =
                      "INSERT INTO partner_commision (partner_id, service_type,order_id, commision_type,commision) VALUES (?,'Lab Book' ,?, ?,?);";
                    db.query(
                      sql2,
                      [
                        user_id,
                        labBooking,
                        commission[0].commision_type,
                        commission[0].commision,
                      ],
                      (err, result) => {
                        if (err) {
                          reject(err);
                        } else {
                          resolve(result.insertId); // Get the newly inserted order ID
                        }
                      }
                    );
                  }
                );
                return res
                  .status(200)
                  .json({ message: "Appointment booked successfully" });
              } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "An error occurred" });
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  } else {
    res.status(404).send("Data not found");
  }
});

// Reschedule booking to booking table
app.post("/reschedule/:appoiment_id", async (req, res) => {
  // const appoiment_id = req.params.appoiment_id;
  const appoiment_id = Number(req.params.appoiment_id);
  console.log(appoiment_id);
  console.log(req.params);
  // const { doctor_id, appoint_date, appoint_time } = req.body;
  const ph_number = Number(req.body.ph_number);
  const appoint_date = req.body.appoint_date;
  const appoint_time = req.body.appoint_time;
  // UPDATE booking SET appoint_date = "2023-10-21", appoint_time = "11:25 AM" WHERE ph_number = 6290232268;

  const sql = `UPDATE appointmenttable SET appoint_date_re = ?, appoint_time_re = ? , AppointmentStatus = ? WHERE id = ?`;
  try {
    db.query(
      sql,
      [appoint_date, appoint_time, "request_reschedule", appoiment_id],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          //   console.log(data)
          return res.json(data);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});

// Reschedule Lab booking to booking table
app.post("/reschedule/lab/:appoiment_id", async (req, res) => {
  // const appoiment_id = req.params.appoiment_id;
  const appoiment_id = Number(req.params.appoiment_id);
  console.log(appoiment_id);
  console.log(req.params);
  // const { doctor_id, appoint_date, appoint_time } = req.body;
  const ph_number = Number(req.body.ph_number);
  const appoint_date = req.body.appoint_date;
  const appoint_time = req.body.appoint_time;
  // UPDATE booking SET appoint_date = "2023-10-21", appoint_time = "11:25 AM" WHERE ph_number = 6290232268;

  const sql = `UPDATE labtestbookedtable SET appoint_date_re = ?, appoint_time_re = ? , LabTestStatus = ? WHERE id = ?`;
  try {
    db.query(
      sql,
      [appoint_date, appoint_time, "request_reschedule", appoiment_id],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          //   console.log(data)
          return res.json(data);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});

// Reschedule booking to booking table
app.post("/sub-admin/reschedule/:appoiment_id", async (req, res) => {
  // const appoiment_id = req.params.appoiment_id;
  const appoiment_id = Number(req.params.appoiment_id);
  // console.log(appoiment_id)
  // console.log(req.params)
  // const { doctor_id, appoint_date, appoint_time } = req.body;
  const ph_number = Number(req.body.ph_number);
  const appoint_date = req.body.appoint_date;
  const appoint_time = req.body.appoint_time;
  // UPDATE booking SET appoint_date = "2023-10-21", appoint_time = "11:25 AM" WHERE ph_number = 6290232268;

  const sql = `UPDATE appointmenttable SET appoint_date = ?, appoint_time = ? , AppointmentStatus = ? WHERE id = ?`;
  try {
    db.query(
      sql,
      [appoint_date, appoint_time, "reschedule", appoiment_id],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          //   console.log(data)
          return res.json(data);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});

// Reschedule booking to booking table
app.post("/sub-admin/reschedule/see/:appoiment_id", async (req, res) => {
  // const appoiment_id = req.params.appoiment_id;
  const appoiment_id = Number(req.params.appoiment_id);
  const appoint_date = req.body.appoint_date;
  const appoint_time = req.body.appoint_time;
  console.log(req.body);
  // console.log(req.params)
  // const { doctor_id, appoint_date, appoint_time } = req.body;

  // UPDATE booking SET appoint_date = "2023-10-21", appoint_time = "11:25 AM" WHERE ph_number = 6290232268;

  const sql = `UPDATE appointmenttable SET appoint_date = ?, appoint_time = ?, AppointmentStatus = ? WHERE id = ?`;
  try {
    db.query(
      sql,
      [appoint_date, appoint_time, "reschedule", appoiment_id],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          //   console.log(data)
          return res.json(data);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});

// Reschedule Lab booking to booking table
app.post("/sub-admin/reschedule/lab/see/:appoiment_id", async (req, res) => {
  // const appoiment_id = req.params.appoiment_id;
  const appoiment_id = Number(req.params.appoiment_id);
  const appoint_date = req.body.appoint_date;
  const appoint_time = req.body.appoint_time;
  // console.log(req.body)
  // console.log(req.params)
  // const { doctor_id, appoint_date, appoint_time } = req.body;

  // UPDATE booking SET appoint_date = "2023-10-21", appoint_time = "11:25 AM" WHERE ph_number = 6290232268;

  const sql = `UPDATE labtestbookedtable SET appoint_date = ?, appoint_time = ?, LabTestStatus = ? WHERE id = ?`;
  try {
    db.query(
      sql,
      [appoint_date, appoint_time, "reschedule", appoiment_id],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          //   console.log(data)
          return res.json(data);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});

// see reschedule request
app.get("/sub-admin/reschedule/see/:appoiment_id", async (req, res) => {
  // const appoiment_id = req.params.appoiment_id;
  const appoiment_id = Number(req.params.appoiment_id);
  // console.log(appoiment_id)
  // console.log(req.params)
  // const { doctor_id, appoint_date, appoint_time } = req.body;

  // UPDATE booking SET appoint_date = "2023-10-21", appoint_time = "11:25 AM" WHERE ph_number = 6290232268;

  const sql = `select * from appointmenttable WHERE id = ?`;
  try {
    db.query(sql, [appoiment_id], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        //   console.log(data);
        return res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});
// see reschedule request
app.get("/sub-admin/reschedule/lab/see/:appoiment_id", async (req, res) => {
  // const appoiment_id = req.params.appoiment_id;
  const appoiment_id = Number(req.params.appoiment_id);
  // console.log(appoiment_id)
  // console.log(req.params)
  // const { doctor_id, appoint_date, appoint_time } = req.body;

  // UPDATE booking SET appoint_date = "2023-10-21", appoint_time = "11:25 AM" WHERE ph_number = 6290232268;

  const sql = `select * from labtestbookedtable WHERE id = ?`;
  try {
    db.query(sql, [appoiment_id], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        //   console.log(data);
        return res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});

// Reschedule booking to booking table
app.post("/sub-admin/reschedule/status/:appoiment_id", async (req, res) => {
  // const appoiment_id = req.params.appoiment_id;
  const appoiment_id = Number(req.params.appoiment_id);
  console.log(appoiment_id);
  console.log(req.params);
  const AppointmentStatus = req.body.AppointmentStatus;
  // console.log(AppointmentStatus)
  // console.log(req.body)
  // const { doctor_id, appoint_date, appoint_time } = req.body;
  // UPDATE booking SET appoint_date = "2023-10-21", appoint_time = "11:25 AM" WHERE ph_number = 6290232268;

  const sql = `UPDATE appointmenttable SET AppointmentStatus = ? WHERE id = ?`;
  try {
    db.query(sql, [AppointmentStatus, appoiment_id], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(null);
      } else {
        //   console.log(data)
        return res.json(data);
      }
    });
  } catch (error) {
    return res.json(null);
    console.log(error);
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});
// Reschedule booking to booking table
app.post("/sub-admin/reschedule/lab/status/:appoiment_id", async (req, res) => {
  // const appoiment_id = req.params.appoiment_id;
  const appoiment_id = Number(req.params.appoiment_id);
  // console.log(appoiment_id)
  // console.log(req.params)
  const LabTestStatus = req.body.AppointmentStatus;
  // console.log(AppointmentStatus)
  // console.log(req.body)
  // const { doctor_id, appoint_date, appoint_time } = req.body;
  // UPDATE booking SET appoint_date = "2023-10-21", appoint_time = "11:25 AM" WHERE ph_number = 6290232268;

  const sql = `UPDATE labtestbookedtable SET LabTestStatus = ? WHERE id = ?`;
  try {
    db.query(sql, [LabTestStatus, appoiment_id], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(null);
      } else {
        //   console.log(data)
        return res.json(data);
      }
    });
  } catch (error) {
    return res.json(null);
    console.log(error);
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});

// Define the search route
// app.get('/search', (req, res) => {
//     const { medicineName, pharmacyName, medicineType, location } = req.query;

//     // Build the SQL query based on search criteria
//     let sql = 'SELECT * FROM medicines m ';
//     sql += 'LEFT JOIN pharmacies p ON m.id = p.id ';
//     sql += 'LEFT JOIN locations l ON m.id = l.id ';
//     sql += 'WHERE ';

//     const conditions = [];
//     if (medicineName) conditions.push(`m.name = '${medicineName}'`);
//     if (pharmacyName) conditions.push(`p.name = '${pharmacyName}'`);
//     if (medicineType) conditions.push(`m.type = '${medicineType}'`);
//     if (location) conditions.push(`l.name = '${location}'`);

//     sql += conditions.join(' AND ');

//     // Execute the query
//     db.query(sql, (err, results) => {
//       if (err) {
//         console.error('Database query error: ' + err.message);
//         res.status(500).json({ error: 'An error occurred.' });
//         return;
//       }
//   console.log(results)
//       res.json(results);
//     });
//   });

//Main Search Functiomlity in app
// app.post('/search', async (req, res) => {
//     const likeField = req.body.input[0];
//     const input = `% ${likeField}%`;

//     try {
//         const query = "SELECT sub_admin.id AS sub_admin_id,product.product_id,lab.Test_id From " +
//             " address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id " +
//             " INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id " +
//             " INNER JOIN product_sub_admin ON sub_admin.id = product_sub_admin.sub_admin_id " +
//             " INNER JOIN product ON product_sub_admin.product_id = product.product_id " +
//             " INNER JOIN laboratory_tests_details AS lab ON lab.clinic_id = sub_admin.id " +
//             " WHERE  (product.product_name LIKE ? OR product.product_name IS NULL)" +
//            " OR (address.city LIKE ? OR address.city IS NULL)" +
//             " OR (typeOfMedicine LIKE ? OR typeOfMedicine IS NULL)";

//         const productResults = await new Promise((resolve, reject) => {
//             db.query(query, [input, input, input], (err, result) => {
//                 if (err) {
//                     console.error('Error executing query:', err);
//                     reject(err);
//                 } else {
//                     console.log(result)
//                     resolve(result);
//             }
//             });
//         });

//         if (productResults.length > 0) {
//             const imagesPromises = productResults.map((product) => {
//                 return new Promise((resolve, reject) => {
//                     const sql = 'SELECT * FROM images WHERE id = ?';
//                     db.query(sql, [product.productImageId], (err, result) => {
//                         if (err) {
//                             console.error('Database error: ' + err);
//                             reject(err);
//                         } else {
//                             resolve(result[0]);
//                         }
//                     });
//                 });
//             });

//             const images = await Promise.all(imagesPromises);
//             console.log([productResults, images]);
//             return res.json([productResults, images]);
//         } else {
//             return res.json([]); // Return an empty response if no results found
//         }
//     } catch (error) {
//         console.error('Error: ', error);
//         return res.status(500).json({ error: 'Error retrieving data from the database' });
//     }
// });

// "product.product_name LIKE '%calpole%'" +
//         "OR address.city LIKE '%calpole%'" +
//         OR(--Assuming name is from the product table, adjust if needed
//     product.name LIKE '%calpole%'
// OR typeOfMedicine LIKE '%calpole%';";
app.post("/search", async (req, res) => {
  console.log(req.body);
  let likefiled;

  if (req.body.from === "category") {
    likefiled = req.body.input;
  } else {
    likefiled = req.body.input[0];
  }
  // console.log(likefiled)
  const input = `%${likefiled}%`;
  // Implement your database query based on the search parameters
  // const sql = "SELECT  sub_admin.id ,name , address_sub_admin.address_id  ,City,product_name,typeOfMedicine,product.product_id,product_price,discount,description,phone,productImageId FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id INNER JOIN product_sub_admin ON sub_admin.id = product_sub_admin.sub_admin_id INNER JOIN product ON product_sub_admin.product_id = product.product_id where product.product_name Like ? Or address.city Like ? Or name Like  ?  Or typeOfMedicine Like ?  ;";
  // try {
  //     db.query(sql, [input, input, input, input,input], (err, data) => {
  //         if (err) {
  //             console.log(err);
  //         }
  //         else {

  //             // console.log(data)
  //             return res.json(data);
  //         }
  //     })
  // } catch (error) {
  //     console.log(error)
  // }
  //This is for Product
  try {
    // const user_id = req.session.user.id;
    const query =
      "SELECT  sub_admin.id ,product_sub_admin.product_id as id ,name , address_sub_admin.address_id  ,City,product_name,typeOfMedicine,product.product_id,product_price,discount,description,phone,productImageId FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id INNER JOIN product_sub_admin ON sub_admin.id = product_sub_admin.sub_admin_id INNER JOIN product ON product_sub_admin.product_id = product.product_id where product.product_name Like ? Or product.category Like ? Or address.city Like ? Or name Like  ?  Or typeOfMedicine Like ?;";
    const productResults = await new Promise((resolve, reject) => {
      db.query(query, [input, input, input, input, input], (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log(query)
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });
    let images;
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

      images = await Promise.all(imagesPromises);
      // console.log([productResults, images]);
      // return res.json([productResults, images]);
    }

    //This is for Lab Test
    // const user_id = req.session.user.id;
    const query1 =
      "SELECT  sub_admin.id ,Test_id,Test_Name,Test_Desc,test_imageId,Price FROM address_sub_admin" +
      " INNER JOIN address ON address_sub_admin.address_id = address.address_id" +
      " INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id " +
      " INNER JOIN laboratory_tests_details ON laboratory_tests_details.clinic_id = sub_admin.id" +
      " where laboratory_tests_details.Test_Name Like ? Or address.city Like ? Or name Like  ?;";
    const LabResults = await new Promise((resolve, reject) => {
      db.query(query1, [input, input, input, input, input], (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });
    let LabTestimages;
    if (LabResults.length > 0) {
      const imagesPromises = LabResults.map((lab) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [lab.test_imageId], (err, result) => {
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

      LabTestimages = await Promise.all(imagesPromises);
    }
    //This is for Doctors
    // const user_id = req.session.user.id;
    const query2 = `
        SELECT doctors_details.id,doc_name,doc_desc,location,clinic,clinic_id,clinic_desc,type,doctor_imageId,address.pin  from doctors_details
    INNER JOIN sub_admin ON sub_admin.id = doctors_details.clinic_id 
    INNER JOIN address_sub_admin ON address_sub_admin.sub_admin_id = sub_admin.id 
    INNER JOIN address ON address_sub_admin.sub_admin_id = address.address_id   
    where doc_name Like ?
    Or doc_desc Like ?
    Or specializes Like ? 
    Or location Like ? 
    Or pin Like ?`;
    const DoctorResults = await new Promise((resolve, reject) => {
      db.query(query2, [input, input, input, input, input], (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });
    let Doctorimages;
    if (DoctorResults.length > 0) {
      const imagesPromises = DoctorResults.map((doctor) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [doctor.doctor_imageId], (err, result) => {
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

      Doctorimages = await Promise.all(imagesPromises);
    }
    const query3 = `
        SELECT sub_admin.id,name,Landmark,SubAdminImageId,address.pin  from sub_admin
        INNER JOIN address_sub_admin ON address_sub_admin.sub_admin_id = sub_admin.id 
        INNER JOIN sub_admin_details ON sub_admin_details.sub_admin_id = sub_admin.id 
        INNER JOIN address ON address_sub_admin.sub_admin_id = address.address_id   
        where name Like ?
        Or Landmark Like ?
        and role = 'Medicine Shop'
        and permission = 'Approve';`;
    const MedicineShops = await new Promise((resolve, reject) => {
      db.query(query3, [input, input], (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });
    let MedicineShopsImage;
    if (MedicineShops.length > 0) {
      const imagesPromises = MedicineShops.map((mshop) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [mshop.SubAdminImageId], (err, result) => {
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

      MedicineShopsImage = await Promise.all(imagesPromises);
    }
    console.log([
      productResults,
      images,
      LabResults,
      LabTestimages,
      DoctorResults,
      Doctorimages,
      MedicineShops,
      MedicineShopsImage,
    ]);
    // return res.json([productResults, images]);

    return res.json([
      productResults,
      images,
      LabResults,
      LabTestimages,
      DoctorResults,
      Doctorimages,
      MedicineShops,
      MedicineShopsImage,
    ]);
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }
  // const results = await database.searchMedicines(medicineName, pharmacyName, medicineType, location);

  // res.json(results);
});

app.post("/signup", async (req, res) => {
  const sql =
    "Insert into user_tbl (`name`,`phone`,`password`,`createdAt`,`role`) values(?)";
  const sql2 = "select * from user_tbl where `phone` = ?";
  const date = new Date().toISOString().split("T")[0];
  const password = req.body.password;
  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const values = [req.body.name, req.body.phone, hash, date, "customer"];
    try {
      db.query(sql2, [req.body.phone], (err, data) => {
        if (err) {
          return res.json("Error");
        } else if (data.length > 0) {
          // console.log(data)
          return res.json(null);
        } else {
          db.query(sql, [values], (err, data) => {
            if (err) {
              return res.json("Error");
            }
            return res.json(data);
          });
        }
      });
    } catch (error) {
      return res.json(error);
    }
  });
});
app.post("/superadmin/signup", async (req, res) => {
  const sql =
    "Insert into user_tbl (`name`,`phone`,`password`,`role`) values(?)";
  const sql2 = "select * from user_tbl where `phone` = ?";
  const password = req.body.password;
  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const values = [req.body.name, req.body.phone, hash, "admin"];
    try {
      db.query(sql2, [req.body.phone], (err, data) => {
        if (err) {
          return res.json("Error");
        } else if (data.length > 0) {
          // console.log(data)
          return res.json(null);
        } else {
          db.query(sql, [values], (err, data) => {
            if (err) {
              return res.json("Error");
            }
            return res.json(data);
          });
        }
      });
    } catch (error) {
      return res.json(error);
    }
  });
});
app.post("/login", async (req, res) => {
  const sql = "select * from user_tbl where `phone` = ?";

  db.query(sql, [req.body.phone], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      // console.log(data)
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) {
            return res.json(err);
          }
          if (response) {
            // console.log(data[0])
            // const id = data[0].id;
            // const token = jwt.sign((id),"jwt-secret-key",{expiresIn: '1d'});
            // res.cookie('token', token);
            req.session.loggedIn = true; // Set a session variable
            // req.session.phone = data[0].phone; // Store user information in the session
            req.session.user = data[0];
            //console.log(req.session.user)
            req.session.save();
            // console.log("User Login ss")
            // console.log(data[0])
            return res.json([req.session.user, req.session.loggedIn]);
          } else {
            res.json(null);
          }
        }
      );
    } else {
      return res.json(null);
    }
  });
});
app.post("/superadmin/login", (req, res) => {
  const sql = "Select * from user_tbl where `phone` = ? and `role` = 'admin'";

  db.query(sql, [req.body.phone], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      // console.log(data)
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) {
            return res.json(err);
          }
          if (response) {
            // console.log(data[0])
            // const id = data[0].id;
            // const token = jwt.sign((id),"jwt-secret-key",{expiresIn: '1d'});
            // res.cookie('token', token);
            req.session.loggedIn = true; // Set a session variable
            // req.session.phone = data[0].phone; // Store user information in the session
            req.session.user = data[0];
            //console.log(req.session.user)
            req.session.save();
            // res.send("User Login ss")
            // console.log(data[0])
            return res.json([req.session.user, req.session.loggedIn]);
          } else {
            res.json(null);
          }
        }
      );
    } else {
      return res.json(null);
    }
  });
});

app.get("/profile-details", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const user = req.session.user;
    // console.log(user)
    var address = [];
    if (user.role === "customer" || user.role === "admin") {
      const sql = "select * from address where user_id = ?";
      const sql1 =
        "Select COUNT(`cart_id`) AS namesCount from carttable where user_id = ?";
      db.query(sql, [user_id], (err, data) => {
        if (err) {
          return res.json(err);
        }
        address = data;
      });
      if (address.length > 0) {
        db.query(sql1, [user_id], (err, data) => {
          try {
            if (err) {
              return res.json(err);
            }
            if (data.length > 0) {
              //  res.json("Success");

              // console.log(data)
              // console.log(address)
              return res.json([data[0].namesCount, user, address[0].City]);
            } else {
              return res.json("Faile");
            }
          } catch (error) {
            // console.log(error)
          }
        });
      } else {
        db.query(sql1, [user_id], (err, data) => {
          try {
            if (err) {
              return res.json(err);
            }
            if (data.length > 0) {
              //  res.json("Success");

              // console.log(data)
              // console.log(address)
              return res.json([data[0].namesCount, user]);
            } else {
              return res.json("Faile");
            }
          } catch (error) {
            // console.log(error)
          }
        });
      }
    } else {
      // console.log('else')
      const sql =
        "SELECT  b2c_partner.id ,name ,ph_num ,address_partner.address_id ,Village ,P_O,City,district,State,Pin  FROM address_partner INNER JOIN address ON address_partner.address_id = address.address_id  INNER JOIN b2c_partner ON b2c_partner.id = address_partner.partner_id and b2c_partner.id = ?;";
      const sql1 =
        "Select COUNT(`cart_id`) AS namesCount from carttable where user_id = ?";
      db.query(sql, [user_id], (err, data) => {
        if (err) {
          return res.json(err);
        }
        address = data;
      });
      db.query(sql1, [user_id], (err, data) => {
        try {
          if (err) {
            return res.json(err);
          }
          if (data.length > 0) {
            //  res.json("Success");

            // console.log(data)
            // console.log(address)
            return res.json([data[0].namesCount, user_id, address[0].City]);
          } else {
            return res.json("Faile");
          }
        } catch (error) {
          // console.log(error)
        }
      });
    }
  } else {
    // req.session.user = user;
    return res.json("0");
  }
});

app.get("/get/all/address", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql = "SELECT  * FROM address where user_id = ?;";

    db.query(sql, [user_id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    return res.json("User not login");
  }
});
// // Make Primary address
// app.post('/makeprimary/address',  (req, res) => {
//     if (req.session.user) {
//         const user_id = req.session.user.id;
//         console.log(req.body)
//         const {address_id} = req.body;
//         // const address_id = req.body;
//         console.log(address_id)
//         const sql = "Insert into address (`primaryaddress`) values('primary') where address_id = ?";

//         db.query(sql, [address_id], (err, data) => {
//             if (err) {
//                 console.log(err)
//                 return res.json(err);
//             }
//             if (data.length > 0) {
//                 //  res.json("Success");
//                 console.log("success")
//                 return res.json(success);
//             } else {
//                 return res.json(null);
//             }
//         })

//     } else {
//         return res.json("User not login");
//     }
// })

app.post("/makeprimary/address", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const { address_id } = req.body;

    const sql1 =
      "UPDATE address SET primaryaddress = '' WHERE primaryaddress = 'primary' and user_id = ?;";

    db.query(sql1, [user_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, error: err.message });
      }
    });
    const sql =
      "UPDATE address SET primaryaddress = 'primary' WHERE address_id = ?";

    db.query(sql, [address_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, error: err.message });
      }
      if (result.affectedRows > 0) {
        // console.log("Success");
        return res.json({ success: true });
      } else {
        console.log("No rows affected");
        return res.json({ success: false, message: "No rows affected" });
      }
    });
  } else {
    return res.json({ success: false, message: "User not logged in" });
  }
});
//Get user data in Profile page
app.get("/profile", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const user = req.session.user;
    // console.log(user)
    if (user.role === "customer") {
      const sql =
        "SELECT  id ,name ,phone , address_id ,Village ,P_O,City,district,State,Pin FROM user_tbl INNER JOIN address ON user_tbl.id = address.user_id and user_tbl.id = ? and address.primaryaddress = 'primary';";
      const sql1 =
        "SELECT  id ,name ,phone  FROM user_tbl where user_tbl.id = ?;";

      db.query(sql, [user_id], (err, data) => {
        if (err) {
          return res.json(err);
        }
        if (data.length > 0) {
          //  res.json("Success");
          return res.json([data[0], true]);
        } else {
          db.query(sql1, [user_id], (err, data) => {
            if (err) {
              return res.json(err);
            }
            if (data.length > 0) {
              //  res.json("Success");
              return res.json([data[0], false]);
            } else {
              return res.json("Faile");
            }
          });
        }
      });
    } else {
      const sql =
        "SELECT  b2c_partner.id ,name ,ph_num ,address_partner.address_id ,Village ,P_O,City,district,State,Pin  FROM address_partner INNER JOIN address ON address_partner.address_id = address.address_id  INNER JOIN b2c_partner ON b2c_partner.id = address_partner.partner_id and b2c_partner.id = ?;";
      // const sql1 = "SELECT  id ,name ,phone  FROM user_tbl where user_tbl.id = ?;";

      db.query(sql, [user_id], (err, data) => {
        if (err) {
          return res.json(err);
        }
        if (data.length > 0) {
          //  res.json("Success");
          return res.json([data[0], true]);
        }
      });
    }
  } else {
    return res.json("User not login");
  }
});

app.get("/product", async (req, res) => {
  // app.get("/superadmin/product", async (req, res) => {
  // if (req.session.user) {
  try {
    // const user_id = req.session.user.id;
    const query = " select * from product;";
    const productResults = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
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
      // console.log(images);
      return res.json([productResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }
});
//this give suggested Product on basis of location
app.get("/product/suggestedProducts", async (req, res) => {
  // app.get("/superadmin/product", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const address = await new Promise((resolve, reject) => {
      const sql1 = "SELECT * from address where user_id = ? ;";
      db.query(sql1, [user_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    // console.log(address)

    try {
      // const user_id = req.session.user.id;
      const sql =
        "SELECT  *  FROM product INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id INNER JOIN sub_admin ON sub_admin.id = product_sub_admin.sub_admin_id INNER JOIN address_sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id INNER JOIN address ON address_sub_admin.address_id = address.address_id   where address.City = ?;";
      const productResults = await new Promise((resolve, reject) => {
        db.query(sql, [address[0].City], (err, result) => {
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
      return res
        .status(500)
        .json({ error: "Error retrieving product details from the database" });
    }
  } else {
    return res.json(undefined);
  }
});
//this give suggested Doctor on basis of location
app.get("/doctors/suggestedDoctors", async (req, res) => {
  // app.get("/superadmin/product", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const address = await new Promise((resolve, reject) => {
      const sql1 = "SELECT * from address where user_id = ? ;";
      db.query(sql1, [user_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // console.log(rows)
          resolve(rows);
        }
      });
    });
    // console.log(address)

    try {
      // const user_id = req.session.user.id;
      // const sql = "SELECT  *  FROM product INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id INNER JOIN sub_admin ON sub_admin.id = product_sub_admin.sub_admin_id INNER JOIN address_sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id INNER JOIN address ON address_sub_admin.address_id = address.address_id   where address.City = ?;";
      const sql = "select * from doctors_details where location = ?;";
      const doctorResults = await new Promise((resolve, reject) => {
        db.query(sql, [address[0].City], (err, result) => {
          if (err) {
            console.error("Error retrieving data: " + err.message);
            reject(err);
          } else {
            // console.log('Data retrieved successfully');
            // console.log(result)
            resolve(result);
          }
        });
      });

      if (doctorResults.length > 0) {
        const imagesPromises = doctorResults.map((doctor) => {
          return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM images WHERE id = ?";
            db.query(sql, [doctor.doctor_imageId], (err, result) => {
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
        return res.json([doctorResults, images]);
      } else {
        return res.json([]); // Return an empty response if no doctor details found
      }
    } catch (error) {
      console.error("Error: ", error);
      return res
        .status(500)
        .json({ error: "Error retrieving product details from the database" });
    }
  } else {
    return res.json(undefined);
  }
});
app.get("/catagorys", async (req, res) => {
  // app.get("/superadmin/product", async (req, res) => {
  // if (req.session.user) {
  try {
    // const user_id = req.session.user.id;
    const query = "SELECT DISTINCT category FROM product;";
    const productResults = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });

    // if (productResults.length > 0) {
    // const imagesPromises = productResults.map((product) => {
    //     return new Promise((resolve, reject) => {
    //         const sql = 'SELECT * FROM images WHERE id = ?';
    //         db.query(sql, [product.productImageId], (err, result) => {
    //             if (err) {
    //                 console.error('Database error: ' + err);
    //                 reject(err);
    //             } else {
    //                 // console.log(result[0]);
    //                 resolve(result[0]);
    //             }
    //         });
    //     });
    // });

    // const images = await Promise.all(imagesPromises);
    // console.log(images);
    // } else {
    //     return res.json([]); // Return an empty response if no doctor details found
    // }
    return res.json(productResults);
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }
});
app.get("/doctors", async (req, res) => {
  // app.get("/superadmin/product", async (req, res) => {
  // if (req.session.user) {
  try {
    // const user_id = req.session.user.id;
    const query = "select * from doctors_details;";
    const doctorResults = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (doctorResults.length > 0) {
      const imagesPromises = doctorResults.map((doctor) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [doctor.doctor_imageId], (err, result) => {
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
      // console.log([doctorResults, images]);
      return res.json([doctorResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }
});
app.get("/specializes-doctors", async (req, res) => {
  // app.get("/superadmin/product", async (req, res) => {
  // if (req.session.user) {
  try {
    // const user_id = req.session.user.id;
    const query = "select DISTINCT specializes from doctors_details ";

    const doctorResults = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });
    return res.json([doctorResults]);

    // if (doctorResults.length > 0) {
    //     const imagesPromises = doctorResults.map((doctor) => {
    //         return new Promise((resolve, reject) => {
    //             const sql = 'SELECT * FROM images WHERE id = ?';
    //             db.query(sql, [doctor.doctor_imageId], (err, result) => {
    //                 if (err) {
    //                     console.error('Database error: ' + err);
    //                     reject(err);
    //                 } else {
    //                     // console.log(result[0]);
    //                     resolve(result[0]);
    //                 }
    //             });
    //         });
    //     });

    //     const images = await Promise.all(imagesPromises);
    //     // console.log(images);
    //     return res.json([doctorResults, images]);
    // } else {
    //     return res.json([]); // Return an empty response if no doctor details found
    // }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }
});

app.get("/product/:location", (req, res) => {
  // const sql = "Select * from product";
  const location = req.params.location;
  // console.log( "location " + location)
  // const sql = "SELECT  sub_admin.id ,name , address_sub_admin.address_id  ,City,product.product_id,discount,DrugOrNot,product_name,product_price,typeOfMedicine  FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id INNER JOIN product_sub_admin ON sub_admin.id = product_sub_admin.sub_admin_id INNER JOIN product ON product_sub_admin.product_id = product.product_id where product.product_name Like '%an%' Or address.city Like '%an%' Or name Like '%an%' Or typeOfMedicine Like '%an%' ;";

  const sql =
    "SELECT  *  FROM product INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id INNER JOIN sub_admin ON sub_admin.id = product_sub_admin.sub_admin_id INNER JOIN address_sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id INNER JOIN address ON address_sub_admin.address_id = address.address_id   where address.City = ?;";

  db.query(sql, [location], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    // console.log(data)
    if (data.length > 0) {
      //  res.json("Success");
      // console.log(data)
      return res.json(data);
    } else {
      return res.json("Faile");
    }
  });
});
app.get("/medicines", (req, res) => {
  const sql = "Select * from product";

  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      //  res.json("Success");
      return res.json(data);
    } else {
      return res.json("Faile");
    }
  });
});

app.get("/cart", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const user = req.session.user;
    // console.log(user)
    if (user.role === "customer" || user.role === "admin") {
      try {
        // const user_id = req.session.user.id;
        const query =
          "SELECT product.product_id, product_name , description,product_price , cart_id,discount,quantity, DrugOrNot , sgst,cgst,productImageId FROM product INNER JOIN carttable ON product.product_id = carttable.product_id AND carttable.user_id = ?;";
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
          // console.log(images);
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
        const query =
          "SELECT  product_name , product_price ,description, cart_id,discount,quantity, DrugOrNot , sgst,cgst,productImageId FROM product INNER JOIN carttable ON product.product_id = carttable.product_id AND carttable.user_id = ? and carttable.role = 'partner'";
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
          // console.log(images);
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
    // res.send(500,"data not found")
  }
});

app.get("/cart/drug", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "SELECT COUNT(*) as no FROM product INNER JOIN carttable ON product.product_id = carttable.product_id AND carttable.user_id = ? where product.DrugOrNot = 'drug';";

    db.query(sql1, [user_id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
// see Product in cart
app.get("/addtocart/:product_id", async (req, res) => {
  // const sql2 = "Select * from product where `product_id` In sql1";
  // console.log(req.params.product_id)
  const product_id = req.params.product_id;
  // const sql1 = "Select *  from product where product_id = ?";
  try {
    // const user_id = req.session.user.id;
    const query = " Select *  from product where product_id = ?;";
    const productResults = await new Promise((resolve, reject) => {
      db.query(query, [product_id], (err, result) => {
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
      // console.log(images);
      return res.json([productResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }
});
// app.post('/addtocart/:product_id', (req, res) => {
//     if (req.session.user) {
//         const product_id = req.params.product_id;
//         const user_id = req.session.user.id;

//         const sql = "insert into carttable(`product_id`,`user_id`) values (?,?);";
//         db.query(sql, [product_id, user_id], (err, data) => {
//             if (err) {
//                 return res.json("Error");
//             } return res.json(data);

//         })
//     } else {

//     }
// })
//Add product in cart
app.post("/addtocart/:product_id/:quantity", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const user = req.session.user;
    // console.log(user)
    if (user.role === "customer") {
      const value = [
        req.params.product_id,
        req.params.quantity,
        req.session.user.id,
        "customer",
      ];

      const productInfo = await new Promise((resolve, reject) => {
        const findproduct =
          "select * from carttable where product_id = ? and user_id = ?";
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
          "UPDATE hh_dev_db.carttable SET quantity = quantity+1 WHERE product_id = ? and user_id = ?;";
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
          "insert into carttable (`product_id`,`quantity`,`user_id`,`role`) values (?);";
        db.query(sql, [value], (err, data) => {
          if (err) {
            console.log(err);
            return res.json(err);
          }
          return res.json(data);
        });
      }
    } else {
      const value = [
        req.params.product_id,
        req.params.quantity,
        req.session.user.id,
        "partner",
      ];

      const productInfo = await new Promise((resolve, reject) => {
        const findproduct =
          "select * from carttable where product_id = ? and user_id = ?";
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
          "UPDATE hh_dev_db.carttable SET quantity = quantity+1 WHERE product_id = ? and user_id = ?;";
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
          "insert into carttable (`product_id`,`quantity`,`user_id`,`role`) values (?);";
        db.query(sql, [value], (err, data) => {
          if (err) {
            console.log(err);
            return res.json(err);
          }
          return res.json(data);
        });
      }
    }
  } else {
    return res.json("Error");
  }
});
//increase quantity of product in cart
app.post("/product/increase_quantity/:product_id", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const user = req.session.user;
    // console.log(user)
    if (user.role === "customer") {
      const value = [req.params.product_id, req.session.user.id];

      const sql =
        "UPDATE hh_dev_db.carttable SET quantity = quantity+1 WHERE product_id = ? and user_id = ?;";
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
      const value = [req.params.product_id, req.session.user.id];

      const sql =
        "UPDATE hh_dev_db.carttable SET quantity = quantity+1 WHERE product_id = ? and user_id = ?;";
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
    }
  } else {
    return res.json("Error");
  }
});
//decrease  quantity of product in cart
app.post("/product/decrease_quantity/:product_id", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const user = req.session.user;
    // console.log(user)
    if (user.role === "customer") {
      const value = [req.params.product_id, req.session.user.id];

      const sql =
        "UPDATE hh_dev_db.carttable SET quantity = quantity-1 WHERE product_id = ? and user_id = ?;";
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
      const productInfo = await new Promise((resolve, reject) => {
        const findproduct =
          "select quantity from carttable where product_id = ? and user_id = ?";
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
      if (productInfo[0].quantity === 0) {
        const sql5 =
          "DELETE FROM carttable WHERE user_id = ? AND product_id = ?;";
        return new Promise((resolve, reject) => {
          db.query(sql5, [user_id, req.params.product_id], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    } else {
      const value = [req.params.product_id, req.session.user.id];

      const sql =
        "UPDATE hh_dev_db.carttable SET quantity = quantity+1 WHERE product_id = ? and user_id = ?;";
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
      const productInfo = await new Promise((resolve, reject) => {
        const findproduct =
          "select quantity from carttable where product_id = ? and user_id = ?";
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
      if (productInfo[0].quantity === 0) {
        const sql5 =
          "DELETE FROM carttable WHERE user_id = ? AND product_id = ?;";
        return new Promise((resolve, reject) => {
          db.query(sql5, [user_id, req.params.product_id], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    }
  } else {
    return res.json("Error");
  }
});

// let productId = [];

app.get("/orders", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const user = req.session.user;
    // console.log(user)
    if (user.role === "customer") {
      const sql1 =
        "SELECT  product_name , phone, product_price , cart_id,quantity FROM product INNER JOIN carttable ON product.product_id = carttable.product_id JOIN user_tbl ON carttable.user_id = user_tbl.id AND carttable.user_id = ?;";
      const sql2 =
        "SELECT  product.product_id FROM product INNER JOIN carttable ON product.product_id = carttable.product_id JOIN user_tbl ON carttable.user_id = user_tbl.id AND carttable.user_id = ?;";
      // db.query(sql2, [user_id], (err, data) => {
      //     if (err) {
      //         return res.json(err);
      //     }
      //     if (data.length > 0) {
      //         //  res.json("Success");
      //         // return res.json(data);
      //         productId.push(data);
      //     } else {
      //         return res.json("Faile");
      //     }
      // })
      db.query(sql1, [user_id], (err, data) => {
        if (err) {
          return res.json(err);
        }
        if (data.length > 0) {
          //  res.json("Success");
          return res.json(data);
        } else {
          return res.json("Faile");
        }
      });
    } else {
      const sql1 =
        "SELECT  product_name , phone, product_price , cart_id,quantity FROM product INNER JOIN carttable ON product.product_id = carttable.product_id JOIN user_tbl ON carttable.user_id = user_tbl.id AND carttable.user_id = ?;";
      const sql2 =
        "SELECT  product.product_id FROM product INNER JOIN carttable ON product.product_id = carttable.product_id JOIN user_tbl ON carttable.user_id = user_tbl.id AND carttable.user_id = ?;";
      // db.query(sql2, [user_id], (err, data) => {
      //     if (err) {
      //         return res.json(err);
      //     }
      //     if (data.length > 0) {
      //         //  res.json("Success");
      //         // return res.json(data);
      //         productId.push(data);
      //     } else {
      //         return res.json("Faile");
      //     }
      // })
      db.query(sql1, [user_id], (err, data) => {
        if (err) {
          return res.json(err);
        }
        if (data.length > 0) {
          //  res.json("Success");
          return res.json(data);
        } else {
          return res.json("Faile");
        }
      });
    }
  } else {
    // res.send(500,"data not found")
  }
});

// API endpoint to retrieve available coupons based on total and category
app.post("/cart/get-coupons", (req, res) => {
  const totalAmount = req.body.amount;
  // console.log(req.body.amount)
  // console.log('amount ' + req.body)
  // console.log('amount1 ' + totalAmount)
  // const category = req.query.category;
  const sql1 = "SELECT  * FROM coupon where min_order_amount <= ?";
  db.query(sql1, [totalAmount], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    if (data.length > 0) {
      // console.log(data)
      return res.json(data);
    } else {
      // console.log(data)
      return res.json(null);
    }
  });

  // Query the database to find applicable coupons
  // Return the list of coupons
});
//   Notification system after order which will go to super and sub admin using bell sound system-const express = require('express');

// Create a mapping of users to their WebSocket connections
// const userSockets = new Map();

// io.on('connection', (socket) => {
//     socket.on('user-connected', (userId) => {
//         userSockets.set(userId, socket);
//     });

//     socket.on('disconnect', () => {
//         userSockets.forEach((value, key) => {
//             if (value === socket) {
//                 userSockets.delete(key);
//             }
//         });
//     });
// });

// web soket server creation-

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Handle new-order event
//     socket.on('new-order', (message) => {
//         // Check if the user is a super admin or sub-admin and emit the event accordingly.
//         if (socket.isAdmin) {
//             // Emit to super admins
//             io.emit('new-order-notification', message);
//         } else {
//             // Emit to sub-admins
//             socket.broadcast.emit('new-order-notification', message);
//         }
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });
// // Simulate user roles (replace this with your user authentication)
// const userRoles = {
//     'superadmin1': 'superadmin',
//     'superadmin2': 'superadmin',
//     'subadmin1': 'subadmin',
//     'subadmin2': 'subadmin',
// };

//Placeing Order by Customer

app.post("/orders", async (req, res) => {
  if (req.session.user) {
    try {
      const user = req.session.user;
      // console.log(user);
      if (user.role === "customer") {
        // const { userId, product, orderDetails } = req.body;
        const userId = req.session.user.id;
        // Check the user's role
        // const userRole = userRoles[userId];
        // const orderDetails = "New Oreder Placed";

        // // if (!userRole) {
        // //     return res.status(403).send('Unauthorized');
        // // }

        // // Send a notification to the user's corresponding admin role
        // const notificationMessage = `New order from user ${userId}: ${orderDetails}`;

        // if (userRole === 'superadmin') {
        //     // Send to super admin(s)
        //     userSockets.forEach((socket, adminId) => {
        //         if (userRoles[adminId] === 'superadmin') {
        //             socket.emit('new-order', notificationMessage);
        //         }
        //     });
        // } else if (userRole === 'subadmin') {
        //     // Send to subadmin(s)
        //     userSockets.forEach((socket, adminId) => {
        //         if (userRoles[adminId] === 'subadmin') {
        //             socket.emit('new-order', notificationMessage);
        //         }
        //     });
        // }

        const user_id = req.session.user.id;
        // console.log(req.body)
        const date = new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "");
        const total_amount = req.body.total_amount;
        const payment_type = req.body.payment_type;
        const prescriptionId = req.body.prescriptionId;
        // Create the order
        const createOrder = await new Promise((resolve, reject) => {
          const sql2 =
            "INSERT INTO orders (user_id, order_date, status,role) VALUES (?, ?, 'pending','customer');";
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
          const sql1 =
            "SELECT product.product_id, carttable.quantity FROM product INNER JOIN carttable ON product.product_id = carttable.product_id AND carttable.user_id = ?;";
          db.query(sql1, [user_id], (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });

        // Insert order items with quantities
        const insertOrderItems = await Promise.all(
          productInfo.map((product) => {
            const { product_id, quantity } = product;
            const sql4 =
              "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?);";
            return new Promise((resolve, reject) => {
              db.query(
                sql4,
                [createOrder, product_id, quantity],
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              );
            });
          })
        );
        // console.log("productIds " + productInfo[0].product_id)
        // Get the SubAdminIDs from the from Table with same product id
        const SubAdminIDs = await Promise.all(
          productInfo.map((product) => {
            const { product_id, quantity } = product;
            const sql4 =
              "SELECT sub_admin_id  FROM product_sub_admin where product_id = ?";
            return new Promise((resolve, reject) => {
              db.query(sql4, [product_id], (err, rows) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(rows.map((row) => row.sub_admin_id));
                }
              });
            });
          })
        );
        // console.log("SubAdminIDs " + SubAdminIDs)
        if (SubAdminIDs.length > 1) {
          // Insert order items into sub Admin
          const insertordersInSubAdmin = await Promise.all(
            SubAdminIDs.map((SubAdminID) => {
              const sql4 =
                "INSERT INTO order_sub_admin (order_id, sub_admin_id) VALUES (?, ?);";
              return new Promise((resolve, reject) => {
                db.query(sql4, [createOrder, SubAdminID], (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                });
              });
            })
          );
        }

        // Insert payment method
        const createPayment = await new Promise((resolve, reject) => {
          const sql4 =
            "INSERT INTO payments (order_id, payment_date,total_amount,payment_status,payment_type,service_type) VALUES (?, ?,?,?,?,'Medicine Order');";
          db.query(
            sql4,
            [createOrder, date, total_amount, "pending", payment_type],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });

        // decrease items from the anctual Quantity
        const decreaseQuantity = await Promise.all(
          productInfo.map((product) => {
            const { product_id, quantity } = product;
            const sql5 =
              "UPDATE product SET product_quantity = product_quantity - ? WHERE product_id = ?;";
            return new Promise((resolve, reject) => {
              db.query(sql5, [quantity, product_id], (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            });
          })
        );

        // Add to User table that how many time he orders
        const OrderCountInUserTable = await new Promise((resolve, reject) => {
          // const sql = "select  OrderCount from user_tbl WHERE id = ?;";

          const sql2 =
            "UPDATE user_tbl SET OrderCount = OrderCount + 1 WHERE id = ?;";

          db.query(sql2, [userId], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

        const deleteCartItems = await Promise.all(
          productInfo.map((product) => {
            const { product_id, quantity } = product;
            const sql5 =
              "DELETE FROM carttable WHERE user_id = ? AND product_id = ?;";
            return new Promise((resolve, reject) => {
              db.query(sql5, [user_id, product_id], (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            });
          })
        );
        // Insert the Prescription
        const InsertPrescription = await new Promise((resolve, reject) => {
          const sql2 = "update prescription set order_id = ? where id = ?;";
          db.query(sql2, [createOrder, prescriptionId], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.insertId); // Get the newly inserted order ID
            }
          });
        });
        // After processing the order, notify the super admin and sub-admins.
        // io.emit('new-order', 'A new order has been placed.');

        res.json([createOrder, productInfo]);
      } else {
        // const { userId, product, orderDetails } = req.body;
        const userId = req.session.user.id;

        const user_id = req.session.user.id;
        const date = new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "");
        const total_amount = req.body.total_amount;
        // console.log(req.body)
        const payment_type = req.body.payment_type;
        // Create the order
        const createOrder = await new Promise((resolve, reject) => {
          const sql2 =
            "INSERT INTO orders (user_id, order_date, status,role) VALUES (?, ?, 'pending','partner');";
          db.query(sql2, [user_id, date], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.insertId); // Get the newly inserted order ID
            }
          });
        });
        // Get the Commission from DB
        const commission = await new Promise((resolve, reject) => {
          const sql1 =
            "select * from partner_services where service_type = 'Medicine Order';";
          db.query(sql1, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
        // console.log(commission);
        const addOrderToPartner = await new Promise((resolve, reject) => {
          const sql2 =
            "INSERT INTO partner_commision (partner_id, service_type,order_id, commision_type,commision) VALUES (?,'Medicine Order' ,?, ?,?);";
          db.query(
            sql2,
            [
              user_id,
              createOrder,
              commission[0].commision_type,
              commission[0].commision,
            ],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result.insertId); // Get the newly inserted order ID
              }
            }
          );
        });

        // Get the product IDs and quantities from the user's cart
        const productInfo = await new Promise((resolve, reject) => {
          const sql1 =
            "SELECT product.product_id, carttable.quantity FROM product INNER JOIN carttable ON product.product_id = carttable.product_id AND carttable.user_id = ?;";
          db.query(sql1, [user_id], (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });

        // Insert order items with quantities
        const insertOrderItems = await Promise.all(
          productInfo.map((product) => {
            const { product_id, quantity } = product;
            const sql4 =
              "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?);";
            return new Promise((resolve, reject) => {
              db.query(
                sql4,
                [createOrder, product_id, quantity],
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              );
            });
          })
        );
        // console.log("productIds " + productInfo[0].product_id)
        // Get the SubAdminIDs from the from Table with same product id
        const SubAdminIDs = await Promise.all(
          productInfo.map((product) => {
            const { product_id, quantity } = product;
            const sql4 =
              "SELECT sub_admin_id  FROM product_sub_admin where product_id = ?";
            return new Promise((resolve, reject) => {
              db.query(sql4, [product_id], (err, rows) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(rows.map((row) => row.sub_admin_id));
                }
              });
            });
          })
        );
        // console.log("SubAdminIDs " + SubAdminIDs.length)
        if (SubAdminIDs.length > 1) {
          // Insert order items into sub Admin
          const insertordersInSubAdmin = await Promise.all(
            SubAdminIDs.map((SubAdminID) => {
              const sql4 =
                "INSERT INTO order_sub_admin (order_id, sub_admin_id) VALUES (?, ?);";
              return new Promise((resolve, reject) => {
                db.query(sql4, [createOrder, SubAdminID], (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                });
              });
            })
          );
        }

        // Insert payment method
        const createPayment = await new Promise((resolve, reject) => {
          const sql4 =
            "INSERT INTO payments (order_id, payment_date,total_amount,payment_status,payment_type) VALUES (?, ?,?,?,?);";
          db.query(
            sql4,
            [createOrder, date, total_amount, "pending", payment_type],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });

        // decrease items from the anctual Quantity
        const decreaseQuantity = await Promise.all(
          productInfo.map((product) => {
            const { product_id, quantity } = product;
            const sql5 =
              "UPDATE product SET product_quantity = product_quantity - ? WHERE product_id = ?;";
            return new Promise((resolve, reject) => {
              db.query(sql5, [quantity, product_id], (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            });
          })
        );

        // Add to User table that how many time he orders
        const OrderCountInUserTable = await new Promise((resolve, reject) => {
          // const sql = "select  OrderCount from user_tbl WHERE id = ?;";

          const sql2 =
            "UPDATE user_tbl SET OrderCount = OrderCount + 1 WHERE id = ?;";

          db.query(sql2, [userId], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

        const deleteCartItems = await Promise.all(
          productInfo.map((product) => {
            const { product_id, quantity } = product;
            const sql5 =
              "DELETE FROM carttable WHERE user_id = ? AND product_id = ?;";
            return new Promise((resolve, reject) => {
              db.query(sql5, [user_id, product_id], (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            });
          })
        );
        // Insert the Prescription
        const InsertPrescription = await new Promise((resolve, reject) => {
          const sql2 = "update prescription set order_id = ? where id = ?;";
          db.query(sql2, [createOrder, prescriptionId], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.insertId); // Get the newly inserted order ID
            }
          });
        });
        // After processing the order, notify the super admin and sub-admins.
        // io.emit('new-order', 'A new order has been placed.');

        res.json([createOrder, productInfo]);
      }
      // res.json("success",{ message: 'Order placed successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  } else {
    res.status(404).send("Data not found");
  }
});

app.post("/orders/coupon", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    // console.log(req.body.coupon);
    const sql1 = "SELECT  * FROM coupon where coupon_code = ?";
    db.query(sql1, [req.body.coupon], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

// In-memory storage for orders (replace with a database in production)
// const orders = [];

app.get("/profile/orders", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const query =
      "SELECT  product_name , total_amount ,product.product_id, orders.id,discount ,expected_delivery_date,order_items.quantity,productImageId FROM product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  where orders.user_id = ?;";
    // console.log(user_id)
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
    // db.query(sql1, [user_id], (err, data) => {
    //     if (err) {
    //         return res.json(err);
    //     }
    //     if (data.length > 0) {
    //         //  res.json("Success");
    //         // orders.push(data);
    //         // console.log(orders)
    //         return res.json(data);
    //     } else {
    //         return res.json(null);
    //     }
    // })
  } else {
    res.status(500).send("data not found");
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
app.delete("/orders/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);
  // console.log(orderId)
  const findOrder = await new Promise((resolve, reject) => {
    const sql = "select * from orders where id=?";
    db.query(sql, [orderId], async (err, result) => {
      if (err) {
        reject(err);
      } else {
        // console.log(result[0])
        // orders.push(result)
        // resolve(result);
        // Find the order in the orders array (or query the database in production)
        // const orderIndex = orders.findIndex((order) => order[0].id === orderId);

        if (result[0].id !== orderId) {
          return res.status(404).json({ message: "Order not found" });
        }

        // console.log(orderIndex)
        // const order = orders[orderIndex];
        if (!canCancelOrder(result[0])) {
          // console.log('no')
          // return res.status(400).json({ message: 'Order cannot be canceled at this time' })
          return res.json(null);
        }

        // Remove the order from the array (or mark it as canceled in the database)
        const deletePayment = await new Promise((resolve, reject) => {
          const sql = "delete from payments where order_id=?";
          db.query(sql, [orderId], async (err, result) => {
            if (err) {
              reject(err);
            } else {
              console.log("payment Delete");

              // Remove the order from the array (or mark it as canceled in the database)
              const orderItems = await new Promise((resolve, reject) => {
                const sql = "delete from order_items where order_id=?";
                db.query(sql, [orderId], async (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    console.log("order_items Delete");
                    const prescriptionDelete = await new Promise(
                      (resolve, reject) => {
                        const sql = "delete from prescription where order_id=?";
                        db.query(sql, [orderId], async (err, result) => {
                          if (err) {
                            reject(err);
                          } else {
                            // Remove the order from the array (or mark it as canceled in the database)

                            const deleteOrder = await new Promise(
                              (resolve, reject) => {
                                const sql = "delete from orders where id=?";
                                db.query(sql, [orderId], (err, result) => {
                                  if (err) {
                                    reject(err);
                                  } else {
                                    console.log("orders Delete");
                                    //orders.push(result)
                                    // res.status(204).send('success');
                                    return res.json("success");
                                    //resolve(result);
                                  }
                                });
                              }
                            );
                          }
                        });
                      }
                    );
                    // Remove the order from the array (or mark it as canceled in the database)
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
// Remove product from cart
app.delete("/remove/cart/product/:id", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;

    const product_id = parseInt(req.params.id);
    try {
      // const { product_id, quantity } = product;
      const sql5 =
        "DELETE FROM carttable WHERE user_id = ? AND product_id = ?;";
      db.query(sql5, [user_id, product_id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return res.json("success");
        }
      });
    } catch (error) {
      console.log("Remove product from cart not working", error);
    }
  } else {
    res.send(500, "data not found");
  }
  // console.log(orderId)
  // const findOrder = await new Promise((resolve, reject) => {
  //     const sql = "select * from orders where id=?";
  //     db.query(sql, [orderId], async (err, result) => {
  //         if (err) {
  //             reject(err);
  //         } else {
  //             // console.log(result[0])
  //             // orders.push(result)
  //             // resolve(result);
  //             // Find the order in the orders array (or query the database in production)
  //             // const orderIndex = orders.findIndex((order) => order[0].id === orderId);

  //             if (result[0].id !== orderId) {

  //                 return res.status(404).json({ message: 'Order not found' });
  //             }

  //             // console.log(orderIndex)
  //             // const order = orders[orderIndex];
  //             if (!canCancelOrder(result[0])) {
  //                 // console.log('no')
  //                 // return res.status(400).json({ message: 'Order cannot be canceled at this time' })
  //                 return res.json(null);
  //             }

  //             // Remove the order from the array (or mark it as canceled in the database)
  //             const deletePayment = await new Promise((resolve, reject) => {
  //                 const sql = "delete from payments where order_id=?";
  //                 db.query(sql, [orderId], async (err, result) => {
  //                     if (err) {
  //                         reject(err);
  //                     } else {

  //                         console.log("payment Delete")

  //                         // Remove the order from the array (or mark it as canceled in the database)
  //                         const orderItems = await new Promise((resolve, reject) => {
  //                             const sql = "delete from order_items where order_id=?";
  //                             db.query(sql, [orderId], async (err, result) => {
  //                                 if (err) {
  //                                     reject(err);
  //                                 } else {
  //                                     console.log("order_items Delete")
  //                                     const prescriptionDelete = await new Promise((resolve, reject) => {
  //                                         const sql = "delete from prescription where order_id=?";
  //                                         db.query(sql, [orderId], async (err, result) => {
  //                                             if (err) {
  //                                                 reject(err);
  //                                             } else {
  //                                                 // Remove the order from the array (or mark it as canceled in the database)

  //                                                 const deleteOrder = await new Promise((resolve, reject) => {
  //                                                     const sql = "delete from orders where id=?";
  //                                                     db.query(sql, [orderId], (err, result) => {
  //                                                         if (err) {
  //                                                             reject(err);
  //                                                         } else {
  //                                                             console.log("orders Delete")
  //                                                             //orders.push(result)
  //                                                             // res.status(204).send('success');
  //                                                             return res.json('success');
  //                                                             //resolve(result);
  //                                                         }
  //                                                     });
  //                                                 });
  //                                             }
  //                                         });
  //                                     });
  //                                     // Remove the order from the array (or mark it as canceled in the database)

  //                                 }
  //                             });
  //                         });
  //                     }
  //                 });
  //             });

  //             //orders.splice(orderIndex, 1);

  //             // res.status(204).send('success');
  //         }
  //     });
  // });

  // console.log(orders)
});

app.patch("/profile", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const phone = req.body.phone;
    const sql1 = "UPDATE user_tbl SET `phone` = ? WHERE id = ?;";
    // req.session.user
    db.query(sql1, [phone, user_id], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json("Success");
    });
  } else {
    res.send(500, "data not found");
  }
});
app.patch("/profile/phone", async (req, res) => {
  if (req.session.user) {
    const sql = "UPDATE user_tbl SET `phone` = ? WHERE id = ?;";
    const user_id = req.session.user.id;
    // var user_id = 2;
    const values = [(phone = req.body.phone), user_id];
    try {
      db.query(sql, [phone, user_id], (err, data) => {
        if (err) {
          return res.json("Error");
        }
        return res.json(data);
      });
    } catch (error) {
      return res.json(error);
    }
  } else {
    res.send(500, "data not found");
  }
});

app.patch("/profile/address", async (req, res) => {
  if (req.session.user) {
    const sql =
      "UPDATE address SET `Village` =?,`P_O`=?,`City`=?,`district`=?,`state`=?,`pin`=?,`primaryaddress` = 'primary' where`user_id` = ?;";
    const user_id = req.session.user.id;
    // var user_id = 2;
    const values = [
      (Village = req.body.Village),
      (P_O = req.body.P_O),
      (City = req.body.City),
      (district = req.body.district),
      (State = req.body.State),
      (Pin = req.body.Pin),
      user_id,
    ];
    try {
      db.query(
        sql,
        [Village, P_O, City, district, State, Pin, user_id],
        (err, data) => {
          if (err) {
            return res.json(null);
          }
          // console.log(data)
          return res.json(data);
        }
      );
    } catch (error) {
      return res.json(error);
    }
  } else {
    res.status(404).send("data not found");
  }
});

app.post("/profile/address", async (req, res) => {
  if (req.session.user) {
    const sql =
      "insert into address (Village,P_O,City,district,state,pin,user_id)values(?,?,?,?,?,?,?);";
    const user_id = req.session.user.id;
    // var user_id = 2;
    const values = [
      (Village = req.body.Village),
      (P_O = req.body.P_O),
      (City = req.body.City),
      (district = req.body.district),
      (State = req.body.State),
      (Pin = req.body.Pin),
      user_id,
    ];
    try {
      db.query(
        sql,
        [Village, P_O, City, district, State, Pin, user_id],
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json(null);
          }
          // console.log(data)
          return res.json(data);
        }
      );
    } catch (error) {
      return res.json(error);
    }
  } else {
    res.status(404).send("data not found");
  }
});

// Example route to retrieve a specific order product
app.get("/order/:orderId/product/:productId", (req, res) => {
  if (req.session.user) {
    // const customerId = req.params.customerId;
    const orderId = req.params.orderId;
    const productId = req.params.productId;

    // Query the database to retrieve the product
    const sql =
      "SELECT  product_name , product_price  FROM product where product_id = ?";

    db.query(sql, [productId], (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        const product = results;
        res.json(product);
      }
    });
  } else {
    res.send(500, "data not found");
  }
});

// Logout route
app.post("/profile", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.json({ success: true, message: "Logout successful" });
  });
});

// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const mysql = require('mysql2');

// const app = express();
// const port = process.env.PORT || 3000;

// const db = mysql.createConnection({
//   host: 'your-db-host',
//   user: 'your-db-user',
//   password: 'your-db-password',
//   database: 'your-db-name',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to database');
// });

// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport.js configuration (local strategy)
// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     // Implement user authentication logic here (e.g., query the database)
//     // Check if the user is a super admin
//     if (username === 'superadmin' && password === 'superadminpassword') {
//       return done(null, { id: 1, username: 'superadmin' });
//     } else {
//       return done(null, false, { message: 'Incorrect username or password' });
//     }
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   // Fetch user data from the database
//   const sql = 'SELECT * FROM users WHERE id = ?';

//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       return done(err);
//     }
//     const user = results[0];
//     return done(null, user);
//   });
// });

// // ... Implement routes for user login and logout ...

// // Middleware to check if the user is a super admin
// function isSuperAdmin(req, res, next) {
//   if (req.isAuthenticated() && req.user && req.user.username === 'superadmin') {
//     return next();
//   }
//   res.redirect('/login'); // Redirect unauthorized users to the login page
// }

// // Route for super admin to view order details
// app.get('/superadmin/orders', isSuperAdmin, (req, res) => {
//   // Query the database for order details
//   const sql = 'SELECT * FROM orders';

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error querying database:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }

//     const orders = results;
//     res.json(orders);
//   });
// });

// // Route for super admin to accept an order
// app.post('/superadmin/orders/accept/:orderId', isSuperAdmin, (req, res) => {
//   const orderId = req.params.orderId;

//   // Update the order status in the database to indicate acceptance
//   const sql = 'UPDATE orders SET status = ? WHERE id = ?';

//   db.query(sql, ['accepted', orderId], (err) => {
//     if (err) {
//       console.error('Error updating order status:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }

//     res.json({ message: 'Order accepted' });
//   });
// });

// // Route for super admin to see payment details
// app.get('/superadmin/payments', isSuperAdmin, (req, res) => {
//   // Query the database for payment details
//   const sql = 'SELECT * FROM payments';

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error querying database:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }

//     const payments = results;
//     res.json(payments);
//   });
// });

// // ... Other routes ...

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

//admin page*****************************************************************************************************

function generateCouponCode(length) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let couponCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    couponCode += charset.charAt(randomIndex);
  }

  return couponCode;
}

app.post("/superadmin/generate-coupon", (req, res) => {
  const { length } = req.body; // Length of the coupon code
  const currentTime = new Date().toISOString().split("T")[0];
  const couponCode = generateCouponCode(length);
  values = [
    couponCode,
    req.body.discount_percentage,
    req.body.expiry_date,
    req.body.is_active,
    currentTime,
  ];
  // Store the coupon code in your database or return it as a response
  const sql =
    "insert into coupon (`coupon_code`,`discount_percentage`,`expiry_date`,`is_active`,`created_at`) values (?);";
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json("success");
  });
  // res.json({ couponCode });
});

app.get("/superadmin/userno", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 = "SELECT COUNT(*) as no FROM user_tbl;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

var UserCount = [];

app.get("/superadmin/userno/week", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +0 DAY);";
    const sql2 =
      "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +1 DAY);";
    const sql3 =
      "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +2 DAY);";
    const sql4 =
      "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +3 DAY);";
    const sql5 =
      "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +4 DAY);";
    const sql6 =
      "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +5 DAY);";
    const sql7 =
      "select COUNT(*) as no from user_tbl where  createdAt = DATE_SUB(CURDATE(), INTERVAL +6 DAY);";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      UserCount.push(data[0].no);
    });
    db.query(sql2, (err, data) => {
      if (err) {
        return res.json(err);
      }
      UserCount.push(data[0].no);
    });
    db.query(sql3, (err, data) => {
      if (err) {
        return res.json(err);
      }
      UserCount.push(data[0].no);
    });
    db.query(sql4, (err, data) => {
      if (err) {
        return res.json(err);
      }
      UserCount.push(data[0].no);
    });
    db.query(sql5, (err, data) => {
      if (err) {
        return res.json(err);
      }
      UserCount.push(data[0].no);
    });
    db.query(sql6, (err, data) => {
      if (err) {
        return res.json(err);
      }
      UserCount.push(data[0].no);
    });
    db.query(sql7, (err, data) => {
      if (err) {
        return res.json(err);
      }
      UserCount.push(data[0].no);
    });
    // console.log(UserCount)
    return res.json(UserCount);
  } else {
    res.status(500).send("data not found");
  }
});

var salesCount = [];

app.get("/superadmin/sales/week", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL + 0 DAY) and payments.payment_status = 'completed';";
    const sql2 =
      "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL + 1 DAY) and payments.payment_status = 'completed';";
    const sql3 =
      "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE)= DATE_SUB(CURDATE(), INTERVAL + 2 DAY) and payments.payment_status = 'completed';";
    const sql4 =
      "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL + 3 DAY) and payments.payment_status = 'completed';";
    const sql5 =
      "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL + 4 DAY) and payments.payment_status = 'completed';";
    const sql6 =
      "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL + 5 DAY) and payments.payment_status = 'completed';";
    const sql7 =
      "SELECT  COUNT(*) as no FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL + 6 DAY) and payments.payment_status = 'completed';";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      salesCount.push(data[0].no);
    });
    db.query(sql2, (err, data) => {
      if (err) {
        return res.json(err);
      }
      salesCount.push(data[0].no);
    });
    db.query(sql3, (err, data) => {
      if (err) {
        return res.json(err);
      }
      salesCount.push(data[0].no);
    });
    db.query(sql4, (err, data) => {
      if (err) {
        return res.json(err);
      }
      salesCount.push(data[0].no);
    });
    db.query(sql5, (err, data) => {
      if (err) {
        return res.json(err);
      }
      salesCount.push(data[0].no);
    });
    db.query(sql6, (err, data) => {
      if (err) {
        return res.json(err);
      }
      salesCount.push(data[0].no);
    });
    db.query(sql7, (err, data) => {
      if (err) {
        return res.json(err);
      }
      salesCount.push(data[0].no);
    });
    // console.log(salesCount)
    return res.json(salesCount);
  } else {
    res.status(500).send("data not found");
  }
});

var purchaseCount = [];

app.get("/superadmin/purchase/week", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +0 DAY) and payments.payment_status = 'pending';";
    const sql2 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +1 DAY) and payments.payment_status = 'pending';";
    const sql3 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +2 DAY) and payments.payment_status = 'pending';";
    const sql4 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +3 DAY) and payments.payment_status = 'pending';";
    const sql5 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +4 DAY) and payments.payment_status = 'pending';";
    const sql6 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +5 DAY) and payments.payment_status = 'pending';";
    const sql7 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where CAST(orders.order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +6 DAY) and payments.payment_status = 'pending';";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      purchaseCount.push(data[0].no);
    });
    db.query(sql2, (err, data) => {
      if (err) {
        return res.json(err);
      }
      purchaseCount.push(data[0].no);
    });
    db.query(sql3, (err, data) => {
      if (err) {
        return res.json(err);
      }
      purchaseCount.push(data[0].no);
    });
    db.query(sql4, (err, data) => {
      if (err) {
        return res.json(err);
      }
      purchaseCount.push(data[0].no);
    });
    db.query(sql5, (err, data) => {
      if (err) {
        return res.json(err);
      }
      purchaseCount.push(data[0].no);
    });
    db.query(sql6, (err, data) => {
      if (err) {
        return res.json(err);
      }
      purchaseCount.push(data[0].no);
    });
    db.query(sql7, (err, data) => {
      if (err) {
        return res.json(err);
      }
      purchaseCount.push(data[0].no);
    });
    // console.log(purchaseCount)
    return res.json(purchaseCount);
  } else {
    res.status(500).send("data not found");
  }
});

app.get("/superadmin/productno", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM product;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//show the product which quantity is less then equal 250
app.get("/superadmin/product/lowstock", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM product where product_quantity<=250;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//show the product which is expirying with in  1 month
app.get("/superadmin/product/expirying_ptoduct", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "  SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM product where expiry < DATE_SUB(CURDATE(), INTERVAL -1 MONTH);";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//Show the expiry product
app.get("/superadmin/product/expiry_product", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "SELECT COUNT(*) as no, sum(product_price*product_quantity) as price FROM product where expiry < CURDATE();";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

//show the product which is purchase with in  1 month
app.get("/superadmin/product/purchase_monthly", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 MONTH) and payments.payment_status = 'pending';";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

//show the product which is purchase with in  1 Year
app.get("/superadmin/product/purchase_yearly", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  where orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 YEAR) and payments.payment_status = 'pending';";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

//show the product which is purchase with in  1 month
app.get("/superadmin/product/sales_monthly", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      " SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id   where orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 MONTH) and payments.payment_status = 'complete';";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

//show the product which is sales with in  1 Year
app.get("/superadmin/product/sales_yearly", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "SELECT  COUNT(*) as no, sum(product_price*product_quantity) as price FROM  product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON payments.order_id = orders.id  where orders.order_date < DATE_SUB(CURDATE(), INTERVAL -1 YEAR) and payments.payment_status = 'complete';";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

app.get("/superadmin/ordersno", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 = "SELECT COUNT(*) as no FROM orders;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

var orderCount = [];
app.get("/superadmin/ordersno/week", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      "select COUNT(*) as no from orders where  CAST(order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +0 DAY);";
    const sql2 =
      "select COUNT(*) as no from orders where  CAST(order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +1 DAY);";
    const sql3 =
      "select COUNT(*) as no from orders where  CAST(order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +2 DAY);";
    const sql4 =
      "select COUNT(*) as no from orders where  CAST(order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +3 DAY);";
    const sql5 =
      "select COUNT(*) as no from orders where  CAST(order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +4 DAY);";
    const sql6 =
      "select COUNT(*) as no from orders where  CAST(order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +5 DAY);";
    const sql7 =
      "select COUNT(*) as no from orders where  CAST(order_date AS DATE) = DATE_SUB(CURDATE(), INTERVAL +6 DAY);";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      orderCount.push(data[0].no);
    });
    db.query(sql2, (err, data) => {
      if (err) {
        return res.json(err);
      }
      orderCount.push(data[0].no);
    });
    db.query(sql3, (err, data) => {
      if (err) {
        return res.json(err);
      }
      orderCount.push(data[0].no);
    });
    db.query(sql4, (err, data) => {
      if (err) {
        return res.json(err);
      }
      orderCount.push(data[0].no);
    });
    db.query(sql5, (err, data) => {
      if (err) {
        return res.json(err);
      }
      orderCount.push(data[0].no);
    });
    db.query(sql6, (err, data) => {
      if (err) {
        return res.json(err);
      }
      orderCount.push(data[0].no);
    });
    db.query(sql7, (err, data) => {
      if (err) {
        return res.json(err);
      }
      orderCount.push(data[0].no);
    });
    return res.json(orderCount);
    // console.log(UserCount)
  } else {
    res.status(500).send("data not found");
  }
});

app.get("/superadmin/serviceproviderno", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 = "SELECT COUNT(*) as no FROM sub_admin;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

app.get("/superadmin/product", async (req, res) => {
  if (req.session.user) {
    try {
      const user_id = req.session.user.id;
      const query = " select * from product;";
      const productResults = await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
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
        // console.log(images);
        return res.json([productResults, images]);
      } else {
        return res.json([]); // Return an empty response if no doctor details found
      }
    } catch (error) {
      console.error("Error: ", error);
      return res
        .status(500)
        .json({ error: "Error retrieving product details from the database" });
    }
  } else {
    return res.status(500).send("Data not found");
  }
});

app.get("/superadmin/orders", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      " SELECT orders.id,orders.role, product.product_id , user_id,order_date,status,payment_status,payment_type,expected_delivery_date  FROM product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON orders.id = payments.order_id  ";
    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
app.get("/superadmin/user", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 = " select * from user_tbl;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
app.get("/superadmin/payments", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      " select payment_id,user_id,order_id,payment_date,total_amount,payment_status,payment_type FROM payments INNER JOIN orders ON payments.order_id = orders.id;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//This for all Service Providers data
app.get("/superadmin/service-provider", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 = "select * from sub_admin;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//This for all Partners Data
app.get("/superadmin/partner", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 = "select * from b2c_partner;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//This for all Delivery Partners Data
app.get("/superadmin/delivery_partner", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 = "select * from delivery_partner;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//coupon
app.get("/superadmin/coupon", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 = "select * from coupon;";

    db.query(sql1, (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

// app.delete('/superadmin/delete/:product_id', (req, res) => {
//     if (req.session.user) {
//         const user_id = req.session.user.id
//         console.log(req.session.user)
//         const productId = req.params.productId;
//         const sql1 = "delete from product where product_id = ?;";

//         db.query(sql1, [productId], (err, data) => {
//             if (err) {
//                 return res.json(err);
//             }
//             else {
//                 res.json("success");
//             }
//         })
//     } else {
//         res.status(500).send("data not found")
//     }
// })
app.delete("/superadmin/delete/:productId", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const productId = req.params.productId;
    console.log(`Deleting product with ID: ${productId}`);
    const sql = "SET FOREIGN_KEY_CHECKS=0;";
    const sql1 = "delete from product where product_id = ?;";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        db.query(sql1, [productId], (err, data) => {
          if (err) {
            console.error(err);
            return res.json(err);
          } else {
            // console.log(`Product with ID ${productId} deleted successfully.`);
            return res.json("success");
          }
        });
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//Delete Partner Commission by super admin
app.delete("/superadmin/delete/commission/:commission_id", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const commission_id = req.params.commission_id;
    // console.log(`Deleting Commission with ID: ${commission_id}`);
    const sql = "SET FOREIGN_KEY_CHECKS=0;";
    const sql1 = "delete from partner_services where id = ?;";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        db.query(sql1, [commission_id], (err, data) => {
          if (err) {
            console.error(err);
            return res.json(err);
          } else {
            // console.log(`Product with ID ${commission_id} deleted successfully.`);
            return res.json("success");
          }
        });
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//Delete Partner Commission by super admin
app.delete(
  "/superadmin/delete/delivery/commission/:commission_id",
  (req, res) => {
    if (req.session.user) {
      const user_id = req.session.user.id;
      const commission_id = req.params.commission_id;
      // console.log(`Deleting Commission with ID: ${commission_id}`);
      const sql = "SET FOREIGN_KEY_CHECKS=0;";
      const sql1 = "delete from delivery_partner_services where id = ?;";
      db.query(sql, (err, data) => {
        if (err) {
          return res.json(err);
        } else {
          db.query(sql1, [commission_id], (err, data) => {
            if (err) {
              console.error(err);
              return res.json(err);
            } else {
              // console.log(`Product with ID ${commission_id} deleted successfully.`);
              return res.json("success");
            }
          });
        }
      });
    } else {
      res.status(500).send("data not found");
    }
  }
);
app.delete("/superadmin/delete/coupon/:coupon_id", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const coupon_id = req.params.coupon_id;
    // console.log(`Deleting coupon with ID: ${coupon_id}`);
    const sql = "SET FOREIGN_KEY_CHECKS=0;";
    const sql1 = "delete from coupon where id = ?;";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        db.query(sql1, [coupon_id], (err, data) => {
          if (err) {
            console.error(err);
            return res.json(err);
          } else {
            // console.log(`coupon with ID ${coupon_id} deleted successfully.`);
            return res.json("success");
          }
        });
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

//add new product by super admin

app.post("/superadmin/addproduct", async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  const sql =
    "Insert into product (`product_name`,`product_price`,`product_quantity`,`category`,`discount`,`description`,`fulldesctiption`,`manufacturing`,`expiry`,`DrugOrNot`,`AddedAt`,`fromOfMedicine`,`typeOfMedicine`,`moleculesName`,`manufacturing_Company_Name`,`sgst`,`cgst`,`productImageId`) values(?)";

  const values = [
    req.body.product_name,
    req.body.product_price,
    req.body.product_quantity,
    req.body.category,
    req.body.discount,
    req.body.description,
    req.body.fulldesctiption,
    req.body.manufacturing,
    req.body.expiry,
    req.body.dragornot,
    date,
    req.body.fromOfMedicine,
    req.body.typeOfMedicine,
    req.body.manufacturing_Company_Name,
    req.body.moleculesName,
    req.body.sgst,
    req.body.cgst,
    req.body.productImageId,
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
//add new partner Commission by super admin

app.post("/superadmin/add-commission", async (req, res) => {
  const sql =
    "Insert into partner_services (`service_type`,`commision_type`,`commision`) values(?)";

  const values = [
    req.body.service_type,
    req.body.commision_type,
    req.body.commision,
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
//add new delivery Commission by super admin

app.post("/superadmin/delivery/add-commission", async (req, res) => {
  const sql =
    "Insert into delivery_partner_services (`service_type`,`commision_type`,`commision`) values(?)";

  const values = [
    req.body.service_type,
    req.body.commision_type,
    req.body.commision,
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
//Update Commission by super admin

app.post("/superadmin/update-commission/:commission_id", async (req, res) => {
  const sql =
    "UPDATE partner_services SET service_type = ?, commision_type = ?, commision = ? WHERE id = ?;";
  const id = req.params.commission_id;
  // const values = [
  //     req.body.service_type,
  //     req.body.commision_type,
  //     req.body.commision,
  //     id
  // ]
  // console.log(values)
  try {
    db.query(
      sql,
      [req.body.service_type, req.body.commision_type, req.body.commision, id],
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json("Error");
        }
        return res.json("success");
      }
    );
  } catch (error) {
    return res.json(error);
  }
});
//Update delivery persion Commission by super admin

app.post(
  "/superadmin/delivery/update-commission/:commission_id",
  async (req, res) => {
    const sql =
      "UPDATE delivery_partner_services SET service_type = ?, commision_type = ?, commision = ? WHERE id = ?;";
    const id = req.params.commission_id;
    // const values = [
    //     req.body.service_type,
    //     req.body.commision_type,
    //     req.body.commision,
    //     id
    // ]
    // console.log(values)
    try {
      db.query(
        sql,
        [
          req.body.service_type,
          req.body.commision_type,
          req.body.commision,
          id,
        ],
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json("Error");
          }
          return res.json("success");
        }
      );
    } catch (error) {
      return res.json(error);
    }
  }
);

app.patch("/superadmin/updateproduct/:product_id", async (req, res) => {
  const sql =
    "UPDATE product SET `product_name` =?,`product_price`=?,`product_quantity`=?,`category`=?,`discount`=? ,`description`=? ,`manufacturing`=?,`expiry`=?,`DrugOrNot`=?where`product_id` = ?;";

  const values = [
    (product_name = req.body.product_name),
    (product_price = req.body.product_price),
    (product_quantity = req.body.product_quantity),
    (category = req.body.category),
    (discount = req.body.discount),
    (description = req.body.description),
    (manufacturing = req.body.manufacturing),
    (expiry = req.body.expiry),
    (dragornot = req.body.dragornot),
    (id = req.body.product_id),
  ];

  try {
    db.query(
      sql,
      [
        product_name,
        product_price,
        product_quantity,
        category,
        discount,
        description,
        manufacturing,
        expiry,
        dragornot,
        id,
      ],
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        return res.json("success");
      }
    );
  } catch (error) {
    return res.json(error);
  }
});

// Route for super admin to accept an order
app.post("/superadmin/orders/accept/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  // Update the order status in the database to indicate acceptance
  const sql = "UPDATE orders SET status = ? WHERE id = ?";

  db.query(sql, ["accepted", orderId], (err) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.json({ message: "Order accepted" });
  });
});
// Route for super admin to view product details
app.get("/superadmin/orders/product/:product_id", (req, res) => {
  const product_id = req.params.product_id;

  // View Product details by id
  const sql = "select * from product where product_id =?";

  db.query(sql, [product_id], (err, data) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(data);
  });
});
// Route for super admin to view product details
app.get("/superadmin/orders/order/:order_id", (req, res) => {
  const order_id = req.params.order_id;

  // View Product details by id
  const sql =
    "SELECT orders.id, product.product_id , user_id,order_date,status,payment_status,payment_type ,product_name,product_price,description,assign_delivery_persion_id,expected_delivery_date FROM product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON orders.id = payments.order_id where orders.id = ? ";

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
app.get("/superadmin/orders/customer/:customer_id", (req, res) => {
  const user_id = req.params.customer_id;

  const sql =
    "SELECT  id ,name ,phone , address_id ,Village ,P_O,City,district,State,Pin FROM user_tbl INNER JOIN address ON user_tbl.id = address.user_id and user_tbl.id = ?;";
  const sql1 = "SELECT  id ,name ,phone  FROM user_tbl where user_tbl.id = ?;";

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      //  res.json("Success");
      return res.json([data[0]]);
    } else {
      db.query(sql1, [user_id], (err, data) => {
        if (err) {
          return res.json(err);
        }
        if (data.length > 0) {
          //  res.json("Success");
          return res.json([data[0]]);
        } else {
          return res.json("Faile");
        }
      });
    }
  });
});
//update delivery date
app.post("/superadmin/orders/delivery/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const values = [(expected_delivery_date = req.body.expected_delivery_date)];
  // Update the order Delivery Date in the database to indicate acceptance
  const sql =
    "UPDATE `orders` SET `expected_delivery_date` = ? WHERE `id` = ?;";
  try {
    db.query(sql, [expected_delivery_date, orderId], (err) => {
      if (err) {
        console.error("Error updating order status:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json({ message: "Order Delivery Date is Given" });
    });
  } catch (error) {
    res.status(500).sendStatus("Internal Server Error");
  }
});
//update Order details
app.post("/superadmin/update/order", (req, res) => {
  const values = [
    (order_id = req.body.order_id),
    (orderstatus = req.body.orderstatus),
    (expected_delivery_date = req.body.expected_delivery_date),
    (assigndeliverypersion = req.body.assigndeliverypersion),
  ];
  // Update the order Delivery Date in the database to indicate acceptance
  const sql =
    "UPDATE `orders` SET `expected_delivery_date` = ? , `status` = ? , `assign_delivery_persion_id` = ?  WHERE `id` = ?;";
  try {
    db.query(
      sql,
      [expected_delivery_date, orderstatus, assigndeliverypersion, order_id],
      (err) => {
        if (err) {
          console.error("Error updating order status:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res.json("success");
      }
    );
  } catch (error) {
    res.status(500).sendStatus("Internal Server Error");
  }
});

app.get("/superadmin/subadmin/products/:user_id", (req, res) => {
  if (req.session.user) {
    // const user_id = req.session.user.id
    const user_id = req.params.user_id;
    // console.log(user_id)
    const sql1 =
      " select product.product_id , product_name,product_price,discount,DrugOrNot,manufacturing,expiry,product_quantity,description from product  INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ? ";

    db.query(sql1, [user_id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
app.get("/superadmin/subadmin/orders/:user_id", (req, res) => {
  if (req.session.user) {
    // const user_id = req.session.user.id
    const user_id = req.params.user_id;
    // console.log(user_id)
    const sql1 =
      " SELECT orders.id, product.product_id , user_id,order_date,status,payment_status,payment_type  FROM product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON orders.id = payments.order_id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = ?";

    // const sql1 = " select product.product_id , product_name,product_price,discount,DrugOrNot,manufacturing,expiry,product_quantity,description from product  INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ? ";

    db.query(sql1, [user_id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

//Sub Admin

app.post("/sub-admin/signup", async (req, res) => {
  const sql =
    "Insert into sub_admin (`name`,`phone`,`password`,`permission`,`role`) values(?)";
  const sql2 = "select * from sub_admin where `phone` = ?";
  const password = req.body.password;
  // console.log(req.body)
  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const values = [
      req.body.name,
      req.body.phone,
      hash,
      "Not_Approve",
      req.body.role,
    ];
    try {
      db.query(sql2, [req.body.phone], (err, data) => {
        if (err) {
          return res.json("Error");
        } else if (data.length > 0) {
          return res.json(null);
        } else {
          db.query(sql, [values], (err, data) => {
            if (err) {
              console.log(err);
              return res.json(null);
            }
            return res.json(data);
          });
        }
      });
    } catch (error) {
      return res.json(error);
    }
  });
});
app.post("/sub_admin/complete_profile", async (req, res) => {
  try {
    // const sql = "Insert into sub_admin (`LicenceImageId`,`SubAdminImageId`) values(?) where id = ?;";
    const sql =
      "UPDATE sub_admin SET LicenceImageId = ?, SubAdminImageId= ? WHERE id = ?;";
    // const values = [
    //     req.body.LicenceImageId,
    //     req.body.SubAdminImageId
    // ]
    try {
      db.query(
        sql,
        [
          req.body.LicenceImageId,
          req.body.SubAdminImageId,
          req.body.subadmin_id,
        ],
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json(null);
          }
          // console.log('success img')
          // return res.json(data);
        }
      );
    } catch (error) {
      return res.json(error);
    }
    const address = [
      req.body.Village,
      req.body.P_O,
      req.body.City,
      req.body.district,
      req.body.state,
      req.body.pin,
    ];
    const createAddress = await new Promise((resolve, reject) => {
      const sql =
        "insert into address (Village,P_O,City,district,state,pin)values(?);";
      db.query(sql, [address], (err, result) => {
        if (err) {
          reject(err);
        } else {
          // console.log(result.insertId);
          // console.log('success address')
          resolve(result.insertId);
        }
      });
    });
    const insertAddressSubAdmin = await new Promise((resolve, reject) => {
      const sql1 =
        "insert into address_sub_admin (address_id,sub_admin_id)values(?,?);";
      db.query(sql1, [createAddress, req.body.subadmin_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          // console.log('success address id')
          // return res.json('success')
        }
      });
    });
    const createdAt = new Date().toISOString().split("T")[0];

    const sub_admin_details = [
      req.body.subadmin_id,
      req.body.landmark,
      req.body.OpeningTime,
      req.body.CloseingTime,
      req.body.Reg_id,
      req.body.description,
      createdAt,
    ];
    const insertSubAdminDetails = await new Promise((resolve, reject) => {
      const sql =
        "insert into sub_admin_details (sub_admin_id,Landmark,OpeningTime,CloseingTime,Reg_id,description,createdAt)values(?);";
      db.query(sql, [sub_admin_details], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // console.log(result.insertId);
          // console.log('success details')
          resolve(result.insertId);
          // return res.json('success')
          return res.json("success");
        }
      });
    });
    //     if (req.body.role.toLowerCase() === 'doctor') {
    //         const insertDoctorDetails = await new Promise((resolve, reject) => {
    //             const clinic_id = req.body.subadmin_id;
    //             const user_role = req.body.role;

    //             const doc_name = req.body.fullname;
    //             const doc_desc = req.body.description;
    //             const location = req.body.landmark;
    //             const clinic = req.body.clinic;
    //             const clinic_desc = req.body.clinic_desc;
    //             const day_of_week = req.body.day_of_week;
    //             const start_time = req.body.OpeningTime;
    //             const end_time = req.body.CloseingTime;
    //             const doctor_imageId = req.body.SubAdminImageId;

    //             if (!doc_name || !doc_desc || !location || !clinic || !clinic_desc || !start_time || !end_time || !doctor_imageId) {
    //                 return res.status(400).json({ error: 'Missing data in the request body' });
    //             }

    //             const query = `
    //     INSERT INTO doctors_details (doc_name, doc_desc, location, clinic, clinic_desc, clinic_id,day_of_week,start_time,end_time,doctor_imageId,type)
    //     VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?)
    // `;

    //             const values = [doc_name, doc_desc, location, clinic, clinic_desc, clinic_id, day_of_week, start_time, end_time, doctor_imageId, user_role];

    //             db.query(query, values, (err, result) => {
    //                 if (err) {
    //                     console.error('Error inserting data: ' + err.message);
    //                     return res.status(500).json({ error: 'Error inserting data into the database' });
    //                 } else {
    //                     console.log('Data inserted successfully');
    //                     return res.json('success');
    //                     // return res.status(200).json({ message: 'Data inserted successfully' });
    //                 }
    //             });
    //         });
    //     }
  } catch (error) {
    console.log(error);
  }
});

app.post("/sub-admin/login", (req, res) => {
  const sql = "Select * from sub_admin where `phone` = ? ";

  db.query(sql, [req.body.phone], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      if (data[0].permission === "Not_Approve") {
        return res.json("Not_Approve");
      } else {
        // console.log(data)
        bcrypt.compare(
          req.body.password.toString(),
          data[0].password,
          (err, response) => {
            if (err) {
              return res.json(err);
            }
            if (response) {
              // console.log(data[0])
              // const id = data[0].id;
              // const token = jwt.sign((id),"jwt-secret-key",{expiresIn: '1d'});
              // res.cookie('token', token);
              req.session.loggedIn = true; // Set a session variable
              // req.session.phone = data[0].phone; // Store user information in the session
              req.session.user = data[0];
              //console.log(req.session.user)
              req.session.save();
              // res.send("User Login ss")
              // console.log(data[0])
              return res.json([req.session.user, req.session.loggedIn]);
            } else {
              res.json(null);
            }
          }
        );
      }
    } else {
      return res.json(null);
    }
  });
});

// Route for super admin to Give Permission to an Sub Admin
app.post("/superadmin/subadmin/accept/:subAdminId", (req, res) => {
  const subAdminId = req.params.subAdminId;

  // Update the order status in the database to indicate acceptance
  const sql = "UPDATE sub_admin SET permission = ? WHERE id = ?";

  db.query(sql, ["Approve", subAdminId], (err) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.json({ message: "Permission Garented" });
  });
});
// Route for super admin to Give Permission to an Partner
app.post("/superadmin/partner/accept/:partner_id", (req, res) => {
  const partner_id = req.params.partner_id;

  // Update the order status in the database to indicate acceptance
  const sql = "UPDATE b2c_partner SET permission = ? WHERE id = ?";

  db.query(sql, ["Approved", partner_id], (err) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.json({ message: "Permission Garented" });
  });
});
// Route for super admin to Give Permission to a delivery Partner
app.post(
  "/superadmin/delivery_partner/accept/:delivery_partner_id",
  (req, res) => {
    const partner_id = req.params.delivery_partner_id;
    // Update the order status in the database to indicate acceptance
    const sql = "UPDATE delivery_partner SET permission = ? WHERE id = ?";

    db.query(sql, ["Approved", partner_id], (err) => {
      if (err) {
        console.error("Error updating order status:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ message: "Permission Garented" });
    });
  }
);

app.get("/madicine/medicineshops", async (req, res) => {
  try {
    // const user_id = req.session.user.id;
    const query =
      "SELECT * FROM sub_admin where role = 'Medicine Shop' and permission = 'Approve'";
    const subResults = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (subResults.length > 0) {
      const imagesPromises = subResults.map((sub_admin) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [sub_admin.SubAdminImageId], (err, result) => {
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
      // console.log(images);
      return res.json([subResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }

  // const sql = "SELECT * FROM sub_admin";

  // db.query(sql, (err, data) => {
  //     if (err) {
  //         return res.json(err);
  //     }
  //     if (data.length > 0) {
  //         //  res.json("Success");
  //         return res.json(data);
  //     } else {
  //         // console.log(data)
  //         return res.json("Faile");
  //     }

  // });
});

// All Labs
app.get("/laboratory/laboratorys", async (req, res) => {
  try {
    // const user_id = req.session.user.id;
    const query =
      "SELECT sub_admin.id,name,phone,role,LicenceImageId,SubAdminImageId,description,landmark,OpeningTime,CloseingTime,city FROM sub_admin inner join sub_admin_details On sub_admin.id = sub_admin_details.sub_admin_id inner join address_sub_admin On sub_admin.id = address_sub_admin.sub_admin_id inner join address On address_sub_admin.address_id = address.address_id  where role = 'Laboratory' and permission = 'Approve';";
    const subResults = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (subResults.length > 0) {
      const imagesPromises = subResults.map((sub_admin) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [sub_admin.SubAdminImageId], (err, result) => {
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
      // console.log(images);
      return res.json([subResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }

  // const sql = "SELECT * FROM sub_admin";

  // db.query(sql, (err, data) => {
  //     if (err) {
  //         return res.json(err);
  //     }
  //     if (data.length > 0) {
  //         //  res.json("Success");
  //         return res.json(data);
  //     } else {
  //         // console.log(data)
  //         return res.json("Faile");
  //     }

  // });
});
// Particular Laboratory
app.get("/particular-laboratory/:client_id", async (req, res) => {
  const client_id = req.params.client_id;
  //  console.log(client_id);
  try {
    // const user_id = req.session.user.id;
    const query =
      "SELECT sub_admin.id,name,phone,role,LicenceImageId,SubAdminImageId,landmark,description,OpeningTime,CloseingTime,city,Village,P_O,district,State,Pin FROM sub_admin inner join sub_admin_details On sub_admin.id = sub_admin_details.sub_admin_id inner join address_sub_admin On sub_admin.id = address_sub_admin.sub_admin_id inner join address On address_sub_admin.address_id = address.address_id  where sub_admin.id = ?;";
    const subResults = await new Promise((resolve, reject) => {
      db.query(query, [client_id], (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (subResults.length > 0) {
      const imagesPromises = subResults.map((sub_admin) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [sub_admin.SubAdminImageId], (err, result) => {
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
      // console.log([subResults, images]);
      return res.json([subResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }

  // const sql = "SELECT * FROM sub_admin";

  // db.query(sql, (err, data) => {
  //     if (err) {
  //         return res.json(err);
  //     }
  //     if (data.length > 0) {
  //         //  res.json("Success");
  //         return res.json(data);
  //     } else {
  //         // console.log(data)
  //         return res.json("Faile");
  //     }

  // });
});

//All Lab Tests
app.get("/laboratory/lab_tests", async (req, res) => {
  try {
    // const user_id = req.session.user.id;
    const query =
      "select  Test_id, Test_Name ,Test_Desc,Clinic_id,test_imageId,Landmark,Price from laboratory_tests_details INNER JOIN sub_admin ON sub_admin.id = laboratory_tests_details.clinic_id INNER JOIN sub_admin_details ON sub_admin.id = sub_admin_details.sub_admin_id ;";
    const subResults = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (subResults.length > 0) {
      const imagesPromises = subResults.map((sub_admin) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [sub_admin.test_imageId], (err, result) => {
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
      // console.log([subResults, images]);
      return res.json([subResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }

  // const sql = "SELECT * FROM sub_admin";

  // db.query(sql, (err, data) => {
  //     if (err) {
  //         return res.json(err);
  //     }
  //     if (data.length > 0) {
  //         //  res.json("Success");
  //         return res.json(data);
  //     } else {
  //         // console.log(data)
  //         return res.json("Faile");
  //     }

  // });
});
app.get("/book/lab-test/:id", async (req, res) => {
  const Test_id = req.params.id;

  // console.log(Test_id)
  // console.log(param.id)
  try {
    // const user_id = req.session.user.id;
    const query =
      "select  Test_id, Test_Name ,Test_Desc,Clinic_id,Price,test_imageId,Landmark from laboratory_tests_details INNER JOIN sub_admin ON sub_admin.id = laboratory_tests_details.clinic_id INNER JOIN sub_admin_details ON sub_admin.id = sub_admin_details.sub_admin_id where Test_id = ?;";
    const subResults = await new Promise((resolve, reject) => {
      db.query(query, [Test_id], (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (subResults.length > 0) {
      const imagesPromises = subResults.map((sub_admin) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [sub_admin.test_imageId], (err, result) => {
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
      // console.log([subResults, images]);
      return res.json([subResults, images]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }

  // const sql = "SELECT * FROM sub_admin";

  // db.query(sql, (err, data) => {
  //     if (err) {
  //         return res.json(err);
  //     }
  //     if (data.length > 0) {
  //         //  res.json("Success");
  //         return res.json(data);
  //     } else {
  //         // console.log(data)
  //         return res.json("Faile");
  //     }

  // });
});
app.get("/madicine/medicineshops/:location", (req, res) => {
  // console.log(req.params.location)
  const location = req.params.location;
  const sql =
    "SELECT  sub_admin.id ,name ,phone ,role, address_sub_admin.address_id ,Village ,P_O,City,district,State,Pin  FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id where address.City = ?";

  db.query(sql, [location], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      //  res.json("Success");
      // console.log(data)
      return res.json(data);
    } else {
      return res.json("Faile");
    }
  });
});

app.get("/sub-admin/home/profile", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql =
      "SELECT  sub_admin.id ,name ,phone ,role,SubAdminImageId,LicenceImageId,address_sub_admin.address_id ,Village ,P_O,City,district,State,Pin  FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id and sub_admin.id = ?;";
    const sql1 =
      "SELECT  id ,name ,phone ,role FROM sub_admin where sub_admin.id = ?;";

    db.query(sql, [user_id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        const sql = "SELECT * FROM images where id = ?";

        db.query(sql, [data[0].SubAdminImageId], (err, result) => {
          if (err) {
            console.error("Database error: " + err);
            res.status(500).json({ error: "Database error." });
          } else {
            // res.json(result);
            return res.json([data[0], true, result]);
          }
        });

        //  res.json("Success");
      } else {
        db.query(sql1, [user_id], (err, data) => {
          if (err) {
            return res.json(err);
          }
          if (data.length > 0) {
            //  res.json("Success");
            return res.json([data[0], false]);
          } else {
            return res.json("Faile");
          }
        });
      }
    });
  }
});

app.patch("/sub-admin/home/phone", async (req, res) => {
  if (req.session.user) {
    const sql = "UPDATE sub_admin SET `phone` = ? WHERE id = ?;";
    const user_id = req.session.user.id;
    // var user_id = 2;
    const values = [(phone = req.body.phone), user_id];
    try {
      db.query(sql, [phone, user_id], (err, data) => {
        if (err) {
          return res.json("Error");
        }
        return res.json(data);
      });
    } catch (error) {
      return res.json(error);
    }
  } else {
    res.send(500, "data not found");
  }
});

app.patch("/sub-admin/home/address", async (req, res) => {
  if (req.session.user) {
    const sql =
      "UPDATE address SET `Village` =?,`P_O`=?,`City`=?,`district`=?,`state`=?,`pin`=? where`user_id` = ?;";
    const user_id = req.session.user.id;
    // var user_id = 2;
    const values = [
      (Village = req.body.Village),
      (P_O = req.body.P_O),
      (City = req.body.City),
      (district = req.body.district),
      (State = req.body.State),
      (Pin = req.body.Pin),
      user_id,
    ];
    try {
      db.query(
        sql,
        [Village, P_O, City, district, State, Pin, user_id],
        (err, data) => {
          if (err) {
            return res.json("Error");
          }
          return res.json(data);
        }
      );
    } catch (error) {
      return res.json(error);
    }
  } else {
    res.send(500, "data not found");
  }
});

app.post("/sub-admin/home/address", async (req, res) => {
  if (req.session.user) {
    // const sql = "insert into address (Village,P_O,City,district,state,pin,user_id)values(?,?,?,?,?,?,?);";
    // const sql1 = "insert into address_sub_admin (address_id,sub_admin_id)values(?,?);";
    const user_id = req.session.user.id;
    // var user_id = 2;
    const values = [
      req.body.Village,
      req.body.P_O,
      req.body.City,
      req.body.district,
      req.body.State,
      req.body.Pin,
    ];
    const createAddress = await new Promise((resolve, reject) => {
      const sql =
        "insert into address (Village,P_O,City,district,state,pin,user_id)values(?,?,?,?,?,?,?);";
      db.query(sql, [values], (err, result) => {
        if (err) {
          reject(err);
        } else {
          // console.log(result.insertId);
          resolve(result.insertId);
        }
      });
    });
    const insertAddressSubAdmin = await new Promise((resolve, reject) => {
      const sql1 =
        "insert into address_sub_admin (address_id,sub_admin_id)values(?,?);";
      db.query(sql1, [createAddress, req.session.user.id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          return res.json("success");
        }
      });
    });
  } else {
    res.status(404).send("data not found");
  }
});

app.post("/sub-admin/home/addproduct", async (req, res) => {
  if (req.session.user) {
    const date = new Date().toISOString().split("T")[0];
    // const sql = "Insert into product (`product_name`,`product_price`,`product_quantity`,`category`,`discount`,`description`,`manufacturing`,`expiry`,`DrugOrNot`,`AddedAt`,`fromOfMedicine`,`typeOfMedicine`,`sgst`,`cgst`,`productImageId`) values(?)";

    const values = [
      req.body.product_name,
      req.body.product_price,
      req.body.product_quantity,
      req.body.category,
      req.body.discount,
      req.body.description,
      req.body.fulldesctiption,
      req.body.manufacturing,
      req.body.expiry,
      req.body.dragornot,
      date,
      req.body.fromOfMedicine,
      req.body.typeOfMedicine,
      req.body.sgst,
      req.body.cgst,
      req.body.manufacturing_Company_Name,
      req.body.moleculesName,
      req.body.productImageId,
    ];

    const creatProduct = await new Promise((resolve, reject) => {
      const date = new Date().toISOString().split("T")[0];
      const sql =
        "Insert into product (`product_name`,`product_price`,`product_quantity`,`category`,`discount`,`description`,`fulldesctiption`,`manufacturing`,`expiry`,`DrugOrNot`,`AddedAt`,`fromOfMedicine`,`typeOfMedicine`,`moleculesName`,`manufacturing_Company_Name`,`sgst`,`cgst`,`productImageId`) values(?)";
      db.query(sql, [values], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });

    const addProductIdProduct_sub_admin = await new Promise(
      (resolve, reject) => {
        const sql =
          "Insert into product_sub_admin(`product_id`,`sub_admin_id`)  values(?,?)";
        db.query(sql, [creatProduct, req.session.user.id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
            return res.json("success");
          }
        });
      }
    );
  } else {
    res.status(404).send("data not found");
  }
});
app.patch("/sub-admin/home/updateproduct/:product_id", async (req, res) => {
  const sql =
    "UPDATE product SET `product_name` =?,`product_price`=?,`product_quantity`=?,`category`=?,`discount`=? ,`description`=? ,`manufacturing`=?,`expiry`=?,`DrugOrNot`=?where`product_id` = ?;";

  const values = [
    (product_name = req.body.product_name),
    (product_price = req.body.product_price),
    (product_quantity = req.body.product_quantity),
    (category = req.body.category),
    (discount = req.body.discount),
    (description = req.body.description),
    (manufacturing = req.body.manufacturing),
    (expiry = req.body.expiry),
    (dragornot = req.body.dragornot),
    (id = req.body.product_id),
  ];

  try {
    db.query(
      sql,
      [
        product_name,
        product_price,
        product_quantity,
        category,
        discount,
        description,
        manufacturing,
        expiry,
        dragornot,
        id,
      ],
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        return res.json("success");
      }
    );
  } catch (error) {
    return res.json(error);
  }
});

app.get("/sub-admin/product", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      " select product.product_id , product_name,product_price,discount,DrugOrNot,manufacturing,expiry,product_quantity,description from product  INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ? ";

    db.query(sql1, [user_id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
app.get("/medicineshop/products/:id", async (req, res) => {
  const id = req.params.id;
  const query =
    " select * from product  INNER JOIN product_sub_admin ON product.product_id = product_sub_admin.product_id where sub_admin_id = ? ";
  const query1 = " SELECT * FROM hh_dev_db.sub_admin where id = ?;";
  try {
    const medicineShop = await new Promise((resolve, reject) => {
      db.query(query1, [id], (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          resolve(result);
        }
      });
    });
    let medicineShopimages;

    if (medicineShop.length > 0) {
      const imagesPromises = medicineShop.map((mshop) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [mshop.SubAdminImageId], (err, result) => {
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
      medicineShopimages = await Promise.all(imagesPromises);
    }
    const productResults = await new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
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
      // console.log(images);
      return res.json([
        productResults,
        images,
        medicineShop,
        medicineShopimages,
      ]);
    } else {
      return res.json([]); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving product details from the database" });
  }

  db.query(sql1, [user_id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      //  res.json("Success");
      return res.json(data);
    } else {
      return res.json(null);
    }
  });
});

app.delete("/sub-admin/home/delete/:productId", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const productId = req.params.productId;
    // console.log(`Deleting product with ID: ${productId}`);
    const sql = "SET FOREIGN_KEY_CHECKS=0;";
    const sql1 = "delete from product where product_id = ?;";
    const sql2 = "delete from product_sub_admin where product_id = ?;";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        db.query(sql1, [productId], (err, data) => {
          if (err) {
            console.error(err);
            return res.json(err);
          } else {
            // console.log(`Product with ID ${productId} deleted successfully.`);
            db.query(sql2, [productId], (err, data) => {
              if (err) {
                return res.json(err);
              } else {
                return res.json("success");
              }
            });
          }
        });
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

//Sub admin got Order from healthHepta
app.get("/sub-admin/orders", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      " SELECT orders.id, product.product_id , user_id,order_date,status,payment_status,payment_type  FROM product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON orders.id = payments.order_id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = ?";
    db.query(sql1, [user_id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//Sub admin got Order from healthHepta
app.get("/sub-admin/own/orders", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      " SELECT b2b_orders.id, b2b_product.product_id , sub_admin_id,order_date,status,payment_status,payment_type  FROM b2b_product INNER JOIN b2b_order_items ON b2b_product.product_id = b2b_order_items.product_id INNER JOIN b2b_orders ON b2b_orders.id = b2b_order_items.order_id INNER JOIN b2b_payments ON b2b_orders.id = b2b_payments.order_id   where b2b_orders.sub_admin_id = ?";
    db.query(sql1, [user_id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
// Route for super admin to accept an order
app.post("/sub-admin/orders/accept/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  // Update the order status in the database to indicate acceptance
  const sql = "UPDATE orders SET status = ? WHERE id = ?";

  db.query(sql, ["accepted", orderId], (err) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.json({ message: "Order accepted" });
  });
});
app.get("/sub-admin/payments", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    const sql1 =
      " select payment_id,user_id,payments.order_id,payment_date,total_amount,payment_status,payment_type,product_id FROM payments INNER JOIN orders ON payments.order_id = orders.id INNER JOIN order_items ON order_items.order_id = orders.id INNER JOIN order_sub_admin ON orders.id = order_sub_admin.order_id  where order_sub_admin.sub_admin_id = ?;";
    // console.log(user_id)
    db.query(sql1, [user_id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
// Route for super admin to view product details
app.get("/sub-admin/orders/product/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  // console.log(product_id)
  // View Product details by id
  const sql = "select * from product where product_id =?";

  db.query(sql, [product_id], (err, data) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(data);
  });
});
// Route for super admin to view product details
app.get("/sub-admin/orders/order/:order_id", async (req, res) => {
  const order_id = req.params.order_id;

  // View Product details by id
  const sql =
    "SELECT orders.id, product.product_id , discount,user_id,order_date,status,payment_status,payment_type,product_name,product_price,description,quantity,sgst,cgst  FROM product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON orders.id = payments.order_id where orders.id = ? ";
  const productResults = await new Promise((resolve, reject) => {
    db.query(sql, [order_id], (err, result) => {
      if (err) {
        console.error("Error retrieving data: " + err.message);
        reject(err);
      } else {
        // console.log('Data retrieved successfully');
        resolve(result);
      }
    });
  });
  console.log(productResults);
  let total_amount = 0;
  let total_discount = 0;
  // if (productResults.length > 0) {
  // const ProductPriceDetails = productResults.map((product) => {
  //     return new Promise((resolve, reject) => {
  //         if (err) {
  //             console.error('Error retrieving data: ' + err.message);
  //             reject(err);
  //         } else {
  //             // console.log('Data retrieved successfully');
  //             total_amount = total_amount + product.product_price;
  //             total_discount = total_discount + (product.product_price*(product.discount/100));

  //         }
  //     });
  // });
  // console.log(ProductPriceDetails)

  // const images = await Promise.all(imagesPromises);
  // console.log(images);
  return res.json([productResults]);
  // } else {
  //     return res.json([]); // Return an empty response if no doctor details found
  // }
});
app.get("/sub-admin/orders/customer/:customer_id", (req, res) => {
  const user_id = req.params.customer_id;

  const sql =
    "SELECT  id ,name ,phone , address_id ,Village ,P_O,City,district,State,Pin FROM user_tbl INNER JOIN address ON user_tbl.id = address.user_id and user_tbl.id = ?;";
  const sql1 = "SELECT  id ,name ,phone  FROM user_tbl where user_tbl.id = ?;";

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      //  res.json("Success");
      return res.json([data[0]]);
    } else {
      db.query(sql1, [user_id], (err, data) => {
        if (err) {
          return res.json(err);
        }
        if (data.length > 0) {
          //  res.json("Success");
          return res.json([data[0]]);
        } else {
          return res.json("Faile");
        }
      });
    }
  });
});

// add doctor
app.post("/sub-admin/add-doctor", (req, res) => {
  if (req.session.user) {
    const clinic_id = req.session.user.id;
    const user_role = req.session.user.role;
    const {
      doc_name,
      doc_desc,
      specializes,
      location,
      clinic,
      clinic_desc,
      doctor_imageId,
      Phone_number,
      type_of_visite,
    } = req.body;
    // console.log(req.body)

    if (
      !doc_name ||
      !doc_desc ||
      !specializes ||
      !location ||
      !clinic ||
      !clinic_desc ||
      !doctor_imageId ||
      !Phone_number ||
      !type_of_visite
    ) {
      return res
        .status(400)
        .json({ error: "Missing data in the request body" });
    }

    const query = `
        INSERT INTO doctors_details (doc_name, doc_desc, specializes,location, clinic, clinic_desc, clinic_id,doctor_imageId,type,Phone_number,type_of_visite)
        VALUES (?, ?, ?, ?, ?, ?,?, ?,?,?,?)
    `;

    const values = [
      doc_name,
      doc_desc,
      specializes,
      location,
      clinic,
      clinic_desc,
      clinic_id,
      doctor_imageId,
      user_role,
      Phone_number,
      type_of_visite,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        return res
          .status(500)
          .json({ error: "Error inserting data into the database" });
      } else {
        return res.json(result.insertId);
        // return res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
// add doctor
app.post("/sub-admin/add-new-laboratory-test", (req, res) => {
  if (req.session.user) {
    const clinic_id = req.session.user.id;
    const user_role = req.session.user.role;
    const { Test_Desc, Test_Name, price, test_imageId } = req.body;
    // console.log(req.body)

    if (!Test_Name || !Test_Desc || !test_imageId) {
      return res
        .status(400)
        .json({ error: "Missing data in the request body" });
    }

    const query = `
        INSERT INTO laboratory_tests_details (Test_Name, Test_Desc,price,test_imageId,clinic_id)
        VALUES (?, ?, ?,?,?)
    `;

    const values = [Test_Name, Test_Desc, price, test_imageId, clinic_id];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        return res
          .status(500)
          .json({ error: "Error inserting data into the database" });
      } else {
        return res.json(result.insertId);
        // return res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
// add Time table to doctor
app.post("/sub-admin/add-doctor/time-table", (req, res) => {
  if (req.session.user) {
    // const doctor_id = req.session.user.id;
    const user_role = req.session.user.role;
    const { day_of_week, start_time, end_time } = req.body[0];
    const timeValues = req.body[0];
    const doctor_id = req.body[1];
    // console.log(req.body)
    // console.log(timeValues)

    // if (!day_of_week || !start_time || !end_time ) {
    //     console.log('Missing data in the request body')
    //     return res.status(400).json({ error: 'Missing data in the request body' });
    // }

    const query = `INSERT INTO doctors_timetable ( doctor_id,weekly_day,starting_time,ending_time) VALUES ?`;
    db.query(
      query,
      [
        timeValues.map((time) => [
          doctor_id,
          time.day_of_week,
          time.start_time,
          time.end_time,
        ]),
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting data: " + err.message);
          return res
            .status(500)
            .json({ error: "Error inserting data into the database" });
        } else {
          // console.log('Data inserted successfully');
          // console.log(result)
          return res.json("success");
          // return res.status(200).json({ message: 'Data inserted successfully' });
        }
      }
    );
  } else {
    res.status(500).send("data not found");
  }
});

// see doctor
app.get("/sub-admin/see-doctor", async (req, res) => {
  if (req.session.user) {
    try {
      const user_id = req.session.user.id;
      const query =
        "SELECT doctors_details.id,doc_name,doc_desc,location,clinic,clinic_desc,clinic_id,type,doctor_imageId,specializes,Phone_number,type_of_visite,doctors_timetable.id as timetableId,weekly_day,starting_time,ending_time FROM doctors_details inner join doctors_timetable On doctors_details.id = doctors_timetable.doctor_id  WHERE  clinic_id = ?;";
      const doctorResults = await new Promise((resolve, reject) => {
        db.query(query, user_id, (err, result) => {
          if (err) {
            console.error("Error retrieving data: " + err.message);
            reject(err);
          } else {
            // console.log('Data retrieved successfully');
            // console.log(result)
            resolve(result);
          }
        });
      });

      if (doctorResults.length > 0) {
        const imagesPromises = doctorResults.map((doctor) => {
          return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM images WHERE id = ?";
            db.query(sql, [doctor.doctor_imageId], (err, result) => {
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
        // console.log(images);
        return res.json([doctorResults, images]);
      } else {
        // return res.json([]); // Return an empty response if no doctor details found
        return res.json(null); // Return an empty response if no doctor details found
      }
    } catch (error) {
      console.error("Error: ", error);
      return res
        .status(500)
        .json({ error: "Error retrieving doctor details from the database" });
    }
  } else {
    return res.status(500).send("Data not found");
  }
});
// see particular  doctor details
app.get("/viewdetails/doctor/:doctor_id", async (req, res) => {
  try {
    const doctor_id = req.params.doctor_id;
    // const user_id = req.session.user.id;
    const query =
      "SELECT doctors_details.id,doc_name,doc_desc,location,clinic,clinic_desc,clinic_id,type,doctor_imageId,specializes,Phone_number,type_of_visite FROM doctors_details   WHERE  doctors_details.id = ?;";
    const doctorResults = await new Promise((resolve, reject) => {
      db.query(query, doctor_id, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (doctorResults.length > 0) {
      const sql = `SELECT * FROM doctors_timetable WHERE doctor_id = ?`;

      const timeTable = await new Promise((resolve, reject) => {
        db.query(sql, doctor_id, (err, result) => {
          if (err) {
            console.error("Error retrieving data: " + err.message);
            reject(err);
          } else {
            // console.log('Data retrieved successfully');
            // console.log(result)
            resolve(result);
          }
        });
      });

      const imagesPromises = doctorResults.map((doctor) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [doctor.doctor_imageId], (err, result) => {
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

      // console.log([doctorResults, images,timeTable]);
      return res.json([doctorResults, images, timeTable]);
    } else {
      // return res.json([]); // Return an empty response if no doctor details found
      return res.json(null); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving doctor details from the database" });
  }
});
//  Show Laboratory Test
app.get("/sub-admin/see-labtests", async (req, res) => {
  if (req.session.user) {
    try {
      const user_id = req.session.user.id;
      const query =
        "SELECT * FROM laboratory_tests_details WHERE clinic_id = ?";
      const laboratoryResults = await new Promise((resolve, reject) => {
        db.query(query, user_id, (err, result) => {
          if (err) {
            console.error("Error retrieving data: " + err.message);
            reject(err);
          } else {
            // console.log('Data retrieved successfully');
            // console.log(result)
            resolve(result);
          }
        });
      });

      if (laboratoryResults.length > 0) {
        const imagesPromises = laboratoryResults.map((lab) => {
          return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM images WHERE id = ?";
            db.query(sql, [lab.test_imageId], (err, result) => {
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
        // console.log([laboratoryResults, images]);
        return res.json([laboratoryResults, images]);
      } else {
        // return res.json([]); // Return an empty response if no doctor details found
        return res.json(null); // Return an empty response if no doctor details found
      }
    } catch (error) {
      console.error("Error: ", error);
      return res
        .status(500)
        .json({ error: "Error retrieving doctor details from the database" });
    }
  } else {
    return res.status(500).send("Data not found");
  }
});

//  Show Laboratory Test particular
app.get("/particular-laboratory/see-labtests/:client_id", async (req, res) => {
  const clinic_id = req.params.client_id;
  try {
    // const user_id = req.session.user.id;
    const query = "SELECT * FROM laboratory_tests_details WHERE clinic_id = ?";
    const laboratoryResults = await new Promise((resolve, reject) => {
      db.query(query, clinic_id, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (laboratoryResults.length > 0) {
      const imagesPromises = laboratoryResults.map((lab) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [lab.test_imageId], (err, result) => {
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
      // console.log([laboratoryResults, images]);
      return res.json([laboratoryResults, images]);
    } else {
      // return res.json([]); // Return an empty response if no doctor details found
      return res.json(null); // Return an empty response if no doctor details found
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ error: "Error retrieving doctor details from the database" });
  }
});

app.get("/sub-admin/home/timetable/doctor/:doctor_id", (req, res) => {
  const doctor_id = req.params.doctor_id;

  const sql = "SELECT * FROM doctors_timetable WHERE doctor_id = ?";

  db.query(sql, [doctor_id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      //  res.json("Success");
      return res.json(data);
    } else {
      return res.json(null);
    }
  });
});

//view all spesific clinic appointments
app.get("/sub-admin/see-appoiment", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;

    const clinic_id = user_id;
    const sql =
      "Select appointmenttable.id,doctor_id,appoint_date,name,appoint_time,clinic,location,doc_desc,doc_name,appointmenttable.ph_number,user_id,appointmenttable.clinic_id,appointmenttable.type_of_visite,ph_number,clinic_desc ,AppointmentStatus from appointmenttable INNER JOIN doctors_details ON appointmenttable.doctor_id = doctors_details.id  where appointmenttable.clinic_id = ?;";
    db.query(sql, [clinic_id], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//view all spesific clinic lab booking
app.get("/sub-admin/see-lab-bookings", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;

    const clinic_id = user_id;
    const sql =
      "Select labtestbookedtable.Test_id,appoint_date,labtestbookedtable.name,laboratory_tests_details.Test_Name,sample_collection,appoint_time,ph_number,user_id,labtestbookedtable.clinic_id,ph_number,sub_admin.name as sub_name,LabTestStatus from labtestbookedtable INNER JOIN laboratory_tests_details ON labtestbookedtable.Test_id = laboratory_tests_details.Test_id INNER JOIN sub_admin ON sub_admin.id = laboratory_tests_details.clinic_id  where labtestbookedtable.clinic_id = ?;";
    db.query(sql, [clinic_id], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

//view all spesific User appointments
app.get("/user/see-appoiment", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    // console.log(user_id)
    // const clinic_id = user_id;
    const sql =
      "Select appointmenttable.id,doctor_id,appoint_date,specializes,name,appoint_time,clinic,location,doc_desc,doc_name,Phone_number,appointmenttable.type_of_visite,user_id,appointmenttable.clinic_id,ph_number,clinic_desc ,AppointmentStatus from appointmenttable INNER JOIN doctors_details ON appointmenttable.doctor_id = doctors_details.id  where appointmenttable.user_id = ?;";
    db.query(sql, [user_id], (err, data) => {
      if (err) {
        console.log(err);
        return res.json("Error");
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//view all spesific User appointments
app.get("/user/see-appoiment/:id", async (req, res) => {
  if (req.session.user) {
    // const user_id = req.session.user.id
    const appoiment_id = req.params.id;
    const query =
      "Select appointmenttable.id,doctor_id,appoint_date,specializes,name,appoint_time,clinic,location,doc_desc,doc_name,doctor_imageId,Phone_number,appointmenttable.type_of_visite,user_id,appointmenttable.clinic_id,ph_number,clinic_desc ,AppointmentStatus from appointmenttable INNER JOIN doctors_details ON appointmenttable.doctor_id = doctors_details.id  where appointmenttable.id = ?;";
    const appoimentResults = await new Promise((resolve, reject) => {
      db.query(query, appoiment_id, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (appoimentResults.length > 0) {
      const imagesPromises = appoimentResults.map((appoiment) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [appoiment.doctor_imageId], (err, result) => {
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
      // console.log([laboratoryResults, images]);
      return res.json([appoimentResults, images]);
    } else {
      res.status(500).send("data not found");
    }
  }
});
//view all spesific User LabBooking by user
app.get("/user/see-lab-booking", async (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;
    // console.log(user_id)
    // const clinic_id = user_id;
    const query =
      "Select labtestbookedtable.id ,labtestbookedtable.Test_id,appoint_date,labtestbookedtable.name,laboratory_tests_details.Test_Name,test_imageId,sample_collection,appoint_time,ph_number,user_id,labtestbookedtable.clinic_id,ph_number,sub_admin.name as sub_name,LabTestStatus from labtestbookedtable INNER JOIN laboratory_tests_details ON labtestbookedtable.Test_id = laboratory_tests_details.Test_id INNER JOIN sub_admin ON sub_admin.id = laboratory_tests_details.clinic_id  where labtestbookedtable.user_id = ?;";
    const laboratoryResults = await new Promise((resolve, reject) => {
      db.query(query, user_id, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (laboratoryResults.length > 0) {
      const imagesPromises = laboratoryResults.map((lab) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [lab.test_imageId], (err, result) => {
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
      // console.log([laboratoryResults, images]);
      return res.json([laboratoryResults, images]);
    } else {
      // return res.json([]); // Return an empty response if no doctor details found
      return res.json(null); // Return an empty response if no doctor details found
    }
  } else {
    res.status(500).send("data not found");
  }
});
//view  spesific  test details of LabBooking by user
app.get("/user/see-lab-booking/:id", async (req, res) => {
  if (req.session.user) {
    // const user_id = req.session.user.id
    const test_id = req.params.id;
    // console.log(user_id)
    // const clinic_id = user_id;
    const query =
      "Select labtestbookedtable.id ,labtestbookedtable.Test_id,appoint_date,labtestbookedtable.name,laboratory_tests_details.Test_Name,test_imageId,sample_collection,appoint_time,ph_number,user_id,labtestbookedtable.clinic_id,ph_number,sub_admin.name as sub_name,LabTestStatus from labtestbookedtable INNER JOIN laboratory_tests_details ON labtestbookedtable.Test_id = laboratory_tests_details.Test_id INNER JOIN sub_admin ON sub_admin.id = laboratory_tests_details.clinic_id  where labtestbookedtable.id = ?;";
    const laboratoryResults = await new Promise((resolve, reject) => {
      db.query(query, test_id, (err, result) => {
        if (err) {
          console.error("Error retrieving data: " + err.message);
          reject(err);
        } else {
          // console.log('Data retrieved successfully');
          // console.log(result)
          resolve(result);
        }
      });
    });

    if (laboratoryResults.length > 0) {
      const imagesPromises = laboratoryResults.map((lab) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM images WHERE id = ?";
          db.query(sql, [lab.test_imageId], (err, result) => {
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
      // console.log([laboratoryResults, images]);
      return res.json([laboratoryResults, images]);
    } else {
      // return res.json([]); // Return an empty response if no doctor details found
      return res.json(null); // Return an empty response if no doctor details found
    }
  } else {
    res.status(500).send("data not found");
  }
});

//view all spesific User appointments by super Amdmin
app.get("/superadmin/appoiments", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;

    const sql = "Select * from appointmenttable ";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json("Error");
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});
//view all spesific User Lab Booking by super Amdmin
app.get("/superadmin/labbokking", (req, res) => {
  if (req.session.user) {
    const user_id = req.session.user.id;

    const sql = "Select * from labtestbookedtable ";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json("Error");
      }
      if (data.length > 0) {
        //  res.json("Success");
        // console.log(data)
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    res.status(500).send("data not found");
  }
});

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });

//     // Handle order notifications
//     socket.on('newOrder', (data) => {
//         // Broadcast the new order notification to all connected clients (admins, super admins)
//         io.emit('orderNotification', data);
//     });
// });

// Configure image upload using multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("image");

let lastInsertedImageId;
app.post("/upload", (req, res) => {
  // console.log('Upload')
  try {
    upload(req, res, (err) => {
      if (err) {
        console.error("Image upload error: " + err);
        res.status(500).json({ error: "Image upload failed." });
      } else {
        const { originalname, filename } = req.file;

        const imageInfo = {
          name: originalname,
          path: `uploads/${filename}`,
        };

        const sql = "INSERT INTO images SET ?";

        db.query(sql, imageInfo, (dbErr, result) => {
          if (dbErr) {
            console.error("Database error: " + dbErr);
            res.status(500).json({ error: "Database error." });
          } else {
            lastInsertedImageId = result.insertId;
            //   console.log(lastInsertedImageId);
            //   res.json({ message: 'Image uploaded successfully', result });
            res.json({
              message: "Image uploaded successfully",
              imageId: lastInsertedImageId,
            }); // Send the image ID as a response
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/upload/banner", (req, res) => {
  // console.log('Upload')
  try {
    upload(req, res, (err) => {
      if (err) {
        console.error("Image upload error: " + err);
        res.status(500).json({ error: "Image upload failed." });
      } else {
        const { originalname, filename } = req.file;

        const imageInfo = {
          name: originalname,
          path: `uploads/${filename}`,
        };

        const sql = "INSERT INTO banner SET ?";

        db.query(sql, imageInfo, (dbErr, result) => {
          if (dbErr) {
            console.error("Database error: " + dbErr);
            res.status(500).json({ error: "Database error." });
          } else {
            lastInsertedImageId = result.insertId;
            //   console.log(lastInsertedImageId);
            //   res.json({ message: 'Image uploaded successfully', result });
            res.json({
              message: "Image uploaded successfully",
              imageId: lastInsertedImageId,
            }); // Send the image ID as a response
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/upload/prescription", (req, res) => {
  // console.log('Upload')
  try {
    upload(req, res, (err) => {
      if (err) {
        console.error("Image upload error: " + err);
        res.status(500).json({ error: "Image upload failed." });
      } else {
        const { originalname, filename } = req.file;

        const imageInfo = {
          name: originalname,
          path: `uploads/${filename}`,
        };

        const sql = "INSERT INTO Prescription SET ?";

        db.query(sql, imageInfo, (dbErr, result) => {
          if (dbErr) {
            console.error("Database error: " + dbErr);
            res.status(500).json({ error: "Database error." });
          } else {
            lastInsertedImageId = result.insertId;
            //   console.log(lastInsertedImageId);
            //   res.json({ message: 'Image uploaded successfully', result });
            res.json({
              message: "Image uploaded successfully",
              imageId: lastInsertedImageId,
            }); // Send the image ID as a response
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/images", (req, res) => {
  const sql = "SELECT * FROM images where id = ?";

  db.query(sql, [lastInsertedImageId], (err, result) => {
    if (err) {
      console.error("Database error: " + err);
      res.status(500).json({ error: "Database error." });
    } else {
      res.json(result);
    }
  });
});

app.get("/images/banner", (req, res) => {
  const sql = "SELECT * FROM banner";

  db.query(sql, [lastInsertedImageId], (err, result) => {
    if (err) {
      console.error("Database error: " + err);
      res.status(500).json({ error: "Database error." });
    } else {
      res.json(result);
    }
  });
});

app.get("/images/prescription", (req, res) => {
  const sql = "SELECT * FROM Prescription";

  db.query(sql, [lastInsertedImageId], (err, result) => {
    if (err) {
      console.error("Database error: " + err);
      res.status(500).json({ error: "Database error." });
    } else {
      res.json(result);
    }
  });
});
app.get("/images/sub-admin", (req, res) => {
  try {
    const imageId = req.body;
    // console.log(imageId)
    const sql = "SELECT * FROM images where id = ?";

    db.query(sql, [imageId], (err, result) => {
      if (err) {
        console.error("Database error: " + err);
        res.status(500).json({ error: "Database error." });
      } else {
        res.json(result);
      }
    });
  } catch (error) {}
});

//   Notification system after order which will go to super and sub admin using bell sound system-const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// Create a mapping of users to their WebSocket connections
// const userSockets = new Map();

// io.on('connection', (socket) => {
//     socket.on('user-connected', (userId) => {
//         userSockets.set(userId, socket);
//     });

//     socket.on('disconnect', () => {
//         userSockets.forEach((value, key) => {
//             if (value === socket) {
//                 userSockets.delete(key);
//             }
//         });
//     });
// });

// // Simulate user roles (replace this with your user authentication)
// const userRoles = {
//     'superadmin1': 'superadmin',
//     'superadmin2': 'superadmin',
//     'subadmin1': 'subadmin',
//     'subadmin2': 'subadmin',
// };

// // API endpoint to handle orders
// app.post('/place-order', (req, res) => {
//     const { userId, product, orderDetails } = req.body;

//     // Check the user's role
//     const userRole = userRoles[userId];

//     if (!userRole) {
//         return res.status(403).send('Unauthorized');
//     }

//     // Send a notification to the user's corresponding admin role
//     const notificationMessage = `New order from user ${userId}: ${orderDetails}`;

//     if (userRole === 'superadmin') {
//         // Send to super admin(s)
//         userSockets.forEach((socket, adminId) => {
//             if (userRoles[adminId] === 'superadmin') {
//                 socket.emit('new-order', notificationMessage);
//             }
//         });
//     } else if (userRole === 'subadmin') {
//         // Send to subadmin(s)
//         userSockets.forEach((socket, adminId) => {
//             if (userRoles[adminId] === 'subadmin') {
//                 socket.emit('new-order', notificationMessage);
//             }
//         });
//     }
//     res.status(200).send('Order placed successfully');
// });

app.listen(8081, () => {
    console.log("Listening.... at " + 8081 + " Port");
})

// npm install https

// const https = require('https');
// // const fs = require('fs');


// const privateKey = fs.readFileSync('private.key');
// const certificate = fs.readFileSync('certificate.csr'); 

// const options = {
//   key: privateKey,
//   cert: certificate
// };

// https.createServer(options, (req, res) => {
//   // Handle requests
// }).listen(443);


// const PORT = process.env.HTTPS_PORT ?? 443;
// const secureServer = https.createServer(
//   {
//     key: fs.readFileSync(process.env.SSL_KEY || "client-key.pem"),
//     cert: fs.readFileSync(process.env.SSL_CERT || "client.csr"),
//   },
//   app
// );

// secureServer.listen(PORT, () => {
//   console.log(`secure server running at ${PORT}...`);
// });

// Start the server (usually on port 80)
// app.listen(80, () => {
//     console.log('HTTP server listening on port 80');
// });
