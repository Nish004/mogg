const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');

// Middleware
app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://nisanthsm:NABAS@cluster0.lo11ecd.mongodb.net/e-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Serve uploaded images statically
app.use('/images', express.static('upload/images'));

// Upload endpoint for images
// Upload endpoint for images
app.post('/upload', upload.single('product'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Construct the image_url with correct hostname and port
    const image_url = `${req.protocol}://${req.hostname}:${port}/images/${req.file.filename}`;

    res.json({
      success: true,
      image_url: image_url,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
});


// Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// API endpoint to add a product
app.post("/addproduct", async (req, res) => {
  try {
    const { name, image, category, new_price, old_price } = req.body;

    // Check if all required fields are present
    if (!name || !image || !category || !new_price || !old_price) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Generate unique ID for the product
    const products = await Product.find({});
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    // Create new product instance
    const product = new Product({
      id,
      name,
      image,
      category,
      new_price: Number(new_price), // Ensure new_price is parsed to number
      old_price: Number(old_price), // Ensure old_price is parsed to number
    });

    // Save product to database
    await product.save();
    console.log("Product saved:", product);

    // Send success response
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// API endpoint to delete a product
app.post('/removeproduct', async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Product.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    console.log("Product removed:", result);
    res.json({
      success: true,
      name: result.name,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// API endpoint to fetch all products
// Ensure /allproduct endpoint is correctly defined and products are returned

app.get('/allproduct', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("All Products Fetched:", products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



// Schema creating for User model

const Users = mongoose.model('users',{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
   
   },
   date:{
    type:Date,
    default:Date.now,
   }
})

// Creating EndPoint for registering the user
app.post('/signup',async (req,res)=>{

  let Check = await Users.findOne({email:req.body.email});
  if (Check) {
    return res.status(400).json({success:false,errors:"existing user found with same email adress"})
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i]=0;
  }
  const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })
   
  await user.save();

  const data = {
    user:{
      id:user.id
    }
  }

   const token =jwt.sign(data,'secret_ecom');
   res.json({success:true,token})
   
})

// creating endpoint for user login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom'); // Corrected `jwr` to `jwt`
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

 
// Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server running on port ${port}`);
  } else {
    console.error("Error starting server:", error);
  }
});
