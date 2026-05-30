import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//Usuarios
export const usuarios = [{user: "Ismael_Tobias", password: "Ismael2026"}, {user: "Miranda_Aguayo", password:
    "Miranda2026"}, {user: "Fatima_Moncada", password: "Fatima2026"}, {user: "Liliana_Alonso", password: "Proyecto2026"}]
//Funcion para hacer el login
async function login(req,res){
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password){
        return res.status(400).send({status:"Error",message:"Los campos esta vacios"});
    }
    const usuarioARevisar = usuarios.find(u => u.user === user);
    if(!usuarioARevisar){
        return res.status(400).send({status:"Error",message:"Error en sus credenciales"})
    }
    const loginCorrecto = (password === usuarioARevisar.password);
    if(!loginCorrecto){
        return res.status(400).send({status:"Error",message:"Error en sus credenciales"})
    }
    //Creacion de un token
    const token = jsonwebtoken.sign(
        {user:usuarioARevisar.user},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRATION});
    //Creacion de una cookie
    const cookieOption = {
        expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
        path: "/"
    }
    //Enviamos la cookie al cliente
    res.cookie("jwt",token,cookieOption);
    res.send({status:"ok",message:"Usuario loggeado",redirect:"/bienvenido"});
}
//Exportamos las funciones
export const methods = {login}