const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(
"mongodb+srv://mahermahru_db_user:1zUNigVxKJ4NoMtF@cluster0.okgpkjo.mongodb.net/?appName=Cluster0"
)
.then(()=>{
 console.log("MongoDB connected")
})
.catch((err)=>{
 console.log(err)
})



// Schema

const ProductSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  price:{
    type:Number,
    required:true
  }

});


const Product = mongoose.model(
  "Product",
  ProductSchema
);


// READ - get all products

app.get("/products", async(req,res)=>{

  const products = await Product.find();

  res.json(products);

});



// CREATE - add product

app.post("/add", async(req,res)=>{


  const product = new Product({

    name:req.body.name,
    price:req.body.price

  });


  await product.save();


  res.json({
    message:"Product added"
  });


});




// UPDATE

app.put("/update/:id", async(req,res)=>{


  const updatedProduct =
  await Product.findByIdAndUpdate(

    req.params.id,

    {
      name:req.body.name,
      price:req.body.price
    },

    {new:true}

  );


  res.json(updatedProduct);


});




// DELETE

app.delete("/delete/:id", async(req,res)=>{


  await Product.findByIdAndDelete(
    req.params.id
  );


  res.json({
    message:"Deleted"
  });


});





app.listen(5000,()=>{

 console.log(
 "Server running at http://localhost:5000"
 );

});

