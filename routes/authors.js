const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All Authors route
router.get('/', async (req, res) =>{
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions);
        res.render('views/authors/index', { 
            authors: authors,
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
    
});

// New Author Route
router.get('/new', (req, res) =>{
    res.render('views/authors/new', { author: new Author() });
});

//create Author route
router.post('/', async (req, res) =>{
    const author = new Author({
        name: req.body.name
    });
    try{
        const newAuthor = await author.save();
        //res.redirect(`views/authors/${newAuthor.id}`);
        res.redirect('authors');
    } catch{
        res.render('views/authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        });
    }
   
});


module.exports = router;