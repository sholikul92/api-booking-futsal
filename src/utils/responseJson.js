export const response = (status, statusCode, message, data) => {
  return {
    'meta' : {
      'status' : status,
      'statusCode' : statusCode,
      'message' : message
    },
    'data' : data
  };
};