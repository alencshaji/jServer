const { admin, user, company, jobPost} = require("../models/collection")
const bcrypt = require('bcrypt');


//adminLogin

const adminLogin = (req, res) => {
    const { uname, psw } = req.body
    admin.findOne({ uname, psw }).then(ad => {
        if (ad) {
            res.status(200).json({
                message: "Login succesfully",
                status: true,
                statusCode: 200,
            })
        } else {
            res.status(404).json({
                message: "Incorrect data",
                status: false,
                statusCode: 404
            })
        }
    })

}


//user

const userReg =async (req, res, next) => {
    const { username, email, psw } = req.body;
    const hashedpw = await bcrypt.hash(psw,10);
    console.log(hashedpw);
    const existingCompany = company.findOne({email})
    if(existingCompany){
        return next("Already registered as Company")
    }else{
        user.findOne({ email }).then(ur => {
            if (!username) {
                return next("name is required")
            }
            if (!email) {
                return next("email is required")
            }
            if (!psw) {
                return next("password is required")
            }
            if (ur) {
                res.status(404).json({
                    message: "Already a member",
                    status: false,
                    statusCode: 404,
                })
            } else {
                const users = user.create({ username, email, psw :hashedpw,fname,lname,location})
                res.status(201).json({
                    message: "Registred Succesfully",
                    status: true,
                    statusCode: 201,
                    users,
                })
            }
        })
    }
  


}
const userLogin = async (req, res, next) => {
    const { email, psw } = req.body;
    if (!email) {
        return next("Please Provide all fields")
    }
    if (!psw) {
        return next("Please Provide all fields")
    }

    const ur = await user.findOne({ email });

    if (ur) {
        const decrptPsw = await bcrypt.compare(psw,ur.psw);
        console.log(decrptPsw);
        if (decrptPsw) {
            res.status(200).json({
                message: "Login successfully",
                status: true,
                statusCode: 200,
                _id: ur._id
            });
        } else {
            res.status(404).json({
                message: "Incorrect password",
                status: false,
                statusCode: 404
            });
        }
    } else {
      return next("User not found")
    }

};


//company reg
const companyReg = async (req,res,next)=>{
   const {cname,email,psw}=req.body
    const hashedpw = await bcrypt.hash(psw,10);
    console.log(hashedpw);
    const existingUser = await user.findOne({email})
    if(existingUser){
       return next("Already registered as user")
    }else{
        company.findOne({email}).then(ur => {
            if (!cname) {
                return next("Company name is required")
            }
            if (!email) {
                return next("email is required")
            }
            if (!psw) {
                return next("password is required")
            }
            if (ur) {
                res.status(404).json({
                    message: "Email id already registered",
                    status: false,
                    statusCode: 404,
                })
            } else {
                const companies = company.create({ cname, email, psw :hashedpw})
                res.status(201).json({
                    message: "Registred Succesfully",
                    status: true,
                    statusCode: 201,
                   companies,
                })
            }
        })
    } 
}

//company login

const companyLogin =  async (req, res, next) => {
    const { email, psw } = req.body;
    if (!email) {
        return next("Please Provide all fields")
    }
    if (!psw) {
        return next("Please Provide all fields")
    }
    const comp = await company.findOne({email})
    if (comp) {
        const decrptPsw = await bcrypt.compare(psw,comp.psw);
        console.log(decrptPsw);
        if (decrptPsw) {
            res.status(200).json({
                message: "Login successfully",
                status: true,
                statusCode: 200,
                _id: comp._id
            });
        } else {
            res.status(404).json({
                message: "Incorrect password",
                status: false,
                statusCode: 404
            });
        }
    } else {
      return next("No data found")
    }
}

//addjob

const addJob = async (req,res,next)=>{
    const {cid} = req.params
    const {title,category,role,location,salary,jobtype,cname,clogo}=req.body
    if(!title){
        return next("Title required")
    }
    if(!category){
        return next("Category required")
    }
    if(!role){
        return next("Job role required")
    }
    if(!salary){
        return next("Salary required")
    }
    if(!jobtype){
        return next("Job type required")
    }
    try {
        const jobadd = await jobPost.create({
            title,
            category,
            role,
            location,
            salary,
            jobtype,
            cname,
            clogo,
            cid
        });

        res.status(201).json({
            message: "Job Posted",
            status: true,
            statusCode: 201,
            jobadd,
        });
    } catch (error) {
        return next(error);
    }
   
    
}


module.exports = { adminLogin, userReg, userLogin ,companyReg,companyLogin,addJob}