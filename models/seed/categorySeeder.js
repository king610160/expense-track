if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const Category = require("../category");
const categoryList = [
  { name: "其他", icon: "fa-solid fa-pen" },
  { name: "休閒娛樂", icon: "fa-solid fa-face-grin-beam" },
  { name: "家居物業", icon: "fa-solid fa-house" },
  { name: "餐飲食品", icon: "fa-solid fa-utensils" },
  { name: "交通出行", icon: "fa-solid fa-van-shuttle" },
];

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  Category.create(categoryList)
    .then(() => {
      console.log("categorySeeder running finished!");
      db.close();
      process.exit();
    })
    .catch((err) => console.log("category run failed."));
});