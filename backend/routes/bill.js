// const express = require('express');
// const connection = require('../connection');
// const router = express.Router();
// let ejs = require('ejs');
// let pdf = require('html-pdf');
// let path = require('path');
// var fs = require('fs');
// var uuid = require('uuid');
// var auth = require('../services/authentication');

// process.env.OPENSSL_CONF = '/dev/null';
// // Fonction pour attribuer les autorisations d'écriture au dossier
// // function setDirectoryPermissions(directoryPath) {
// //     fs.chmod(directoryPath, 0o777, (err) => {
// //       if (err) {
// //         console.error('Erreur lors de l\'attribution des autorisations d\'écriture :', err);
// //       } else {
// //         console.log('Autorisations d\'écriture attribuées avec succès !');
// //       }
// //     });
// //   }

// router.post('/genereteReport', auth.authenticationToken,(req, res)=>{
//     const generatedUuid = uuid.v1();
//     const orderDetails = req.body;
//     var productDetailsReport = JSON.parse(orderDetails.productDetails);
//     query = 'insert into bill (name,uuid,email,contactNumber,paymentMethod,total,productDetails,createdBy) values (?,?,?,?,?,?,?,?)';
//     connection.query(query,[orderDetails.name,generatedUuid,orderDetails.email,orderDetails.contactNumber,orderDetails.paymentMethod,orderDetails.totalAmount,orderDetails.productDetails,res.locals.email],(err,results)=>{

//         if(!err){
//             ejs.renderFile(path.join(__dirname,'',"report.ejs"),{productDetails:productDetailsReport,name:orderDetails.name,contactNumber:orderDetails.contactNumber,paymentMethod:orderDetails.paymentMethod,totalAmount:orderDetails.totalAmount,email:orderDetails.email},(err,results)=>{
//                 if(err){
//                     console.log(err);
//                     return res.status(500).json(err);
                    
//                 }else{
//                     pdf.create(results).toFile('./generated_pdf/'+generatedUuid+".pdf",function(err,data){
//                         if(err){
//                             console.log(err);
//                             return res.status(500).json(err);
//                         }else{
//                             return res.status(200).json({uuid:generatedUuid});
//                         }
//                     })
//                 }
//             })


//         }else{
//             res.status(500).json(err);
//         }

//     })
// })

// router.post('/getPdf',auth.authenticationToken,(req,res)=>{
//     const orderDetails =req.body;
//     const pdfPath = './generated_pdf/'+ orderDetails.uuid+'.pdf';
//     if(fs.existsSync(pdfPath)){
//         res.contentType('application/pdf');
//         fs.createReadStream(pdfPath).pipe(res);
//     }else{
//         var productDetailsReport = JSON.parse(orderDetails.productDetails);
//         ejs.renderFile(path.join(__dirname,'',"report.ejs"),{productDetails:productDetailsReport,name:orderDetails.name,contactNumber:orderDetails.contactNumber,paymentMethod:orderDetails.paymentMethod,totalAmount:orderDetails.totalAmount,email:orderDetails.email},(err,results)=>{
//             if(err){
//                 console.log(err);
//                 return res.status(500).json(err);
                
//             }else{
//                 pdf.create(results).toFile('./generated_pdf/'+orderDetails.uuid+".pdf",function(err,data){
//                     if(err){
//                         console.log(err);
//                         return res.status(500).json(err);
//                     }else{
//                         res.contentType('application/pdf');
//                         fs.createReadStream(pdfPath).pipe(res);
//                     }
//                 })
//             }
//         })
//     }
    
//  });



// module.exports = router;


// // const OPENSSL_CONF=/dev/null
// // const express = require('express');
// // const connection = require('../connection');
// // const router = express.Router();
// // const ejs = require('ejs');
// // const pdf = require('html-pdf');
// // const path = require('path');
// // const fs = require('fs');
// // const uuid = require('uuid');
// // const auth = require('../services/authentication');


// // // Fonction pour attribuer les autorisations d'écriture au dossier
// // function setDirectoryPermissions(directoryPath) {
// //   fs.chmod(directoryPath, 0o777, (err) => {
// //     if (err) {
// //       console.error('Erreur lors de l\'attribution des autorisations d\'écriture :', err);
// //     } else {
// //       console.log('Autorisations d\'écriture attribuées avec succès !');
// //     }
// //   });
// // }

