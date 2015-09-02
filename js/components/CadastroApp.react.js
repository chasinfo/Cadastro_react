var React = require('react');
var ListaPessoas = require('./ListaPessoas.react');
var FormPessoas = require('./FormPessoas.react');

// Define main Controller View
var CadastroApp = React.createClass({

  render: function() {    
    return (
      <div className="cadastro-app">
        <FormPessoas />
        <ListaPessoas />
      </div>
    );
  },

});

module.exports = CadastroApp;