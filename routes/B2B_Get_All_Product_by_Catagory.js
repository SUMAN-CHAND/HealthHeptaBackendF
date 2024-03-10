const express = require("express");
const mysql = require('mysql');
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

//This Router for Getting all new Arrival Product 

router.get('/b2b/product/all', async (req, res) => {


  try {
    const query = "select * from b2b_product;";
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
//This Router for Getting all new Arrival Product 

router.get('/b2b/product/newadded', async (req, res) => {


  try {
    const query = "select * from b2b_product order by addedat;";
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
//This Router for Getting all 20% off Product 

router.get('/b2b/product/20%off', async (req, res) => {


  try {
    const query = "select * from b2b_product where discount>20 and discount<50 order by discount DESC;";
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
//This Router for Getting all 20% off Product 

router.get('/b2b/product/50%off', async (req, res) => {


  try {
    const query = "select * from b2b_product where discount>50 order by discount DESC;";
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
//This Router for Getting all best  offer Product 

router.get('/b2b/product/bestoffer', async (req, res) => {
  try {
    const query = "select * from b2b_product order by discount DESC;";
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
router.get('/b2b/product/lotproduct', async (req, res) => {
  try {
    const query = "select * from b2b_product where PackTypeOfMedicine = 'lotProduct';";
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
router.get('/b2b/product/singleProduct', async (req, res) => {
  try {
    const query = "select * from b2b_product where PackTypeOfMedicine = 'singleProduct';";
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