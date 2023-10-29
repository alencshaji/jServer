

const { adminLogin, userReg ,userLogin,companyReg, companyLogin, addJob, allJob,oneJob, editJob, deleteJob, appliedJob} = require('../controllers/logic')

const express = require('express')
const router = new express.Router()

//admin router
router.post('/admin/login',adminLogin)

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

//others
router.get('/job/alljob',allJob)
router.post('/user/apply/job',appliedJob)



module.exports=router