const { admin, user, company, jobPost, userJob, savedJob } = require("../models/collection")
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
    const { username, email, psw, fname, lname, location, state, dob, gender, cod, ph, category } = req.body;
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
                fname: ur.fname
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
                cname: comp.cname
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
    const { title, category, role, location, state, salary, jobtype, expirence, cname, cid } = req.body
    if (!title) {
        return next("Title required")
    }
    if (!category) {
        return next("Category required")
    }
    if (!role) {
        return next("Job role required")
    }
    if (!state) {
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
const allJob = (req, res) => {
    jobPost.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        } else {
            alert("error in loading data")
        }
    })
}
const editJob = (req, res, params) => {
    const { id } = req.params
    const { title,
        category,
        role,
        location,
        salary,
        state,
        jobtype,
        expirence,
    } = req.body
    jobPost.findOne({ _id: id }).then(data => {
        if (data) {
            data.title = title,
                data.category = category,
                data.role = role,
                data.location = location,
                data.salary = salary,
                data.state = state,
                data.jobtype = jobtype,
                data.expirence = expirence


            data.save()
            res.status(200).json({
                message: "Data Updated",
                status: true,
                statusCode: 200
            })
        }
    })

}
const oneJob = (req, res) => {
    const { id } = req.params
    jobPost.findOne({ _id: id }).then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        } else {
            res.status(404).json({
                message: "No data",
                status: false,
                statusCode: 404
            })
        }
    })
}
const deleteJob = (req, res) => {
    const { id } = req.params
    jobPost.deleteOne({ _id: id }).then(data => {
        res.status(200).json({
            message: "Job deleted",
            status: true,
            statusCode: 200
        })
    })
}
const applyJob = async (req, res) => {
    try {
        const { cid, jid, uid } = req.body;
        const udata = await user.findOne({ _id: uid });
        if (!udata) {
            return res.status(404).json({
                message: "Login to Apply",
                status: false,
                statusCode: 404,
            });
        }
        const existingJob = await userJob.findOne({ cid, jid, uid });
        if (existingJob) {
            return res.status(208).json({
                message: "Already Applied",
                status: false,
                statusCode: 208,
            });
        }
        const jobData = await jobPost.findOne({ _id: jid });
        if (jobData) {
            const newUserJob = await userJob.create({
                cid,
                jid,
                uid,
                title: jobData.title,
                uemail: udata.email,
                location: jobData.location,
                state: jobData.state,
                fname: udata.fname,
                lname: udata.lname,
                cname: jobData.cname,
                cod: udata.cod,
                ph: udata.ph,
            });

            return res.status(201).json({
                message: "Job Applied !!",
                status: true,
                statusCode: 201,
                userJob: newUserJob,
            });
        } else {
            return res.status(404).json({
                message: "Job not found",
                status: false,
                statusCode: 404,
            });
        }


    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: false,
            statusCode: 500,
            error: error.message,
        });
    }
};
const userAppliedJob = (req, res) => {
    const { uid } = req.params
    userJob.find({ uid }).then(data => {
        console.log(data);
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200,
            })
        } else {
            return res.status(204).json({
                message: "You haven't applied for any job yet",
                status: false,
                statusCode: 204,
            });
        }
    })
}
const userSaveJob = async (req, res) => {
    try {
        const { uid, jid } = req.params
        const udata = await user.findOne({ _id: uid });
        if (!udata) {
            return res.status(404).json({
                message: "Login to Apply",
                status: false,
                statusCode: 404,
            });
        }
        const existingJob = await savedJob.findOne({ uid, jid });
        console.log(existingJob);
        if (existingJob) {
            return res.status(208).json({
                message: "Already Saved Job",
                status: false,
                statusCode: 208,
            });
        }
        const jobData = await jobPost.findOne({ _id: jid });
        if (jobData) {
            const newSaveJobUser = await savedJob.create({
                uid,
                jid,
                title: jobData.title,
                cname: jobData.cname,
                location: jobData.location,
                expirence: jobData.expirence,
                role:jobData.role,
            
               
            })
            console.log("userJob:", newSaveJobUser); 
            return res.status(201).json({
                message: "Job Saved",
                status: true,
                statusCode: 201,
                userJob: newSaveJobUser,
                
            });
           
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: false,
            statusCode: 500,
        });
    }
}
const savedJoblist = (req, res) => {
    try {
        const {uid} =req.params
        savedJob.find({ uid }).then(data=>{
            if (data) {
                res.status(200).json({
                    message: data,
                    status: true,
                    statusCode: 200,
                })
            } else {
                return res.status(204).json({
                    message: "You haven't applied for any job yet",
                    status: false,
                    statusCode: 204,
                }); 
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}
const deleteSavedJob = (req, res) => {
    const { id } = req.params
    savedJob.deleteOne({ _id: id }).then(data => {
        res.status(200).json({
            message: "Job deleted",
            status: true,
            statusCode: 200,
        })
    })
}
const deleteSavedAll = (req, res) => {
    const { id } = req.params
    savedJob.deleteMany({ uid: id }).then(data => {
        res.status(200).json({
            message: "All Saved Jobs deleted",
            status: true,
            statusCode: 200,
        })
    })
}
module.exports = {
    adminLogin, userReg, userLogin, companyReg,
    companyLogin, addJob, allJob, editJob, oneJob,
    deleteJob, applyJob, userAppliedJob, userSaveJob,savedJoblist,deleteSavedJob,deleteSavedAll
}