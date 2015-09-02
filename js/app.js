var React = require('react');
var CadastroAPI = require('./utils/CadastroAPI')
var CadastroApp = require('./components/CadastroApp.react');

CadastroAPI.getCadastroData();

React.render(
  <CadastroApp />,
  document.getElementById('cadastro')
);