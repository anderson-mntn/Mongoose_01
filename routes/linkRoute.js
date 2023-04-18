const express = require('express');
const router = express.Router();

//importamos aqui
const linkController = require('../controllers/linkControllers')

// E passamos qual metodo queremos usar quando a res for atendida
// Verifica se existe algum objeto no db com o title igual ao que foi passado, 
// se existir ele retorna o link com ele
router.get('/:title', linkController.redirect) 

router.get('/', (req,res) => res.render('index'));

router.post('/', express.urlencoded({extended: true}), linkController.addLink);

module.exports = router;

