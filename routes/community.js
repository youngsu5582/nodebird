const express = require('express');

const models = require('../models');

const router = express.Router();
const passport = require('passport');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const { Post, Hashtag,Hashtable } = require('../models');

router.get('/',(req,res,next)=>{
    res.render('community');
})
router.get('/writing',(req,res,next)=>{
    res.render('writing');
})
router.get('/:postId', async (req,res,next)=>{
    try{
    const postid = req.params.postId;
    const post =  await Post.findByPk(postid);
    
    const hashtags = await Hashtable.findAll({
        where:{
            postId : postid,
        },
        raw:true,
        nest:true,
    });
    const hashtagIds =  await Promise.all(hashtags.map(hashtag=>{
        
        return Hashtag.findOne({include:Hashtag.string,where:{id:hashtag.hashtagId},raw:true}).then((hashtag)=>hashtag.string);
    }));
    console.log(hashtagIds);
    res.render('post',{Post: post.dataValues , Hashtag : hashtagIds});
}catch(error){
    console.error(error);
    
}
})

router.get('/post',(req,res,next)=>{
    
})
router.post('/post',isLoggedIn , async (req,res,next)=>{
    
    try{
        json = req.body;
        const post = await Post.create({
            title : json.Title,
            content : json.Content,
            userId : req.user.id,
        })
        const hashtags = json.Hashtags.match(/#[^\s#]*/g);
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where : {string : tag.slice(1).toLowerCase()},
            })));
            await post.addHashtags(result.map(r=>r[0]));
        }
    res.render('index');
    }
    catch(error){
        console.error(error);
        next(error);
    }
})



module.exports = router;