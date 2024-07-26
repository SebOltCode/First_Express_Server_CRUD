import express from 'express';
import pg from 'pg';
const { Client } = pg;
import { returnErrorWithMessage } from './utils.js';

const connectionString = process.env.PG_URI;
const userId = "1";


export const createPost = async (req, res) => {
  console.log(req.file, req.body);
  try {
    const body = req.body;
    if (!body) return returnErrorWithMessage(res, 400, 'Body is required');
    if (!req.file.path) return returnErrorWithMessage(res, 400, 'Cover is required');
    if (!bodyValidation(body, res)) return;

    const { title, content, author } = req.body;
    const coverPath = req.file.path;

    const client = new Client({
      connectionString: process.env.PG_URI,
    });
    await client.connect();
    const result = await client.query(
      ' INSERT INTO posts (user_id, title, author, content, cover) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [userId, title, author, content, coverPath]
    );
    await client.end();

    res.statusCode = 201;
    res.end(
      JSON.stringify({ message: 'Post created', result: result.rows[0] })
    );

  } catch (error) {
    console.error('Error in createPost:', error);
    returnErrorWithMessage(res, 500, error.message);
  }
};

export const getPosts = async (req, res) => {
  try {
    const client = new Client({ connectionString });
    await client.connect();
    const results = await client.query('SELECT * FROM posts');
    res.status(200).json(results.rows);
  } catch (error) {
    console.error('Error fetching posts: ', error);
    returnErrorWithMessage(res, 500, 'An error occurred fetching posts');
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const client = new Client({ connectionString });
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

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const client = new Client({ connectionString });
    await client.connect();

    const checkExistenceQuery = 'SELECT EXISTS(SELECT 1 FROM posts WHERE id = $1)';

    const existenceResult = await client.query(checkExistenceQuery, [id]);

    if (!existenceResult.rows[0].exists) {
      return returnErrorWithMessage(res, 404, 'Post not found');
    }
    const updateQuery = 'UPDATE posts SET title = $2, author = $3, content = $4, cover = $5 WHERE id = $1 RETURNING *';
    const updateValues = [id, body.title, body.author, body.content, body.cover];
    const updateResult = await client.query(updateQuery, updateValues);

    await client.end();

    res.status(200).json({ message: 'Post updated', post: updateResult.rows[0] });

  } catch (error) {
    console.error('Error updating post: ', error);
    returnErrorWithMessage(res, 500, 'An error occurred updating the post');
  }
};

function bodyValidation(body, res) {
  if (!body.title) return returnErrorWithMessage(res, 400, 'Title is required');
  if (!body.content) return returnErrorWithMessage(res, 400, 'Content is required');
  if (!body.author) return returnErrorWithMessage(res, 400, 'Author is required');
  return true;
}; 