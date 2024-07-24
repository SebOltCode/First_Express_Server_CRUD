import express from 'express';
import pg from 'pg';
const { Client } = pg;
import { getResourceId, returnErrorWithMessage } from './utils.js';

const connectionString =  process.env.PG_URI;

export const createPost = async (req, res) => {
  try {
    const body = req.body;
    if (!body) return returnErrorWithMessage(res, 400, 'Body is required');
    console.log('Here we have access to the body: ', body);
    res.status = (201).json({ message: 'Post created' });
  } catch (error) {
    returnErrorWithMessage(res, 500, 'An error occurred');
  }
};

export const getPosts = async (req, res) => {
  console.log(connectionString);

  try {
    const client = new Client({ connectionString });
    await client.connect();
    const results = await client.query('SELECT * FROM posts');
    console.log(results.rows);
    res.status(200).json({ post: results.rows });
     } catch (error) {
    console.error('Error fetching posts: ', error);
    returnErrorWithMessage(res, 500, 'An error occurred fetching posts');
  }
};
export const updatePost = (req, res) => {
  const id = getResourceId(req.url);
  console.log('Here we have access to the ID: ', id);
  res.status(200).json ({ message: 'Post updated' }); 
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const client = new Client({ connectionString});
    await client.connect();
    const queryCheckExistence = 'SELECT EXISTS(SELECT 1 FROM posts WHERE id = $1)';
    const checkExistenceResult = await client.query(queryCheckExistence, [id]);
    if (!checkExistenceResult.rows[0].exists) {
      returnErrorWithMessage(res, 404, 'Post not found');
    } else {
      const deleteQuery = 'DELETE FROM posts WHERE id = $1';
      await client.query(deleteQuery, [id]);
      res.status(200).json({ message: 'Post deleted' });
    }
  } catch (error) {
    console.error('Error deleting post: ', error);
    returnErrorWithMessage(res, 500, 'An error occurred deleting the post');
  }
};
 export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = new Client({ connectionString });
    await client.connect();
    const query = 'SELECT * FROM posts WHERE id = $1'; 
    const values = [id];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); 
    } else {
      returnErrorWithMessage(res, 404, 'Post not found');
    }
  } catch (error) {
    console.error('Error fetching post by ID: ', error);
    returnErrorWithMessage(res, 500, 'An error occurred fetching the post');
  }
};