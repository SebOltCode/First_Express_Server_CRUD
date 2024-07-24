
export const returnErrorWithMessage = (res, code, message) => {
  res.statusCode = code || 500;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({ message: message || 'Internal Server Error' }));
};




