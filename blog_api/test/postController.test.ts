import chai from 'chai';
import chaiHttp from 'chai-http';
import { Collection } from 'mongodb';
import app from '../src/app'
import { IPost, createCollection,closeDB } from '../src/models/Post';
const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog Post Controller', function () {
  let postCollection: Collection<IPost>|null;

  before(async function () {
    postCollection = await createCollection();
  });
  describe('GET /api/posts', function () {
    it('should get all blog posts', function (done) {
      chai
        .request(app)
        .get('/api/posts')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/posts', function () {
    it('should create a new blog post', function (done) {
      const newPost = {
        title: 'Test Post',
        content: 'This is a test post.',
        category_id: '1',
      };
      chai
        .request(app)
        .post('/api/posts')
        .send(newPost)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Post created successfully');
          done();
        });
    });

  });

describe('GET /api/posts/:id', function () {
  it('should get a specific blog post by ID', function (done) {
    // Assuming you have a valid post ID, replace 'VALID_POST_ID' with an actual ID
    const postId = 'VALID_POST_ID';

    chai
      .request(app)
      .get(`/api/posts/${postId}`)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return a 404 status if the post is not found', function (done) {
    // Assuming you have an invalid post ID, replace 'INVALID_POST_ID' with an actual ID that does not exist
    const postId = 'INVALID_POST_ID';

    chai
      .request(app)
      .get(`/api/posts/${postId}`)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return a 400 status for an invalid post ID', function (done) {
    // Replace 'INVALID_ID_FORMAT' with an invalid ID format (e.g., '123')
    const postId = 'INVALID_ID_FORMAT';

    chai
      .request(app)
      .get(`/api/posts/${postId}`)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('PUT /api/posts/:id', function () {
  it('should update an existing blog post', function (done) {
    // Assuming you have a valid post ID and a request body with updates
    const postId = 'VALID_POST_ID';
    const updatedPost = {
      title: 'Updated Test Post',
      content: 'This is an updated test post.',
    };

    chai
      .request(app)
      .put(`/api/posts/${postId}`)
      .send(updatedPost)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Post updated successfully');
        done();
      });
  });

  it('should return a 404 status if the post to update is not found', function (done) {
    // Assuming you have an invalid post ID for an update, replace 'INVALID_POST_ID' with an actual ID that does not exist
    const postId = 'INVALID_POST_ID';
    const updatedPost = {
      title: 'Updated Test Post',
      content: 'This is an updated test post.',
    };

    chai
      .request(app)
      .put(`/api/posts/${postId}`)
      .send(updatedPost)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return a 400 status for an invalid post ID', function (done) {
    // Replace 'INVALID_ID_FORMAT' with an invalid ID format (e.g., '123')
    const postId = 'INVALID_ID_FORMAT';
    const updatedPost = {
      title: 'Updated Test Post',
      content: 'This is an updated test post.',
    };

    chai
      .request(app)
      .put(`/api/posts/${postId}`)
      .send(updatedPost)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('DELETE /api/posts/:id', function () {
  it('should delete an existing blog post', function (done) {
    // Assuming you have a valid post ID for deletion, replace 'VALID_POST_ID' with an actual ID
    const postId = 'VALID_POST_ID';

    chai
      .request(app)
      .delete(`/api/posts/${postId}`)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Post deleted successfully');
        done();
      });
  });

  it('should return a 404 status if the post to delete is not found', function (done) {
    // Assuming you have an invalid post ID for deletion, replace 'INVALID_POST_ID' with an actual ID that does not exist
    const postId = 'INVALID_POST_ID';

    chai
      .request(app)
      .delete(`/api/posts/${postId}`)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return a 400 status for an invalid post ID', function (done) {
    // Replace 'INVALID_ID_FORMAT' with an invalid ID format (e.g., '123')
    const postId = 'INVALID_ID_FORMAT';

    chai
      .request(app)
      .delete(`/api/posts/${postId}`)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('GET /api/posts/latest', function () {
  it('should retrieve the latest blog posts in each unique category', function (done) {
    chai
      .request(app)
      .get('/api/posts/latest')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
afterEach(async () => {
  
  await closeDB();
});



});


