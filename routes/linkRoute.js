const express = require('express');
const router = express.Router();

//importamos aqui
const linkController = require('../controllers/linkControllers');


// esta rota /all deve ser antes de /:title para que não busque um title igual a "all"
router.get('/', linkController.showAllSavedLinks)

// prestar atenção para não ter rotas de buscas acima das configuradas.
router.get('/add', (req, res) => res.render('index', {error: false, body: {}}));

// E passamos qual metodo queremos usar quando a res for atendida
// Verifica se existe algum objeto no db com o title igual ao que foi passado, 
// se existir ele retorna o link com ele
router.get('/:title', linkController.redirect) 


router.post('/', express.urlencoded({extended: true}), linkController.addLink);

router.delete('/:id', linkController.deleteLink);

router.delete('/', express.json(), linkController.deleteLink);

module.exports = router;

