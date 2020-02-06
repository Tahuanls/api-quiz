const mongoose = require('mongoose')
const perguntaModel = require('./models/pergunta')


class Database {
    constructor(){
        _connect();
    }
}

function _connect() {
    mongoose.connect('mongodb+srv://thauanDio:Soeusei94@katakuricluster-iwocg.mongodb.net/quizDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection successful')


        let pergunta1 = new perguntaModel({
            pergunta: 'Quanto é 1+1?',
            respostas: ['é 2', 'é 3', 'é 4'],
            respostaCerta: 1
        })
        
        pergunta1.save(function(err){
            if (err) 
                console.log(err)
            else
                console.log('salvou')
        })
        
    })
    .catch(err => {
        console.error('Database connection error:' + err)
    })
}

module.exports = new Database();
