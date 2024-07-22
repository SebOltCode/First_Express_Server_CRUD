/**
 * Returns an error response with a given message.
 * @param {Object} res - The response object.
 * @param {number} code - The HTTP status code.
 * @param {string} message - The error message.
 * @returns {void}
 * @example
 */
 
export const returnErrorWithMessage = (res, code, message) => {
  res.statusCode = code || 500;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({ message: message || 'Internal Server Error' }));
};
/**
 * Processes the body from an HTTP request.
 * @param {http.IncomingMessage} req - The request object.
 * @returns {Promise<string>} - The body of the request as a string.
 */
 
  export const processBodyFromRequest = (req) =>
    new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => (body += chunk.toString()));
      req.on('end', () => resolve(body));
      req.on('error', reject);
    });


 /**
 * Creates a RegExp for matching resource URLs.
 * @param {string} resource - The resource name.
 * @returns {RegExp} - The RegExp for matching resource URLs.
 * @example regex('/posts') => /^\/posts\/[a-zA-Z0-9]+$/
 */
 
export const regex = resource => new RegExp(`^${resource}\/[a-zA-Z0-9]+$`);

/**
 * Extracts the resource ID from a URL.
 * @param {string} url - The URL from which to extract the ID.
 * @returns {string} - The extracted resource ID.
 * @example getResourceId('/posts/123') => '123'
 */
export const getResourceId = url => url.split('/')[2];
