var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CadastroConstants = require('../constants/CadastroConstants');
var CadastroAPI = require('../utils/CadastroAPI.js');
var _ = require('underscore');

var _pessoa = {};
var _pessoaEd = {id:'', nome:'', cidade:''};
var _formVisible = false;
var _formDesabilitaBotao = "";

function loadPessoaData(data) {
  _pessoa = data;
}

function setFormVisible(formVisible) {
  _formVisible = formVisible;
}

function setDesabilitaBotao(formDesabilitaBotao) {
  if (formDesabilitaBotao == 'disabled')
    _formDesabilitaBotao = formDesabilitaBotao;
  else 
    _formDesabilitaBotao = "";
}

function setFormCarregaDados(data) {
  _pessoaEd = data;
}

function setSave(data) {
  if (data.id)
    var stCadastro = CadastroConstants.EDIT_DATA;
  else
    var stCadastro = CadastroConstants.NEW_DATA;

  CadastroAPI.saveCadastroData(data, stCadastro);
}

function setExcluir(data) {
  CadastroAPI.excluirCadastroData(data);
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var PessoaStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getPessoa: function() {
    return _pessoa;
  },

  getPessoaEdit: function() {
    return _pessoaEd;
  },

  getFormVisible: function () {    
    return _formVisible;
  },

  getDesabilitaBotao: function () {
    return _formDesabilitaBotao;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    // Respond to RECEIVE_DATA action
    case CadastroConstants.RECEIVE_DATA:
      loadPessoaData(action.data);
      break;
    case CadastroConstants.FORM_VISIBLE:
      setFormVisible(action.formVisible);
      break;
    case CadastroConstants.FORM_DESABILITA_BOTAO:
      setDesabilitaBotao(action.formDesabilitaBotao);
      break;
    case CadastroConstants.FORM_CARREGA_DADOS:
      setFormCarregaDados(action.data);
      break;
    case CadastroConstants.SAVE_DATA:
      setSave(action.data);
      break;
    case CadastroConstants.EXCLUIR_DATA:
      setExcluir(action.data);
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  PessoaStore.emitChange();

  return true;

});

module.exports = PessoaStore;