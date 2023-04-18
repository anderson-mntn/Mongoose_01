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
        res.send(`Link saved successfully <a href="${doc.url}"> ${doc.description} </a>`);
    } catch(error){
        res.render('index', {error});
    } 
}

module.exports = {redirect, Link, addLink} //pode ter outras funções aqui dentro