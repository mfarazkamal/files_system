const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    fs.readdir(`./files`, function(err, files){
        console.log(files);
        res.render('index', {files: files})
    })
})

app.post('/create', (req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.desc, (err)=>{
        res.redirect('/')
    })
})

app.get('/file/:filename', (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data)=>{
        res.render('show', {filename: req.params.filename, filedata: data});
    })
    })

    app.get('/edit/:filename', (req,res)=>{
            res.render('edit', {filename: req.params.filename});
        })

    app.post('/edit', (req,res)=>{
        fs.rename(`./files/${req.body.previous}`, `./files/${req.body.newName}.txt`, (err)=>{
            res.redirect('/')
        })
        })


app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})