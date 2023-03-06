const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const articles=require('./models/Article');
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://Anikate7316ag:Anikate%4025@cluster0.ofjnmbo.mongodb.net/Articles').then(()=>console.log("DB connected")).catch((e)=>console.log(e));


// articles.create({title:'abcd', date:d, description:'first article',  content:"articles are here"});
const port=5000;

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.listen(port,()=>console.log('server is running on port',port));

app.get('/',async(req,res)=>{
    const blogs= await articles.find();
    res.render('index',{blogs});
})

app.get('/articles/new',(req,res)=>{
    res.render('addArticle');
});


app.post('/articles',async(req,res)=>{
    const {title,description,content}=req.body;
    const d=new Date();
    await articles.create({title, date:d, description,  content});
    res.redirect('./');
})

app.get('/articles/edit/:id',async(req,res)=>{
    const {id}=req.params;
    const article=await articles.findById(id);
    res.render('edit',{article});
})

app.put('/articles/:id',async(req,res)=>{
    const {id}=req.params;
    const d=new Date();
    const {title,description,content}=req.body;
    await articles.findByIdAndUpdate(id,{title,date:d,description,content});
    res.redirect('/articles/show/'+id);
})

app.get('/articles/show/:id',async(req,res)=>{
    const {id}=req.params;
    const blog=await articles.findById(id);
    res.render('show',{blog});
})

app.delete('/articles/:id',async(req,res)=>{
    const {id}=req.params;
    await articles.findByIdAndDelete(id);
    res.redirect('/');
})