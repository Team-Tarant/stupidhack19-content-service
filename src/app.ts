import * as dotenv from 'dotenv'
dotenv.config()
import * as express from 'express'
import { AxiosError } from 'axios'

import { getThread as getSuomi24Thread } from './services/suomi24Service'
import { getThread as getDemiThread } from './services/demiService'

const app = express()

app.get('/api/getContent', (_, res) => {
  getRandThread()
    .then(r => {
      res.json(r)
    }).catch((e: AxiosError) => e.response
      ? res.status(e.response.status).json({ error: e.response.statusText })
      : res.status(500).json({ error: 'Internal server error' })
    )
})

function getRandThread(): Promise<{threadId: any, text: string}> {
  const rand = Math.random()
  return rand >= 0.5 ? getSuomi24Thread() : getDemiThread()
}

app.listen(process.env.PORT, () => console.log('Listening on', process.env.PORT))
