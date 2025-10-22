const { StatusCodes } = require("http-status-code");
const CustomAPIError = require("./custom-api");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
