//Link require #1
const Link = require('../models/Link');

const redirect = async (req, res) =>{
    let title = req.params.title;

    try{
        //verificar se coincide com algum objeto / find/findOne
        let doc = await Link.findOneAndUpdate({title}, {$inc:{click:1}});
        res.redirect(doc.url);

    } catch (error){
        res.send("Rota nao encontrada! =(");
    } 
}

const addLink = async (req, res) =>{
    let link = new Link(req.body);

    try{
        let doc = await link.save();
        // adicionando link clicavel e texto setado pela descrição do usuário
        //res.send(`Link saved successfully <a href="${doc.url}"> ${doc.description} </a>`);

        res.redirect('/')

    } catch(error){
        res.render('add', {error, body: req.body});
    } 
}

const showAllSavedLinks = async (req, res) =>{

    try{
        let docs = await Link.find({});
        res.render('all', {links: docs})
    } catch(error){
        res.send(error);
    } 
}

const deleteLink = async (req, res) =>{

    let id = req.params.id;
    
    // pegando um identificador caso id nao exista
    if(!id){
        id = req.body.id;
    }

    try{
      // Link.deleteOne({_id:id}) // Link.deleteOne({{"condição para deletar"}) 
       await Link.findByIdAndDelete(id);
       res.send(id); // Podemos substituir por res.redirect('/');

    } catch(error){
        res.status(404).send(error);
    }
}

const loadLink = async (req, res) =>{
    let id = req.params.id;
    try{
       let doc = await Link.findById(id);
       res.render('edit', {error:false, body: doc});
    } catch(error){
        res.status(404).send(error);
    }
}

const editLink = async (req, res) =>{
    let link = {};
    link.title = req.body.title;
    link.description = req.body.description;
    link.url = req.body.url;

    let id = req.params.id;
    if(!id){
        id = req.body.id;
    }

    try{
        let doc = await Link.findByIdAndUpdate(id, link);
        // let doc = await Link.updateOne({ _id: id}, link);
        res.redirect('/');
    } catch(error){
        res.render('edit', {error, body: req.body});
    }
}

module.exports = {Link, redirect, addLink, showAllSavedLinks, deleteLink, loadLink, editLink} 