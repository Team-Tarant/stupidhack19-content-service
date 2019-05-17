import * as dotenv from 'dotenv'
dotenv.config()
import * as express from 'express'

import { translateString } from './services/translateService'
import { getLatestThreads } from './services/suomi24'
import { getThread } from './services/demiService'

const app = express()

app.get('/api/getContent', (req, res) => {
  getRandThread()
    .then(r => {
      res.json(r)
    })
})

function getRandThread(): Promise<{threadId: any, text: string}> {
  const rand = Math.random()
  return rand >= 0.5 ? getLatestThreads() : getThread()
}

app.listen(process.env.PORT, () => console.log('Listening on', process.env.PORT))
