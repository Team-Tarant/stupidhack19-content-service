import axios, { AxiosError } from 'axios'
import * as cheerio from 'cheerio'
import { translateString } from './translateService'

const fetchThread = async () => {
  const randN = Math.floor(Math.random() * 100000)
  try {
    const { data } = await axios.get(`https://keskustelu.suomi24.fi/t/${randN}`)
    return {
      text: data,
      randN
    }
  } catch (e) {
    console.log('suomi24Service::fetchThread', 'Refetching thread')
    return null
  }
}

export const getThread = async () => {
  let data = null
  while (data === null) {
    data = await fetchThread()
  }
  const dom = cheerio.load(data.text)
  const res = dom('.thread-text.post-text').first().text()
  return {
    threadId: data.randN,
    text: await translateString(res.trim().replace(/[\n\r]/g, ''))
  }
}
