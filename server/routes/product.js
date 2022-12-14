const Joi = require('joi');
const securityConsts = require('../consts/security-consts');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('product', async(req, resp) => {
    const schema = Joi.object({
        description : Joi.string().min(1).max(100).required(),
        preco : Joi.number().min(1).required(),
        //fkGroup: Joi.number().min(1).required(),
        //fkSubGroup: Joi.number().min(1).required(),
        //fkCollection: Joi.number().min(1).required(),
        })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.product.findAll({
        where : {
            description : req.body.description,
            //fkGroup: req.body.fkGroup,
            //fkSubGroup: req.body.fkSubGroup,
            //fkCollection: req.body.fkCollection
        } 
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const product = knl.sequelize().models.product.build({
        description : req.body.description,
        preco : req.body.preco,
        status   : 1,
        //fkGroup: req.body.fkGroup,
        //fkSubGroup: req.body.fkSubGroup,
        //fkCollection: req.body.fkCollection,
    });

    await product.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('product', async(req, resp) => {

    const result = await knl.sequelize().models.product.findAll({
        where : {
            status: 1
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('product/:id', async(req, resp) => {

    const result = await knl.sequelize().models.product.findAll({
        where : {
            id : req.params.id
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.put('product', async(req, resp) => {
    
    const result = await knl.sequelize().models.product.update({
        description : req.body.description,
        preco : req.body.preco,
    },{
        where : {
            id: req.body.id
        }
    });

    resp.send(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.delete('product/:id', async(req, resp) => {

    const result = await knl.sequelize().models.product.destroy({
        where : {
            id: req.params.id
        }
    });

    resp.json(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.patch('product/:id', async(req, resp) => {

    const result = await knl.sequelize().models.product.update({
        status : 0
    },{
        where : {
            id: req.params.id,
        },
    });

    resp.json(result)
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)