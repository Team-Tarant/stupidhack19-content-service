import axios from 'axios'
import * as cheerio from 'cheerio'
import { translateString } from './translateService'

export const getThread = async () => {
  const randN = Math.floor(Math.random() * 100000)

  try {
    const { data } = await axios.get(`https://keskustelu.suomi24.fi/t/${randN}`)
    const dom = cheerio.load(data)
    const res = dom('.thread-text.post-text').first().text()
    return {
      threadId: randN,
      text: await translateString(res.trim())
    }
  } catch (e) {
    console.log('error')
    return null
  }
}
