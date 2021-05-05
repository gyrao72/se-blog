require('dotenv').config();
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoute");
const authRoutes = require("./routes/authRoute");
const cookieParser = require('cookie-parser');
const {checkUser} = require('./middleware/authMiddleware');


const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine','ejs');

const dbURI = 'mongodb+srv://gyrao:Allen123@nodejs-base.a6ug8.gcp.mongodb.net/se-project?retryWrites=true&w=majority';

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result) =>{
        app.listen(process.env.PORT || 3000);
        console.log("Server is Running and DB is connected");
        })
    .catch((err) =>console.log(err));



app.get('*',checkUser);
app.get("/",(req,res) =>{
    res.render("home");
});

// app.get('/', (req, res) =>{ 
//     if(!checkUser)
//         res.render('home');
//     else 
//         res.redirect('/blogs');
// });
app.use(authRoutes);
app.use(blogRoutes);

