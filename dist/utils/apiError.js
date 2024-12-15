"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @desc The class is responsible for operation errors (predicted errors)
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
    }
}
exports.default = ApiError;
