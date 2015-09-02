var CadastroData = require('../CadastroData');
var CadastroActions   = require('../actions/CadastroActions');
var CadastroConstants = require('../constants/CadastroConstants'); 

var _data = [];

CadastroData.init();

module.exports = {

	getCadastroData: function() {
		if (_data.length == 0) {
			_data = JSON.parse(localStorage.getItem('pessoas'));			
		} 	

    CadastroActions.receivePessoa(_data);
  },

  insereCadastro: function(data) {
    data = {
      id: _data.length + 1,
      nome: data.nome,
      cidade: data.cidade
    };

    _data.push(data);
  },

  atualizaCadastro: function(data) {
    for (i in _data) {
      if (_data[i].id == data.id) {
        _data[i].nome   = data.nome;
        _data[i].cidade = data.cidade;
      }
    }
  },

	saveCadastroData: function(data, stCadastro) { 

    switch (stCadastro) {
      case CadastroConstants.NEW_DATA :
        this.insereCadastro(data);
        break;
      case CadastroConstants.EDIT_DATA :
        this.atualizaCadastro(data);
        break;
      default:
        return true;
    }
  },
  excluirCadastroData: function(data) {
    for (i in _data) {
      if (_data[i].id == data.id) {
        _data.splice(i, 1);
      }
    }
  }
};