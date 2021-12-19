import express from 'express'
import { createClient } from 'redis'; 

const app = express()
const port = 3001

const client = createClient();

(async () => {
    await client.connect();
})();



app.get('/jobs', async (req, res) => {
    
    const jobs = await client.get('jobs')
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // console.log(JSON.parse(items).length)
    return res.send(jobs)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})