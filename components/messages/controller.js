const store = require('./store');

function addMessage (user, message){
    return new Promise((resolve, reject) =>{
        if(!user || !message){
            console.error('[message controller] No user or message')
            reject('Data is incorrect');
        }

        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        }

        store.add(fullMessage);
        resolve(fullMessage);
    }); 
}

function getMessages(filterUser){
    return new Promise((resolve, reject) =>{
        resolve(store.list(filterUser));
    })
}

function updateMessage(id, message){
    return new Promise(async (resolve, reject) =>{
        if(!id || !message){
            reject('Invalid data');
        }

        const result = await store.updateText(id, message);
        resolve(result);
    }); 
}

function deleteMessage(id){
    return new Promise((resolve, reject) => {
        if(!id){
            reject('Id invalido');
        }

        store.remove(id)
            .then(() =>{
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};