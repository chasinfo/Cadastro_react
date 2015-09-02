module.exports = {
  init: function() {
    localStorage.clear();
    localStorage.setItem('pessoas', JSON.stringify([
   {
      "id":1,
      "nome":"Carlos Santos",
      "cidade":"SH Jardim Mangueiral"
   },
   {
      "id":2,
      "nome":"Marcelo Santos",
      "cidade":"Guara II"
   },
   {
      "id":3,
      "nome":"Luciana Santos",
      "cidade":"Taguatinga"
   },
   {
      "id":4,
      "nome":"Dayane Amaral",
      "cidade":"SH Jardim Mangueiral"
   }
    ]))
  }
};