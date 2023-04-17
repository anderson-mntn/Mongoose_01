const express = require('express');
const router = express.Router();

//importamos aqui
const linkController = require('../controllers/linkControllers')
// E passamos qual metodo queremos usar quando a res for atendida
router.get('/:title', linkController.redirect)


router.get('/', (req,res) => res.send('Hello world!'));

module.exports = router;

