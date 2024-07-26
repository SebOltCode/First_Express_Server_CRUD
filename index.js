import express from 'express';
import cors from 'cors'
import { returnErrorWithMessage } from './utils.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



const storage = multer.diskStorage({
  destination: (req, cover, cb) => {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: (req, cover, cb) => {
    cb(null, `${Date.now()}-${cover.originalname}`);
  },
});


const upload = multer({ storage });


app.use(express.static(path.join(__dirname, 'public')));


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
app.post(resource, upload.single('cover'), createPost);
app.put(`${resource}/:id`, updatePost);
app.delete(`${resource}/:id`, deletePost);
app.use((req, res) => {
  return returnErrorWithMessage(res, 404, 'Resource Not Found');
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
