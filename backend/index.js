import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
  };
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors(corsOptions));

app.get('/test/api/select',(req,res)=>{
    let options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
    res.json(options);
})
