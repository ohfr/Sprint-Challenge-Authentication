const db = require("../database/dbConfig");

const find = () => {
    return db("users").select();
}

const findById = (id) => {
    return db("users").where({id}).first();
}

const findBy = (filter) => {
    return db("users").where(filter).first();
}

const add = async (user) => {
    const [id] = await db("users").insert(user);
    return findById(id);
}

const remove = (id) => {
    return db("users").where({id}).del();
}

const update = async (id, changes) => {
    const [newId] = await db("users").where({id}).update(changes);
    return findById(newId);
}

module.exports = {
    find,
    findBy,
    findById,
    add,
    remove,
    update
}