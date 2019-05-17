import axios from 'axios'
import { text } from 'body-parser';

function createUrl(textToTranslate: string) {
  return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.YANDEX_API_KEY}&text=${textToTranslate}&lang=fi-en`
}

export const translateString = (string: string) =>
  axios
    .get(createUrl(string))
    .then(({data}) => data)
    .then(parseResult)

function parseResult({text}: any) {
  return text[0]
}