const evento = require('../dbo/evento.server.dbo')

exports.findAll = ((req, res) => {
    evento.findAll((err, result) =>{
        if (err) {
            res.status(400).send({
                success: false,
                message: err
            })
        } else {        
            res.status(200).send(result);
        }
    })
})

exports.create = (req, res) =>{
    evento.create(req.body, (err, result) => {
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
    evento.findById(req.params.id, (err, result) =>{        
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

exports.findMsgById = (req, res) =>{
    evento.findById(req.params.id, (err, result) =>{        
        if (err) {
            res.status(422).send({
                success: false,
                message: 'Failed to find!'
            })
        } else {
            res.status(200).send(result.comentarios);
        }
    })
}

exports.comment = (req, res) =>{
    evento.saveComment(req.params.id, req.body, (err, result) =>{        
        if (err) {
            res.status(422).send({
                success: false,
                message: 'Failed to find!',
                err
            })
        } else {
            res.status(200).send(result);
        }
    })
}

exports.update = (req, res) =>{
    evento.update(req.params.id, req.body, (err, result) =>{        
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
    evento.delete(req.params.id, (err, result) =>{        
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