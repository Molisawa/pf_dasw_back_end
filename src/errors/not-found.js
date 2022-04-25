const HttpError = require('./http-error');

class NotFoundError extends HttpError {
    constructor(message) {
        super(404, message);
        this.name = 'NotFoundError';
    }
}

module.exports = NotFoundError;