import express from 'express';
// import http from 'http';
const server = express();
const port = 3000;



import { createPost, deletePost, getPosts, getPostById, updatePost } from './crudOperations.js';
import { returnErrorWithMessage } from './utils.js';

server.use(express.json());

const resource = '/posts';

server.get(resource, getPosts);
server.get(`${resource}/:id`, getPostById);
server.post(resource, createPost);
server.put(`${resource}/:id`, updatePost);
server.delete(`${resource}/:id`, deletePost);

server.use((req, res) => {
  return returnErrorWithMessage(res, 404, 'Resource Not Found');
});


// const requestHandler = async (req, res) => {
//   const { method, url } = req;
//   if (url === resource) {
//     if (method === 'GET') return await getPosts(req, res);
//     if (method === 'POST') return await createPost(req, res);
//     else return returnErrorWithMessage(res, 405, 'Method Not Allowed');
//   } else if (regex(resource).test(url)) {
//     if (method === 'GET') return await getPostById(req, res);
//     if (method === 'PUT') return await updatePost(req, res);
//     if (method === 'DELETE') return await deletePost(req, res);
//     else return returnErrorWithMessage(res, 405, 'Method Not Allowed');
//   } else {
//     return returnErrorWithMessage(res, 404, 'Resource Not Found');
//   }
// };



server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
