import express from "express";
import multer from "multer";
import moment from "moment";
import cors from "cors";
import users from "./users.mjs";
import { v4 as uuidv4 } from "uuid";
import { Low } from "lowdb"
import {JSONFile} from "lowdb/node"

const defaultDate = {users: [],products: []};
const db = new Low(new JSONFile('./db.json'),defaultDate)
await db.read()

const upload = multer();

const whiteList = ["http://localhost:5500", "http://127.0.0.1:5500"];
const corsOptions = {
  credentials: true,
  origin(origin, callback){
    if(!origin || whiteList.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error("不允許傳遞料"))
    }
  }
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("網站首頁")
})

app.get("/api/products",(req,res)=>{
res.status(200).json({message:"獲取所有商品"})
})

app.get("/api/products/search",(req,res)=>{
  const id =req.query.id;
  res.status(200).json({message:`使用ID作為搜尋條件來搜尋商品 ${id}`})
  })
  
app.get("/api/products/:id",(req,res)=>{
  const id = req.params.id;
  res.status(200).json({message:`獲取商品為${id}的檔案`})
  })

app.post("/api/products",upload.none(), (req,res)=>{
  res.status(200).json({message:"新增一個商品"})
  })


  
    app.put("/api/products/:id",upload.none(),(req,res)=>{
      const id =req.params.id;
      res.status(200).json({message:`更新特定ID的產品 ${id}`})
      })
  
      app.delete("/api/products/:id",upload.none(),(req,res)=>{
        const id =req.params.id;
        res.status(200).json({message:`刪除特定ID的產品 ${id}`})
        })


app.listen(3000, () => {
  console.log("running at http://localhost:3000");
})
