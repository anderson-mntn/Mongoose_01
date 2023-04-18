//Link require #1
const Link = require('../models/Link');

const redirect = async (req, res) =>{
    let title = req.params.title;

    try{
        //verificar se coincide com algum objeto / find/findOne
        let doc = await Link.findOne({title})
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
        res.render('index', {error, body: req.body});
    } 
}

const showAllSavedLinks = async (req, res) =>{

    try{
        let links = await Link.find({});
        res.render('all', {links})
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
       res.send(id) // Podemos substituir por res.redirect('/');

    } catch(error){
        res.status(404).send(error);
    }
}


module.exports = {redirect, Link, addLink, showAllSavedLinks, deleteLink} //pode ter outras funções aqui dentro