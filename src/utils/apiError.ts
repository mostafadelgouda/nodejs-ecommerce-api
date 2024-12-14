// @desc The class is responsible for operation errors (predicted errors)
class ApiError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

export default ApiError;
