const sequelize = require("sequelize");
const { Tasks } = require("../db");
const { paginationTasks } = require("../pagination");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const getTasks = async ( req, res ) => {
    try {
        const allTasks = await Tasks.findAll();       
        
        if(!allTasks){
            return res.status(404).json({ "msg":"No hay tareas en la Base de Datos"})
        }

        const pagination = await paginationTasks(req)
        const tasksStatus = req.query.status;
        let tasksFilter;
        if( tasksStatus ){
            tasksFilter = await Tasks.findAll({ where: { Completed: tasksStatus } })
        };
        
        res.status(200).json({ "msg": "Registros obtenidos con éxito", allTasks, pagination, tasksFilter });    
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "Error al obtener las tarea"});    
    };
};

const createTasks = async ( req, res ) => {
    try {
        /*const token = req.headers["authorization"];
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);*/
        
        const { Title } = req.body
        await Tasks.create({
            Title,
            UserId: 0
        })
        res.status(201).json({ "msg": "Tarea Creada" });    
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "Error al crear la tarea"});    
    };
};

const updateTasks = async ( req, res ) => {
    try {
        const { id } = req.params;        
        const { Title, Completed } = req.body
        const taskToEdit = await Tasks.findByPk(id);
        if(!taskToEdit){
            return res.status(404).json({"msg":"La tarea no fue encontrada"})
        };
        await Tasks.update({
            Title,
            Completed,
            UserId: 0
        }, { where:{ Id:id }});
        
        res.status(200).json({ "msg": "Tarea editada con éxito"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "Error al editar la tarea"}); 
    };
};

const deleteTasks = async ( req, res ) => {
    try {
        const { id } = req.params;        
        const taskToEdit = await Tasks.findByPk(id);
        if(!taskToEdit){
            return res.status(404).json({"msg":"La tarea no fue encontrada"})
        };
        await Tasks.destroy({ where:{ Id:id }});
        
        res.status(500).json({ "msg": "Tarea borrada con éxito"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "Error al borrar la tarea"}); 
    };
};
module.exports = {getTasks, createTasks, updateTasks, deleteTasks};