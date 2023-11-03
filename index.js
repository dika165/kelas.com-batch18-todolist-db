/*
    # Tugas Sesi 4
    1. Tambahkan masing-masing endpoint yang sudah di buat dengan validasi token
    2. untuk endpoint Create task ambil value untuk user_id, dari payload token.
*/
import * as UserService from './services/user.js';
import express from 'express';

const host = "localhost";
const port = 5000;
const app = express();
app.use(express.json());
app.get("/users",UserService.validateToken, UserService.getUser);
app.post("/users", UserService.validateToken, UserService.cerateUser);
app.put("/users/:id", UserService.updateUser);
// app.delete("users/:id", );
app.post("/login", UserService.login);

app.listen(port, host, () => {
    console.log(`server berjalan di http://${host}:${port}`);
});