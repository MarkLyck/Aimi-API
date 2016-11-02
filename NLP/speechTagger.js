var pos = require('pos')

function speechtagger(msgObj) {
  return new Promise(resolve => {
    const words = new pos.Lexer().lex(msgObj.cleanedMessage)
    var tagger = new pos.Tagger()
    var wordTagger = tagger.tag(words)
    const taggedWords = wordTagger.map(word => {
      return [word[0], word[1]]
    })
    msgObj.taggedWords = taggedWords
    resolve(msgObj)
  })
}

module.exports = speechtagger
