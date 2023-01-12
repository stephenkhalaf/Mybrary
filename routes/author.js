 const express = require('express')
 const router = express.Router()
 const Author = require('../models/author')

router.get('/', async (req,res)=>{
    let searchOptions = {}
    if(req.query.name != '' || req.query.name != null){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions).limit(10)
        res.render('authors/index', {
        authors: authors,
        searchOptions:req.query.name
     })
}catch(err){
    res.redirect('/')
}
})

router.get('/new', (req,res)=>{
    res.render('authors/new', {
        author: new Author()
    })
})

router.post('/', (req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    author.save().then(()=>{
      res.redirect('/authors')
    })
    .catch((err)=>{
        res.render('authors/new', {
            author: author,
            errorMessage: err
        })
    })
})

 module.exports = router