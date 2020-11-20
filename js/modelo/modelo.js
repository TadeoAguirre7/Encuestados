/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.todoBorrado = new Evento(this);
  this.votoSumado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    var id;
    var totPreguntas = this.preguntas.length
    totPreguntas > 0 ? id = totPreguntas : id = 0;
    return id;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    var idBorrar = this.preguntas.map(pregunta => pregunta.id).indexOf(id);
    this.preguntas.splice(idBorrar, 1);
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  votar: function (pregunta, respuesta) {
    if (respuesta !== undefined) {
      const preguntaEncontrada = this.preguntas.find(Element => Element.textoPregunta === pregunta);
      var index = this.preguntas.indexOf(preguntaEncontrada);
      if (index > -1) {
        const respuestaEncontrada = this.preguntas[index].cantidadPorRespuesta.find(
          Element => Element.textoRespuesta === respuesta);
        respuestaEncontrada.cantidad++;
        this.votoSumado.notificar();
        this.guardar;
      }
    }
  },

  editarPregunta: function (id, editada) {
    this.preguntas.forEach(function (element) {
      if (element.id === id) {
        element.textoPregunta = editada;
      }
    });
    this.guardar();
    this.preguntaEditada.notificar();
  },

  borrarTodasLasPreguntas: function () {
    this.preguntas = [];
    this.guardar();
    this.todoBorrado.notificar();
  },
  guardar: function () {
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  },

  cargarPreguntas: function () {
    var preguntasGuardadas = JSON.parse(localStorage.getItem("preguntas"));
    if (preguntasGuardadas !== null) {
      this.preguntas = preguntasGuardadas;
    }
  }
};