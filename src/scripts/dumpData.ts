import { getLatestThreads } from '../services/suomi24Service'
import { writeFileSync } from 'fs'

const results = []

setInterval(() => request(), 2000)

const final = results.filter(text => text !== null).map(res => res.text).join('\n <|endoftext|> \n')
console.log(final)
writeFileSync('./dump', final)

async function request() {
  results.push(await getLatestThreads())
}