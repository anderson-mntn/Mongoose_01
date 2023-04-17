const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')

// ----- link schema -----

const linkSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    url: {type: String, required: true},
    click: {type: Number, default: 0}
});


const Link = mongoose.model('Link', linkSchema) // 'Link' vai ser o nome da coleção

let link = new Link({
    title: "twitter",
    description: "twitter do canal",
    url: "twitter.com/cidcidoso"
});

// link.save().then(linkDoc =>{
//     console.log(linkDoc);
// }).catch(err=>{
//     console.log(err);
// });
// o mongoose pluraliza no momento de salvar no db





// ------ mongoose conect ------

mongoose.set("strictQuery", true);

mongoose.connect('mongodb://127.0.0.1/links', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection;

db.on("error", () => console.log("houve um erro"));
db.once("open", () => {
    console.log("db carregado!");

    // tentar buscar algum objeto (link)
    // ler quando o usuario fizer a req
    app.get('/:title', async (req, res)=>{

        let title = req.params.title;

        try{
            //verificar se coincide com algum objeto 
            let doc = await Link.findOne({title})
            res.redirect(doc.url);

        } catch (error){
            res.send(error);
        } 
    })

})


// ------ app ------- 

app.get('/', (req,res) => res.send('Hello world!'))

app.listen(PORT, ()=> console.log("app listening on port", PORT));
