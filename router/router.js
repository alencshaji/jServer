

const { adminLogin, userReg ,userLogin,companyReg, companyLogin, addJob} = require('../controllers/logic')

const express = require('express')
const router = new express.Router()


router.post('/admin/login',adminLogin)
router.post('/user/register',userReg)
router.get('/user/login',userLogin)
router.post('/company/register',companyReg)
router.get('/company/login',companyLogin)
router.post('/company/job/post/:cid',addJob)



module.exports=router