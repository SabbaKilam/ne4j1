//https://neo4j.com/developer/javascript/
//https://neo4j.com/cloud/aura/
const http = require('http');
let env = require('dotenv').config();
require('dotenv-expand')(env);

const port = 3000;
const host = `localhost`;

const uri = process.env.DB_CONN;
const user = process.env.DB_USER;
const password = process.env.DB_PSWD;

const neo4j = require('neo4j-driver')
const auth = neo4j.auth.basic(user, password)
const driver = neo4j.driver( uri, auth )

tryNeo(); 

http.createServer((req, res)=>{

})
.listen(port, host, () => {
    console.log(`server running at http://${host}:${port}`)
});

async function tryNeo(){
    const session = driver.session()
    const personName = 'Alice'
    
    try {
      const result = await session.run(
        'CREATE (a:Person {name: $name}) RETURN a',
        { name: personName }
      )
    
      const singleRecord = result.records[0]
      const node = singleRecord.get(0)
    
      console.log(node.properties.name)
    } finally {
      await session.close()
    }
    
    // on application exit:
    await driver.close()
}
