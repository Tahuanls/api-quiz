const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const perguntaSchema = new Schema({
    pergunta: String,
    respostas: [String],
    respostaCerta: Number
})

const Pergunta = mongoose.model('Pergunta', perguntaSchema);

module.exports = Pergunta;