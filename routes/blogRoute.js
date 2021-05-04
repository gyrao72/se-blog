const router = require('express').Router();
let Blog = require('../models/blog');
const {requireAuth,checkUser} = require('../middleware/authMiddleware');
const User = require('../models/user');

router.get('/blogs',requireAuth,(req,res)=>{
    Blog.find().sort({createdAt:-1})
        .populate('User')
        .then((result)=>{
            res.render('blogsAll',{blogs:result});
        })
        .catch((err)=>{
            console.log(err);
        });
});

router.get("/blogs/myblogs",requireAuth,(req,res)=>{
    Blog.find().sort({createdAt:-1})
        .populate('User')
        .then((result)=>{
            res.render('blogsMy',{blogs:result});
        })
        .catch((err)=>{
            console.log(err);
        });
});

router.get("/blogs/create",requireAuth,(req,res)=>{
    res.render("create");
});

router.post("/blogs/create",requireAuth,(req,res)=>{
    
const blog = new Blog(req.body);
    blog.save()
        .then(()=>{
            getUserWithBlogs(req.body.userID);
            res.redirect("/blogs")
        })

    function getUserWithBlogs(userID){
        return User.findOne({ _id: userID })
            .populate('blogs').exec((err, bl) => {
            console.log("Populated User " + bl);
            })
        }
        
});

router.get('/blogs/:id',requireAuth,(req,res)=>{
    Blog.findById(req.params.id)
        .then(result=>{res.render('blogsDetails',{blog:result})})
        .catch(err=>{
            console.log(err);
        })
});

router.delete('/blogs/:id',requireAuth,(req,res)=>{
    Blog.findByIdAndDelete(req.params.id)
        .then(() => res.json('Blog Deleted'))
        .catch(err => res.status(400).json("Error:"+err));
});


module.exports = router;