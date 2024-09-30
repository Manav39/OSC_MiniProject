import mysql from "mysql";

const con = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    port: "3306",
    user: "sql12706539",
    password: "Ncwdrc1PkH",
    database: "sql12706539"
})

con.connect((err) => {
    if (err) {
        console.log("Connection Error", err)
    } else {
        console.log("connected")
    }
})

export default con;
