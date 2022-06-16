const paquete = require('../dbo/paquete.server.dbo')

exports.findAll = (req, res) => {
    paquete.findAll((err, result) =>{
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

exports.create = (req, res) =>{
    paqueteInfo = req.body
    paquete.create(paqueteInfo, (err, result) => {
        if (err) {
            res.status(422).send({
                success: false,
                message: 'Failed to save!'
            })
        } else {
            res.status(200).send({
                success: true,
                message: 'Successfully save!'
            });
        }
    });
}

exports.findById = (req, res) =>{
    paquete.findById(req.params.id, (err, result) =>{        
        if (err) {
            res.status(422).send({
                success: false,
                message: 'Failed to find!'
            })
        } else {
            res.status(200).send(result);
        }
    })
}

exports.update = (req, res) =>{
    paquete.update(req.params.id, req.body, (err, result) =>{        
        if (err) {
            res.status(422).send({
                success: false,
                message: 'Failed to find!'
            })
        } else {
            res.status(200).send(result);
        }
    })
}


exports.delete = (req, res) =>{
    paquete.delete(req.params.id, (err, result) =>{        
        if (err) {
            res.status(422).send({
                success: false,
                message: 'Failed to find!'
            })
        } else {
            res.status(200).send(result);
        }
    })
}