const { admin, user, company, jobPost } = require("../models/collection")
const bcrypt = require('bcrypt');


//adminLogin

const adminLogin = (req, res) => {
    const { uname, psw } = req.body
    admin.findOne({ uname }).then(ad => {
        if (ad) {
            if (ad.psw == psw) {
                res.status(200).json({
                    message: "Login succesfully",
                    status: true,
                    statusCode: 200,
                })
            } else {
                res.status(404).json({
                    message: "Incorrect Password",
                    status: false,
                    statusCode: 404
                })
            }
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

const userReg = async (req, res, next) => {
    const { username, email, psw, fname, lname, location,state,dob,gender,cod,ph,category } = req.body;
    if (!username || !email || !psw) {
        return next("All fields are required");
    }
    const hashedPw = await bcrypt.hash(psw, 10);
    const existingCompany = await company.findOne({ email });
    if (existingCompany) {
        return next("Email already registered as a Company");
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: "Email already registered",
            status: false,
            statusCode: 400,
        });
    }
    const newUser = await user.create({
        username,
        email,
        psw: hashedPw,
        fname,
        lname,
        location,
        state,
        dob,
        gender,
        cod,
        ph,
        category
    });
    res.status(201).json({
        message: "Registered Successfully",
        status: true,
        statusCode: 201,
        user: newUser,
    });
};



const userLogin = async (req, res, next) => {
    const { email, psw } = req.body;
    if (!email || !psw) {
        return next("Please Provide all fields")
    }

    const ur = await user.findOne({ email });

    if (ur) {
        const decrptPsw = await bcrypt.compare(psw, ur.psw);
        console.log(decrptPsw);
        if (decrptPsw) {
            res.status(200).json({
                message: "Login successfully",
                status: true,
                statusCode: 200,
                _id: ur._id,
                fname:ur.fname
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
const companyReg = async (req, res, next) => {
    const { cname, email, psw } = req.body;
    if (!cname || !email || !psw) {
        return next("Company name, email, and password are all required");
    }
    const hashedPw = await bcrypt.hash(psw, 10);
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return next("Email already registered as a user");
    }
    const existingCompany = await company.findOne({ email });
    if (existingCompany) {
        return res.status(400).json({
            message: "Email already registered",
            status: false,
            statusCode: 400,
        });
    }
    const newCompany = await company.create({ cname, email, psw: hashedPw });
    res.status(201).json({
        message: "Registered Successfully",
        status: true,
        statusCode: 201,
        company: newCompany,
    });
};




//company login

const companyLogin = async (req, res, next) => {
    const { email, psw } = req.body;
    if (!email || !psw) {
        return next("Please Provide all fields")
    }
    const comp = await company.findOne({ email })
    if (comp) {
        const decrptPsw = await bcrypt.compare(psw, comp.psw);
        if (decrptPsw) {
            res.status(200).json({
                message: "Login successfully",
                status: true,
                statusCode: 200,
                _id: comp._id,
                cname:comp.cname
            });
        } else {
            res.status(404).json({
                message: "Incorrect password",
                status: false,
                statusCode: 404
            });
        }
    } else {
        return next("Company not found")
    }
}

//addjob

const addJob = async (req, res, next) => {
    const { title, category, role, location,state, salary, jobtype,expirence, cname,cid } = req.body
    if (!title) {
        return next("Title required")
    }
    if (!category) {
        return next("Category required")
    }
    if (!role) {
        return next("Job role required")
    }
    if(!state){
        return next("State required")
    }
    if (!salary) {
        return next("Salary required")
    }
    if (!jobtype) {
        return next("Job type required")
    }
    if (!expirence) {
        return next("expirencetype required")
    }

    try {
        const jobadd = await jobPost.create({
            title,
            category,
            role,
            location,
            salary,
            state,
            jobtype,
            expirence,
            cname,
            cid,
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
const allJob=(req,res)=>{
    jobPost.find().then(data=>{
        if(data){
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        }else{
            alert("error in loading data")
        }
    })
}


module.exports = { adminLogin, userReg, userLogin, companyReg, companyLogin, addJob,allJob }