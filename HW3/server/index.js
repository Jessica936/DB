const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const ObjectId = mongoose.Types.ObjectId;

app.use(cors());
app.use(express.json());

// 連接至 MongoDB
mongoose.connect("mongodb+srv://JessicaLin:Mongo22157988@cluster0.7jzoted.mongodb.net/buyer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB 連接錯誤:", error);
});

db.once("open", () => {
  console.log("已成功連接至 MongoDB");
});

const buyerSchema = new mongoose.Schema({
  buyerName: String,
  buyerCity: String,
});

const Buyer = mongoose.model("Buyer", buyerSchema);

app.post("/createBuyer", async (req, res) => {
  const buyerName = req.body.buyerName;
  const buyerCity = req.body.buyerCity;

  try {
    const buyer = new Buyer({
      buyerName,
      buyerCity,
    });
    await buyer.save();
    res.send("Buyer Inserted");
  } catch (error) {
    console.error("創建買家時發生錯誤:", error);
    res.status(500).send("Error creating course");
  }
});

app.get("/buyer", async (req, res) => {
  try {
    const buyer = await Buyer.find({});
    res.send(buyer);
  } catch (error) {
    console.error("獲取買家列表時發生錯誤:", error);
    res.status(500).send("Error fetching buyer");
  }
});

app.put("/updateBuyer/:id", (req, res) => {
  const id = req.params.id;
  const buyerName = req.body.buyerName;
  
  Buyer.findByIdAndUpdate(id, { buyerName }, { new: true })
    .then((updatedBuyer) => {
      if (!updatedBuyer) {
        return res.status(404).send("Buyer not found");
      }
      res.send(updatedBuyer);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating Buyer");
    });
});

app.delete("/deleteBuyer/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // 不需要將字符串轉換為ObjectId，因為Mongoose可以處理
    await Buyer.findByIdAndRemove(id);
    res.send("Buyer Deleted");
  } catch (error) {
    console.error("刪除買家時發生錯誤:", error);
    res.status(500).send("Error deleting buyer");
  }
});

app.get("/searchBuyerByName", (req, res) => {
  const searchName = req.query.name; // Get the name to search for from query parameters
  Buyer.find({ buyerName: { $regex: searchName, $options: "i" } }) // Case-insensitive search
    .then((buyer) => {
      res.send(buyer);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error searching for buyers by name");
    });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});