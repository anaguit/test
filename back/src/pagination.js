const { Tasks } = require("./db");

const paginationTasks = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
    try {
      const { count, rows } = await Tasks.findAndCountAll({
        limit:pageSize,
        offset:(page - 1) * pageSize
      });  
        return {
          info:{
            totalTaskts: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page
          },
          tasks: rows
        };
    } catch (error) {
        return error;
      };    
};

module.exports = {paginationTasks};