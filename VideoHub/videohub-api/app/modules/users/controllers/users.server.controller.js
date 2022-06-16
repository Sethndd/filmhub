const usersDbo = require('../dbo/users.server.dbo');

exports.me = (req, res) => {
    usersDbo.findUserByUsername(req.email, function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                message: err
            })
        } else {
            let userData = {
                username: result.username,
                _id: result._id,
                roles: result.roles,
                firstName: result.firstName,
                lastName: result.lastName
            }
        
            res.status(200).send(userData);
        }
    })
}


exports.finbById = (req, res) => {
    usersDbo.findUserById(req.params.id, function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                message: err
            })
        } else {
        
            res.status(200).send(result);
        }
    })
}

exports.getAll = (req, res) => {
    usersDbo.findAll(function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                message: err
            })
        } else {       
            res.status(200).send(result);
        }
    })
}