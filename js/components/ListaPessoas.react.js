var React           = require('react');
var CadastroActions = require('../actions/CadastroActions');
var PessoaStore     = require('../stores/PessoaStore');
var Pessoa          = require('./Pessoa.react');

function getCadastroState() {
  return {
    pessoas: PessoaStore.getPessoa(),
    desabilitaBotao: PessoaStore.getDesabilitaBotao(),
    formVisible: PessoaStore.getFormVisible()
  };
}

var ListaPessoas = React.createClass({

  novo: function (event) {
    pessoa =  {
      id: '',
      nome: '',
      cidade: ''
    };

    CadastroActions.updateFormDados(pessoa);
    CadastroActions.updateFormVisible(true);
    CadastroActions.desabilitarBotao("disabled");
  },

  // Get initial state from stores
  getInitialState: function() {
    return getCadastroState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    PessoaStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    PessoaStore.removeChangeListener(this._onChange);
  },

   // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getCadastroState());
  },

  render: function() {
    var pessoas           = this.state.pessoas;
    var desabilitarBotao  = this.state.desabilitaBotao;
    var formVisible       = this.state.formVisible;
    var botaoNovo         = <div><button className='novoCadastro' disabled={desabilitarBotao} onClick={this.novo}>Novo</button></div>

    if (pessoas.length > 0) {
      return (
        <div className={'listaPessoas ' + (formVisible ? 'transparente' : '')}>
          <table width='100%'>
            <thead>
              <th>Id</th>
              <th>Nome</th>
              <th>Cidade</th>
              <th></th>
            </thead>
            <tbody>
            { 
              Object.keys(pessoas).map(function (pessoa) {                
                var p = pessoas[pessoa];
                return (
                  <Pessoa key={p.id} pessoa={p} desabilitarBotao={desabilitarBotao}/>
                )
              })  
            }
            </tbody>
          </table>
          
          { botaoNovo }

        </div> 
      );

    } else {
      return (
        <div className='listaPessoas'>
          NENHUM REGISTRO ENCONTRADO
          { botaoNovo }
        </div>
      );
    }
  }
});

module.exports = ListaPessoas;