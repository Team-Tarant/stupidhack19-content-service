import * as dotenv from 'dotenv'
dotenv.config()
import * as express from 'express'

import { translateString } from './services/translateService'
import { getLatestThreads } from './services/suomi24'

const app = express()

app.get('/api/getContent', (req, res) => {
  getLatestThreads()
    .then(content => {
      res.json({result: content})
    })
})

app.listen(process.env.PORT, () => console.log('Listening on', process.env.PORT))
