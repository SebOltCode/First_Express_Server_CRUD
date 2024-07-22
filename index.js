import express from 'express';
const server = express();
const port = process.env.PORT || 3000;



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

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