// // router.post('/genereteReport', auth.authenticationToken, (req, res) => {
// //   const generatedUuid = uuid.v1();
// //   const orderDetails = req.body;
// //   const productDetailsReport = JSON.parse(orderDetails.productDetails);
// //   const query = 'insert into bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) values (?, ?, ?, ?, ?, ?, ?, ?)';
// //   connection.query(query, [orderDetails.name, generatedUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email], (err, results) => {
// //     if (!err) {
// //       ejs.renderFile(path.join(__dirname, '', 'report.ejs'), { productDetails: productDetailsReport, name: orderDetails.name, contactNumber: orderDetails.contactNumber, paymentMethod: orderDetails.paymentMethod, totalAmount: orderDetails.totalAmount, email: orderDetails.email }, (err, results) => {
// //         if (err) {
// //           console.log(err);
// //           return res.status(500).json(err);
// //         } else {
// //           const pdfFilePath = './generated_pdf/' + generatedUuid + '.pdf';
// //           pdf.create(results).toFile(pdfFilePath, (err, data) => {
// //             if (err) {
// //               console.log(err);
// //               return res.status(500).json(err);
// //             } else {
// //               setDirectoryPermissions(path.dirname(pdfFilePath)); // Attribuer les autorisations d'écriture au dossier
// //               return res.status(200).json({ uuid: generatedUuid });
// //             }
// //           });
// //         }
// //       });
// //     } else {
// //       res.status(500).json(err);
// //     }
// //   });
// // });

// // module.exports = router;



const express = require('express');
const connection = require('../connection');
const router = express.Router();
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const auth = require('../services/authentication');

// Exportation de OPENSSL_CONF
process.env.OPENSSL_CONF = '/dev/null';

// Fonction pour attribuer les autorisations d'écriture au dossier
function setDirectoryPermissions(directoryPath) {
  fs.chmod(directoryPath, 0o777, (err) => {
    if (err) {
      console.error('Erreur lors de l\'attribution des autorisations d\'écriture :', err);
    } else {
      console.log('Autorisations d\'écriture attribuées avec succès !');
    }
  });
}

router.post('/generateReport', auth.authenticationToken, (req, res) => {
  const generatedUuid = uuid.v1();
  const orderDetails = req.body;
  const productDetailsReport = JSON.parse(orderDetails.productDetails);
  const query = 'insert into bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) values (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [orderDetails.name, generatedUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email], (err, results) => {
    if (!err) {
      ejs.renderFile(path.join(__dirname, '', 'report.ejs'), { productDetails: productDetailsReport, name: orderDetails.name, contactNumber: orderDetails.contactNumber, paymentMethod: orderDetails.paymentMethod, totalAmount: orderDetails.totalAmount, email: orderDetails.email }, (err, renderedHtml) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        } else {
          const pdfFilePath = './generated_pdf/' + generatedUuid + '.pdf';
          setDirectoryPermissions(path.dirname(pdfFilePath)); // Attribuer les autorisations d'écriture au dossier
          const pdfOptions = { format: 'Letter' };
          pdf.create(renderedHtml, pdfOptions).toFile(pdfFilePath, (err, data) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            } else {
              return res.status(200).json({ uuid: generatedUuid });
            }
          });
        }
      });
    } else {
      res.status(500).json(err);
    }
  });
});
router.post('/getPdf',auth.authenticationToken,(req,res)=>{
    const orderDetails =req.body;
    const pdfPath = './generated_pdf/'+ orderDetails.uuid+'.pdf';
    if(fs.existsSync(pdfPath)){
        res.contentType('application/pdf');
        fs.createReadStream(pdfPath).pipe(res);
    }else{
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        ejs.renderFile(path.join(__dirname, '', 'report.ejs'), { productDetails: productDetailsReport, name: orderDetails.name, contactNumber: orderDetails.contactNumber, paymentMethod: orderDetails.paymentMethod, totalAmount: orderDetails.totalAmount, email: orderDetails.email }, (err, renderedHtml) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            } else {
              const pdfFilePath = './generated_pdf/'+ orderDetails.uuid + '.pdf';
              setDirectoryPermissions(path.dirname(pdfFilePath)); // Attribuer les autorisations d'écriture au dossier
              const pdfOptions = { format: 'Letter' };
              pdf.create(renderedHtml, pdfOptions).toFile(pdfFilePath, (err, data) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json(err);
                } else {
                    res.contentType('application/pdf');
                    fs.createReadStream(pdfPath).pipe(res);
                }
              });
            }
          });
    }
    
 });
 router.get('/getBills', auth.authenticationToken,(req, res) => {
var query = "select * from bill order by id desc";
connection.query(query,(err,results)=>{
    if(!err){
        return res.status(200).json(results);
    }else{
        return res.status(500).json(err);
    }
})
 });
 router.delete('/delete/:id',auth.authenticationToken,(req, res)=>{
    const id =req.params.id;
    var query = "delete from bill where id = ?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0 ){
                return res.status(404).json({message: "Bill id does not exist"});
            }else{
                return res.status(200).json({message: "Bill deleted Successfully"});
            }

        }else{
            return res.status(500).json(err)
        }
    })
 });

module.exports = router;