const bcrypt = require("bcryptjs");

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('users').insert([
    {username: "dan", password: bcrypt.hashSync("password", 12)},
    {username: "george", password: bcrypt.hashSync("password", 12)},
  ]);

};
