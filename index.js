import express from 'express';
import cors from 'cors'


const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 3000;

import {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  updatePost
} from './crudOperations.js';

const resource = '/posts';

app.get(resource, getPosts);
app.get(`${resource}/:id`, getPostById);
app.post(resource, createPost);
app.put(`${resource}/:id`, updatePost);
app.delete(`${resource}/:id`, deletePost);
app.use((req, res) => {
  return returnErrorWithMessage(res, 404, 'Resource Not Found');
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
