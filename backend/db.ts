import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",          // your MySQL password
  database: "mandarin_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
