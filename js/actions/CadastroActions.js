var AppDispatcher = require('../dispatcher/AppDispatcher');
var CadastroConstants = require('../constants/CadastroConstants');

// Define actions object
var CadastroActions = {

  receivePessoa: function(data) {
  	AppDispatcher.handleAction({
    	actionType: CadastroConstants.RECEIVE_DATA,
    	data: data
    })
  },
  updateFormVisible: function(formVisible) {
  	AppDispatcher.handleAction({
		actionType: CadastroConstants.FORM_VISIBLE,
		formVisible: formVisible
    })
  },
  desabilitarBotao: function(formDesabilitaBotao) {
  	AppDispatcher.handleAction({
    	actionType: CadastroConstants.FORM_DESABILITA_BOTAO,
      	formDesabilitaBotao: formDesabilitaBotao
    })
  }, 
  updateFormDados: function(data) {
  	AppDispatcher.handleAction({
  		actionType: CadastroConstants.FORM_CARREGA_DADOS,
  		data: data
  	})
  },

  save: function(data) {
  	AppDispatcher.handleAction({
  		actionType: CadastroConstants.SAVE_DATA,
  		data: data
  	})
  }, 
  excluir: function(data) {
    AppDispatcher.handleAction({
      actionType: CadastroConstants.EXCLUIR_DATA,
      data: data
    })
  }
};

module.exports = CadastroActions;