
export const returnErrorWithMessage = (res, statusCode, message) => {
  res.statusCode = statusCode || 300;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({ message: message || 'Internal Server Error' }));
};



// export const returnErrorWithMessage = (res, code, message) => {
//   if (res.headersSent) {
//     console.error('Attempted to send headers after they were already sent.');
//     return;
//   }
//   res.statusCode = code || 500;
//   res.setHeader('Content-Type', 'application/json');
//   return res.end(JSON.stringify({ message: message || 'Internal Server Error' }));
// };




