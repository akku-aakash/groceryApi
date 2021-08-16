const User = require('../models/users');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        req.profile = user;
        next();
    })
}

exports.read = (req, res) => {
    return res.json(req.profile);
}
