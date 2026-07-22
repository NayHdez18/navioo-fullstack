const { json } = require ('express')
const constants = require('../constants')


const errorHandler = (err, req, res, next) => {
  console.error('Error detectado:', err);

  const statusCode =res.statusCode ? res.statusCode: 500;
  console.log(statusCode);

  let errorTitle ="";
  switch(statusCode){
    case constants.constants.VALIDATION_ERROR:
            errorTitle = "Validation Field";
            break;
        case constants.constants.NOT_FOUND:
            errorTitle = "Not found";
            break;
        case constants.constants.FORBIDDEN:
            errorTitle = "Forbidden elements"
            break;
        case constants.constants.SERVER_ERROR:
            errorTitle = "Server Error"
            break;
        default:
            errorTitle = "Unknowkn Error"
  }

  res.status(statusCode).json({
    title: errorTitle,
    message: err.message,
    stack: err.stack
  });
};

module.exports = errorHandler; 