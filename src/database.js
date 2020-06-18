const mysql = require('mysql');

const { database } = require('./keys.js');
const {promisify} = require('util');

const { connect } = require('./routes/index.js');

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        else if(err.code==='ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        else if(err.code==='ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    else if(connection) connection.release;
    console.log('DB is connected');
    return;
});
//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;