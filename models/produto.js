const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    nome: String,
    marca: String,
    grau: Number,
    codigo: Number,
    data_ini: Date,
    data_enc: Date
})

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;