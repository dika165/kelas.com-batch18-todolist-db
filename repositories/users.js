import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT user_id, name, email, password, created_at FROM users";

    return dbPool.query(query)
}

const createData = (name, email, password) => {
    let createdAt = new Date();
    const query = "INSERT INTO users(name, email, password, created_at) VALUES (?,?,?,?)";
    const value = [name, email, password, createdAt];

    return dbPool.query(query, value);
}

const getDataById = (id) => {
    const query = "SELECT user_id, name, email, password, created_at FROM users where user_id=?";

    return dbPool.query(query,[id]);
}

const updateData = (id, name, email) => {
    let updatedAt = new Date();
    const query = "UPDATE users SET name = ?, email = ?, updated_at = ? WHERE user_id=?";
    const values = [name, email, updatedAt, id];

    return dbPool.query(query,values);
}

const getDataByEmail = (email) => {
    const query = "SELECT user_id, name, email, password, created_at FROM users where email=?";

    return dbPool.query(query,[email]);
}

export { createData, getData, getDataById, updateData, getDataByEmail }
