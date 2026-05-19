import express from 'express';
import cookieParser from 'cookie-parser';
//Fix __direname
import path from 'path';
import { fileURLToPath } from 'url';
const __direname = path.dirname(fileURLToPath(import.meta.url));
//Importacion de metodos
import { methods as authentication} from './controllers/authentication.controller.js';
import { methods as authorization} from './middleware/authorization.js';
//Server
const app = express();
app.set("port", 5000);
app.listen(app.get("port"));
console.log("Servidor corriendo en el puerto", app.get("port"))

//Configuración
app.use(express.static(__direname + "/public"));
app.use(express.json());
app.use(cookieParser());

//Rutas
app.get("/",authorization.soloPublico,(req,res) => res.sendFile(__direname + "/Pages/login.html"));
app.get("/bienvenido",authorization.soloAdmin,(req,res) => res.sendFile(__direname + "/Pages/P0.html"));
app.get("/index1.html",authorization.soloAdmin,(req,res) => res.sendFile(__direname + "/Pages/index1.html"));
app.get("/index2.html",authorization.soloAdmin,(req,res) => res.sendFile(__direname + "/Pages/index2.html"));
app.get("/index3.html",authorization.soloAdmin,(req,res) => res.sendFile(__direname + "/Pages/index3.html"));
app.get("/index4.html",authorization.soloAdmin,(req,res) => res.sendFile(__direname + "/Pages/index4.html"));
app.get("/index5.html",authorization.soloAdmin,(req,res) => res.sendFile(__direname + "/Pages/index5.html"));
app.get("/index6.html",authorization.soloAdmin,(req,res) => res.sendFile(__direname + "/Pages/index6.html"));
app.get("/index7.html",authorization.soloAdmin,(req,res) => res.sendFile(__direname + "/Pages/index7.html"));
app.post("/api/login",authentication.login);
app.get("/logout", (req,res)=>{res.clearCookie("jwt");return res.redirect("/");});