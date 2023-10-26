const mongoose = require('mongoose');
const { isEmail } = require('validator');



//admin model

const adminSchema = new mongoose.Schema({
    uname: String,
    psw: String,
});
const admin = mongoose.model("admin", adminSchema);



//user model

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    psw: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        validator: {
            validate: isEmail,
            message: 'Invalid email format',
        }
    },
    location: {
        type: String,
        default: 'India',

    },

},
    { timestamps: true }
)
const user = mongoose.model("user", userSchema);

//company model


const compSchema = new mongoose.Schema({
    cname: {
        type: String,
        required: [true, 'Company name is required']
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        validator: {
            validate: isEmail,
            message: 'Invalid email format',
        }
    },
    psw: {
        type: String,
        required: [true, 'Password is required'],
    }
},
    { timestamps: true }
);
const company = mongoose.model("company", compSchema);

//company-job post

const jobPostSchema = new mongoose.Schema({
    cid:{
        type:String
    },
    title: {
        type: String,
        required: [true, 'Job Title is required']
    },
    category: {
        type: String,
        required: [true, 'Job Category is required']
    },
    role: {
        type: String,
        required: [true, 'Job Role is required']
    },
    location: {
        type: String,
        default: "India",
        required: [true, 'Job Location is required']
    },
    salary: {
        type: String,
        required: [true, 'Salary is required']
    },
    jobtype: {
        type: String,
        required: [true, 'Job Type is required']
    },
    cname: {
        type: String,
        required: [true, 'Company name is required']
    },
    clogo: {
        type: String
    }


},
    { timestamps: true }
)
const jobPost = mongoose.model("jobpost", jobPostSchema)


module.exports = { admin, user, company, jobPost }