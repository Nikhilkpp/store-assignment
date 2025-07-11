import mysql from 'mysql2/promise';

const db=mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Nikhil@@00',  
  database: 'project'    
});

export default db;