import { getData, createData, getDataById } from "../repositories/users.js";

export const cerateUser = async (name, email, password) => {
    const [result] = await createData(name, email, "pass1234")

    if(result.insertId > 0) {
        console.log(`data user berhasil di buat dengan id: ${result.insertId}`)
    } else {
        console.log("daga gagal di buat");
    }
}

export const getUser = async () => {
    const [result] = await getData();

    if(result.length > 0) {
        console.log(result);
    } else {
        console.log(`data user tidak ada`)
    }
}

export const getUserById = async(id) => {
    const [result] = await getDataById(id);

    if(result.length > 0) {
        console.log(result[0]);
    } else {
        console.log(`data user tidak di temukan`)
    }
    
}