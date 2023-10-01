const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "MyS22157988",
  database: "erd",
});

app.post("/createBuyer", (req, res) => {
  const buyerName = req.body.buyerName;
  const buyerCity = req.body.buyerCity;

  db.query(
    "INSERT INTO buyer (buyerName, buyerCity) VALUES (?,?)",
    [buyerName, buyerCity],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/buyer", (req, res) => {
  db.query("SELECT * FROM buyer", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// app.post("/createItem", (req, res) => {
//   const itemID = req.body.itemID;
//   const itemName = req.body.itemName;

//   db.query(
//     "INSERT INTO item (itemID, itemName) VALUES (?,?)",
//     [itemID, itemName],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });

// app.get("/item", (req, res) => {
//   db.query("SELECT * FROM item", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.put("/updateBuyer", (req, res) => {
  const id = req.body.buyerID;
  const buyerName= req.body.buyerName;
  db.query(
    "UPDATE buyer SET buyerName = ? WHERE id = ?",
    [buyerName, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteBuyer/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM buyer WHERE buyerID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
