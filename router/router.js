

const { adminLogin, userReg ,userLogin,companyReg, companyLogin,
     addJob, allJob,oneJob, editJob, deleteJob, applyJob, userAppliedJob,
      userSaveJob, savedJoblist, deleteSavedJob, deleteSavedAll, viewApplicantsJob, changeStatus, usersData, companyData, deleteCompany, deleteUser} = require('../controllers/logic')

const express = require('express')
const router = new express.Router()

//admin router
router.post('/admin/login',adminLogin)
router.get('/admin/userData',usersData)
router.get('/admin/companyData',companyData)
router.delete('/admin/delete/company/:cid',deleteCompany)
router.delete('/admin/delete/user/:uid',deleteUser)

//user Router
router.post('/user/register',userReg)
router.post('/user/login',userLogin)

//company Router

router.post('/company/register',companyReg)
router.post('/company/login',companyLogin)
router.post('/company/job/post',addJob)
router.get('/company/getJobDetails/:id',oneJob)
router.put('/company/job/edit/:id',editJob)
router.delete('/company/delete/job/:id',deleteJob)
router.get('/company/getapplicantDetails/:cid',viewApplicantsJob)
router.put('/company/application/status/:cid/:uid/:jid',changeStatus)

//user
router.get('/user/applied/job/:uid',userAppliedJob)
router.post('/user/saved/job/:uid/:jid',userSaveJob)
router.get('/user/saved/job/list/:uid',savedJoblist)
router.delete('/user/delete/job/:id',deleteSavedJob)
router.delete('/user/delete/job/all/:id',deleteSavedAll)

//others
router.get('/job/alljob',allJob)
router.post('/user/apply/job',applyJob)
 

module.exports=router 