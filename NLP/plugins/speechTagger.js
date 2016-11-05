var pos = require('pos')

function speechtagger(msgObj) {
  return new Promise(resolve => {
    const words = new pos.Lexer().lex(msgObj.cleanedMessage)
    var tagger = new pos.Tagger()
    var wordTagger = tagger.tag(words)

    var nouns = []
    var verbs = []
    var pronouns = []
    var adjectives = []
    var adverbs = []

    var names = []
    var numbers = []

    const taggedWords = wordTagger.map(word => {

      switch(word[1]) {
        case 'CD': // Numbers
          numbers.push(Number(word[0]))
          break
        case 'NN': // Nouns
        case 'NNS':
          nouns.push(word[0])
          break
        case 'NNP': // Names
        case 'NNPS':
          names.push(word[0])
          break
        case 'VB': // Verbs
        case 'VBD':
        case 'VBG':
        case 'VBN':
        case 'VBP':
        case 'VBZ':
          verbs.push(word[0])
          break
        case 'PP$':
        case 'PRP':
          pronouns.push(word[0])
          break
        case 'JJ': // Adjectives
        case 'JJR':
        case 'JJS':
          adjectives.push(word[0])
          break
        case 'RB': // Adverbs
        case 'RBR':
        case 'RBS':
          adverbs.push(word[0])
          break
      }

      return [word[0], word[1]]
    })
    msgObj.taggedWords = taggedWords

    msgObj.nouns = nouns
    msgObj.verbs = verbs
    msgObj.pronouns = pronouns
    msgObj.adjectives = adjectives
    msgObj.adverbs = adverbs
    msgObj.units = []

    msgObj.names = names
    msgObj.numbers = numbers

    resolve(msgObj)
  })
}

module.exports = speechtagger
