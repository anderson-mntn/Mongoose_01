const express = require('express');
const router = express.Router();

//importamos aqui
const linkController = require('../controllers/linkControllers');


// esta rota /all deve ser antes de /:title para que não busque um title igual a "all"
router.get('/all', linkController.showAllSavedLinks)

// E passamos qual metodo queremos usar quando a res for atendida
// Verifica se existe algum objeto no db com o title igual ao que foi passado, 
// se existir ele retorna o link com ele
router.get('/:title', linkController.redirect) 

router.get('/', (req,res) => res.render('index', {error: false, body: {}} ));

router.post('/', express.urlencoded({extended: true}), linkController.addLink);

router.delete('/:id', linkController.deleteLink);

router.delete('/', express.json(), linkController.deleteLink);

module.exports = router;

