import mysql from "mysql";

const con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  port: "3306",
  user: "sql12745094",
  password: "emcBKgzcve",
  database: "sql12745094",
});

con.connect((err) => {
  if (err) {
    console.log("Connection Error", err);
  } else {
    console.log("connected");
  }
});

export default con;
