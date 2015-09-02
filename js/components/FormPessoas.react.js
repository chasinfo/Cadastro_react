var React 			= require('react');
var CadastroActions = require('../actions/CadastroActions');
var PessoaStore 	= require('../stores/PessoaStore');

// Method to retrieve state from Stores
function getCadastroState() {	

	var pessoa = PessoaStore.getPessoaEdit();

	return {
		id: pessoa.id,
    	nome: pessoa.nome,
    	cidade: pessoa.cidade,     	
    	visible: PessoaStore.getFormVisible(),
    	exibeErrorNome: '',
    	exibeErrorCidade: ''
  	};
}

var FormPessoas = React.createClass({

	close: function() {
		CadastroActions.updateFormVisible(false);
		CadastroActions.desabilitarBotao();
	},

	checkFieldNull: function(data) {
		var result = false;

		if (data.nome == '') {
			result = true;
			this.setState({exibeErrorNome: 'Preenchimento obrigatório'});
		} else {
			this.setState({exibeErrorNome: ''});
		}

		if (data.cidade == '') {
			result = true;
			this.setState({exibeErrorCidade: 'Preenchimento obrigatório'});
		} else {
			this.setState({exibeErrorCidade: ''});
		}

		return result;
	},

	getInitialState: function() {
		return getCadastroState();
	},

	handleSubmit: function(event) {
		event.preventDefault();
		
		var dados = {
			id: 	this.refs.id.getDOMNode().value.trim(), 
			nome: 	this.refs.nome.getDOMNode().value.trim(), 
			cidade: this.refs.cidade.getDOMNode().value.trim() 
		};
		
		if (!this.checkFieldNull(dados)) {
			CadastroActions.save(dados);
		}
	},

  	// Add change listeners to stores
  	componentDidMount: function() {
    	PessoaStore.addChangeListener(this._onChange);
  	},

  	// Remove change listers from stores
  	componentWillUnmount: function() {
    	PessoaStore.removeChangeListener(this._onChange);
  	},

	handleChangeNome: function(event) {
		this.setState({nome: event.target.value});
	},

	handleChangeCidade: function(event) {
		this.setState({cidade: event.target.value});
	},

	// Method to setState based upon Store changes
  	_onChange: function() {
    	this.setState(getCadastroState());
  	},

	render: function() {

		return (
		    <div className={'formPessoas ' + (this.state.visible ? '' : 'inativo')} >
		    	<button type="button" className="close-cart" onClick={this.close}>×</button>
		    	<div>
			    	<form ref='form' onSubmit={this.handleSubmit}>
			    		<input name='id' ref='id' type='hidden' value={this.state.id} />
			    		<div className='formField'>
			    			<label>Nome:</label>
			    			<input name='nome' ref='nome' type='text' value={this.state.nome} onChange={this.handleChangeNome} />
			    			<div className={'campoError ' + (this.state.exibeErrorNome ? '' : 'inativo')} >{this.state.exibeErrorNome}</div>
			    		</div>
			    		<div className='formField'>
			    			<label>Cidade:</label> 
			    			<input name='cidade' ref='cidade' type='text' value={this.state.cidade} onChange={this.handleChangeCidade} />
			    			<div className={'campoError ' + (this.state.exibeErrorCidade ? '' : 'inativo')}>{this.state.exibeErrorCidade}</div>
			    		</div>
			    		<button type='submit' className='Salvar'>Salvar</button>
			    	</form>
		    	</div>

		    </div>

		);
	}
});

module.exports = FormPessoas;