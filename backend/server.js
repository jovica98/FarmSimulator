import express from 'express'
import bodyParser from 'body-parser'

import test from './api/handlers/test.js'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/test',authenticateToken,test.postHandler)
app.get('/test/:id',authenticateToken,test.getHandler)
app.delete('/test/:id',authenticateToken,test.deleteHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`listening on:${PORT}`);
});



function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token,config.secret , (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })
	}


