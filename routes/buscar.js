const { Router } = require('express');
const { getArticleByCategory, 
        articleByName} = require('../controllers/buscar');

const router = Router();


router.get('/:coleccion', getArticleByCategory );

router.post('/', articleByName );




module.exports = router;