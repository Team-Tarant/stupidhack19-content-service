import axios from 'axios'
import * as cheerio from 'cheerio'
import { translateString } from './translateService'

export const getLatestThreads = async () => {
  const randN = Math.floor(Math.random() * 30)
  const { data } = await axios.get(`https://keskustelu.suomi24.fi/?page=${randN}`)
  const dom = cheerio.load(data)
  const res = dom('.thread-list-item-title').toArray().map(elem => elem.childNodes[0].nodeValue)
  const finalString = res.join(' ')

  return translateString(finalString)
}
