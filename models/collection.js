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
    category:String,
    state:String,
    dob:String,
    gender:String,
    cod:String,
    ph:String,
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
    jId:String,
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
    state:{
        type: String,

        required: [true, 'State is required']
    },
    salary: {
        type: String,
        required: [true, 'Salary is required']
    },
    jobtype: {
        type: String,
        required: [true, 'Job Type is required']
    },
    expirence:{
        type:String,
        required: [true, 'Experience is required']
    },
    cname: {
        type: String,
    }


},
    { timestamps: true }
)
const jobPost = mongoose.model("jobpost", jobPostSchema)


//user applied Job
const userJobSchema = new mongoose.Schema({
    cid: String,
    jid:String,
    uid: String,
    cname:String,
    title:String,
    location:String,
    state:String,
    uemail:String,
    fname:String,
    lname:String,
    cod:String,
    ph:String,
    
});
const userJob = mongoose.model("userJob", userJobSchema);

module.exports = { admin, user, company, jobPost,userJob }