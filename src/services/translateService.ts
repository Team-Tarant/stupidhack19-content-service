import axios, { AxiosError } from 'axios'
import { inspect } from 'util'

function createUrl(textToTranslate: string) {
  return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.YANDEX_API_KEY}&text=${encodeURIComponent(textToTranslate)}&lang=fi-en`
}

export const translateString = (string: string) =>
  axios
    .get(createUrl(string))
    .then(({data}) => data)
    .then(parseResult)
    .catch((e: AxiosError) => {
      console.error('translator error', e.response ? e.response.status : '',  inspect(e.response.data))
    })

function parseResult({text}: any) {
  return text[0]
}