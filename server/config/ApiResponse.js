class ApiResponse{
    constructor(statusCode, data = null, message = "Success"){
      this.statusCode = statusCode;
      this.success = statusCode < 400; // auto detect success/failure
      this.data = data;
      this.message = message;
    }
}

export default ApiResponse;