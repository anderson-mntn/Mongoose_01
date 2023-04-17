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

module.exports = {redirect, Link} //pode ter outras funções aqui dentro