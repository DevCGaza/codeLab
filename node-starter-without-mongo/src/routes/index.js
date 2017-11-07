import express from 'express'


const router = express.Router();
router.get('/', (req, res) => {
    res.send('welcome ,, this is an graphql endpoint ,, go to /graphql to start using it !')
});


module.exports = router;