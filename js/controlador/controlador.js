/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id){
    this.modelo.borrarPregunta(id);
  },
  editarPregunta: function(id, editada){
    this.modelo.editarPregunta(id, editada);
  },
  borrarTodasLasPreguntas: function(){
    this.modelo.borrarTodasLasPreguntas();
  },
  agregarVoto: function(pregunta, respuesta){
    this.modelo.votar(pregunta,respuesta);
  }
};