var React 			= require('react');
var CadastroActions = require('../actions/CadastroActions');
var PessoaStore     = require('../stores/PessoaStore');

var Pessoa = React.createClass({

	editar: function () { 
	    CadastroActions.updateFormDados(this.props.pessoa);
	    CadastroActions.updateFormVisible(true);
	    CadastroActions.desabilitarBotao("disabled");
  	},
	
	excluir: function () {
	    var confirma = confirm('Deseja excluir este registro?');

	    if (confirma)
	      CadastroActions.excluir(this.props.pessoa);
  	},
  	
  	render: function() {
		var pessoa 		= this.props.pessoa;
		var desabilita 	= this.props.desabilitarBotao;

	    return (
	        <tr>
		        <td>{ pessoa.id }</td>
		        <td>{ pessoa.nome }</td>
		        <td>{ pessoa.cidade }</td>
		        <td><button className='altera-item' disabled={desabilita} onClick={this.editar}>Editar</button></td>
		        <td><button className='remove-item' disabled={desabilita} onClick={this.excluir}>Excluir</button></td>
		    </tr>
	    )
  	}
});

module.exports = Pessoa;

