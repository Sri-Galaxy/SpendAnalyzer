class CustomError extends Error {
    constructor(statusCode = 500, message = "Internal Server Error", error = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
        this.error = error;
        
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


export default CustomError;