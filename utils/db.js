import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host:"localhost",
    user: "root", 
    password: "mauFJcuf5dhRMQrjj",
    database: "batch_18",
    port: 3307
});
export default dbPool;