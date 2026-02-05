import pgp from "pg-promise";
const connection = pgp();

const db = connection(
  "postgres://dinavelb:binongofeb0206@localhost:5432/mangodb", //always set to localhost when testing locally
);

//test connection
db.any('SELECT * FROM "Users"')
  .then((data) => {
    console.log("DATA:", data);
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });

export default db;
