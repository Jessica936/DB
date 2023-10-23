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

  db.query(
    "INSERT INTO buyer (buyerName) VALUES (?)",
    [buyerName],
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

app.post("/createItem", (req, res) => {
  const itemID = req.body.itemID;
  const itemName = req.body.itemName;

  db.query(
    "INSERT INTO item (itemID, itemName) VALUES (?,?)",
    [itemID, itemName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/item", (req, res) => {
  db.query("SELECT * FROM item", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// app.put("/update", (req, res) => {
//   const id = req.body.itemID;
//   const itemName= req.body.itemName;
//   db.query(
//     "UPDATE buyer SET item = ? WHERE id = ?",
//     [itemName, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM buyer WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
