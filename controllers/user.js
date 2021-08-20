const User = require('../models/users');
const {deleteFile} = require('../helpers/file')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.json({ message: 'User Not Found' });
        }
        req.profile = user;
        next();
    })
}

exports.read = (req, res) => {
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {

    const user = req.profile;

    if(user.imgURL){
        deleteFile(user.imgURL)
    }
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.imgURL = req.file.path
    user.address = [...user.address, {
        city: req.body.city,
        address: req.body.address,
        zip: req.body.zip
    }]

    user.save((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            return res.json({ message: "User updated Successfully", data });
        }
    })
}
