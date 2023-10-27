

const { adminLogin, userReg ,userLogin,companyReg, companyLogin, addJob, allJob} = require('../controllers/logic')

const express = require('express')
const router = new express.Router()


router.post('/admin/login',adminLogin)
router.post('/user/register',userReg)
router.post('/user/login',userLogin)
router.post('/company/register',companyReg)
router.post('/company/login',companyLogin)
router.post('/company/job/post',addJob)
router.get('/job/alljob',allJob)



module.exports=router