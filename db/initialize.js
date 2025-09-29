const { pool } = require("./pool");
const db = require("./queries");
const { genPassword } = require("../utils/passwordUtils");
const delay = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));
const lorem = require("../utils/textGenerator");

const usersList = [
  {
    username: "Mohamed",
    password: "somepassword",
    email: "Mohamed@somedomain.com",
  },
  {
    username: "Pikachu",
    password: "somepassword",
    email: "Pikachu@somedomain.com",
  },
  {
    username: "Odin",
    password: "somepassword",
    email: "Odin@somedomain.com",
  },
  {
    username: "Thor",
    password: "somepassword",
    email: "Thor@somedomain.com",
  },
  {
    username: "Medusa",
    password: "somepassword",
    email: "Medusa@somedomain.com",
  },
];

function randomAuthorId(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function createUsers() {
  usersList.forEach((user) => {
    const { salt, hash } = genPassword(user.password);
    console.log(salt, hash);
    db.addNewUser(user.username, hash, salt);
  });
}

function createPosts() {
  for (i = 0; i < 15; i++) {
    const authorId = randomAuthorId(6, 10);
    const paragraphs = randomAuthorId(1, 6);
    const post_title = lorem.lorem.generateSentences(1);
    const post_content = lorem.lorem.generateParagraphs(paragraphs);
    db.createNewPost(authorId, post_title, post_content);
  }
}

async function allPosts() {
  const allPosts = await db.getAllPosts();
  console.log(allPosts);
}

// createPosts();
// allPosts();
