const db = require('mongoose');
const Model = require('./model');
const { config } = require('./config');

const user = encodeURIComponent(config.dbUser);
const pass = encodeURIComponent(config.dbPassword);
const host = encodeURIComponent(config.dbHost);
const database = encodeURIComponent(config.dbName);
const uri = `mongodb+srv://${user}:${pass}@${host}/${database}?retryWrites=true&w=majority`;

db.Promise = global.Promise;
db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('[db connection] Database connected')
})
.catch( error => {
    console.error('[db connection] Connection failed', error.message) 
});

// const list = [];

function addMessage(message){
    // list.push(message);
    const myMessage = new Model(message);
    myMessage.save();
}

async function updateMessage(id, message){
    // const foundMessage = await Model.findById(id);

    // foundMessage.message = message;
    // const newMessage = await foundMessage.save();
    // return newMessage;
    //OTRA FORMA
    const updatedMessage = await Model.findOneAndUpdate(
        { _id: id },
        { message },
        { new: true }
      )
      
      return updatedMessage
}

async function getMessages(filterUser){
    let filter = {};
    if(filterUser !== null){
        filter = { user: filterUser};
    }
    const messages = await Model.find(filter);
    return messages;
}

function removeMessage(id){
    return Model.deleteOne({ _id: id});
}

const ifExist = async (id) => {
    return await Model.exists({
          _id: id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateMessage,
    remove: removeMessage
}