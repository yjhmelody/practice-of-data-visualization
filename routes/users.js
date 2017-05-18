var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // console.log(req.query)
    res.json({
        name: "Yjh"
    });
});

module.exports = router;