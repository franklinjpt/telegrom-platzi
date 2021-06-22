const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express();

router.get('/', function (req, res) {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e)
        })

    // console.log(req.headers);
    // res.header({
    //     "custom-header": "Personalized value",
    // });
    // // res.send('Hello World');
    // response.success(req, res, "List of messages", 201);
});

//PROMESAS
// router.post('/', function (req, res){   
//     controller.addMessage(req.body.user, req.body.message)
//         .then((fullMessage) => {
//             response.success(req, res, fullMessage, 201);
//         })
//         .catch(error => {
//             response.error(req, res, 'Invalid information', 500, 'It\'s just a dummy error');
//         })
// });

//ASYNC-AWAIT
router.post("/", async (req, res) => {
    const{ user, message } = req.body

    try{
        const fullMessage = await controller.addMessage(user, message)
        response.success(req, res, fullMessage, 201)
    }catch (err){
        response.error(req, res, "Informacion invalida", 500, err)
    }
});

router.patch('/:id', function (req, res){
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(err =>{
            response.error(req, res, 'Internal error', 500, err);
        })
});

router.delete('/:id', function (req, res){
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `User [${req.params.id}] eliminated`, 200);    
        })
        .catch(err =>{
            response.error(req, res, 'Internal error', 500, err);
        })
});

module.exports = router;