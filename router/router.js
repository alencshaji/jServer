const { adminLogin, userReg, userLogin, companyReg, companyLogin,
  addJob, allJob, oneJob, editJob, deleteJob, applyJob, userAppliedJob,
  userSaveJob, savedJoblist, deleteSavedJob, deleteSavedAll, viewApplicantsJob, changeStatus,
  usersData, companyData, deleteCompany, deleteUser } = require('../controllers/logic')
const { jwtMiddleware } = require('../middlewares/token');
const express = require('express')
const router = new express.Router()
const upload = require('../middlewares/resume');
const path = require('path');
const fs = require('fs');



// router.get('/:filename', (req, res) => {
//   const { filename } = req.params;
//   const directoryPath = path.join(__dirname, '..', 'resumes');
//   console.log(__dirname);
//   fs.access(directoryPath, fs.constants.R_OK, (dirErr) => {
//     if (dirErr) {
//       console.error(`Directory access error: ${dirErr}`);
//       res.status(404).send('Directory not accessible');
//     } else {
//       const filePath = path.join(directoryPath, filename);
//       if (fs.existsSync(filePath)) {
//         res.sendFile(filePath);
//       } else {
//         console.error(`File not found: ${filePath}`);
//         res.status(404).send('File not found');
//       }
//     }
//   });
// });





//admin router
router.post('/admin/login', adminLogin)
router.get('/admin/userData', usersData)
router.get('/admin/companyData', companyData)
router.delete('/admin/delete/company/:cid', deleteCompany)
router.delete('/admin/delete/user/:uid', deleteUser)

//user Router
router.post('/user/register', upload.single('resume'), userReg)
router.post('/user/login', userLogin)

//company Router

router.post('/company/register', companyReg)
router.post('/company/login', companyLogin)
router.post('/company/job/post', addJob)
router.get('/company/getJobDetails/:id', oneJob)
router.put('/company/job/edit/:id', editJob)
router.delete('/company/delete/job/:id', deleteJob)
router.get('/company/getapplicantDetails/:cid', viewApplicantsJob)
router.put('/company/application/status/:cid/:uid/:jid', changeStatus)

//user
router.get('/user/applied/job/:uid', jwtMiddleware, userAppliedJob)
router.post('/user/saved/job/:uid/:jid', jwtMiddleware, userSaveJob)
router.get('/user/saved/job/list/:uid', jwtMiddleware, savedJoblist)
router.delete('/user/delete/job/:id', jwtMiddleware, deleteSavedJob)
router.delete('/user/delete/job/all/:id', jwtMiddleware, deleteSavedAll)

//others
router.get('/job/alljob', allJob)
router.post('/user/apply/job', jwtMiddleware, applyJob)


module.exports = router 