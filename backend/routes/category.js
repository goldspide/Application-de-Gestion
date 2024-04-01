require('dotenv').config();

const express = require('express');
const connection  = require('../connection');
const router = express.Router();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticationToken,checkRole.checkRole, (req, res) =>{

    let category = req.body;
    query = "insert into category (name) values(?)";
    connection.query(query,[category.name],(err, results) =>{
        if(!err){
            return res.status(200).json({message: "Category Added Successfully"});

        }else{
            return res.status(500).json(err);
        }
    })
});

router.get('/get', auth.authenticationToken,(req, res,next) => {
    var query = 'select * from category order by name';

    connection.query(query, (err, results) => {
        if(!err){
            return res.status(200).json(results);

        }else{
            return res.status(500).json(err);
        }
    })
});

router.patch('/update', auth.authenticationToken,checkRole.checkRole, (req, res,next) =>{
    let product = req.body;
    var query = "update category set name = ? where id = ?";
    connection.query(query,[product.name,product.id], (err, results) =>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Category id does not exist"})
            }
            return  res.status(200).json({message:"Category Updated Successfully"})

        }else{
            return res.status(500).json(err);
        }

    })
});

router.delete('/delete', auth.authenticationToken,(req, res,next) => {
    let produit = req.body;
    var query = "delete from category where id = ?";
    connection.query(query,[produit.id], (err, results) => {
        if(!err){
            if(results.affectedRows === null){
                return res.status(404).json({message: "Category does not exist"});
            }
            return res.status(200).json({message: "Delete Completed !!"});

        }else {
            return res.status(500).json(err);
        }
    })

})

module.exports = router;