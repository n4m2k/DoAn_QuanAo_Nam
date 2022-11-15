const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//Xử lý các trường hợp ngoại lệ chưa được thông báo
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Tắt máy chủ do trường hợp ngoại lệ chưa được thông báo`);
  process.exit(1);
});
//Config
dotenv.config({ path: "backend/config/config.env" });

//Kết nối database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Lỗi:${err.message}`);
  console.log(`Tắt máy chủ do Unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
