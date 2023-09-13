"use strict";

var _express = _interopRequireDefault(require("express"));
var _FormRoutes = _interopRequireDefault(require("./routes/FormRoutes.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use('/form', _FormRoutes["default"]);
app.listen(8000, function () {
  console.log('Servidor iniciado en el puerto 8000');
});