var RuleClassifier = require('qtypes')

function questionInfo(message) {
  const qtypes = new RuleClassifier(() => {})
  let msgObj = {}

  return new Promise(resolve => {

    msgObj.cleanedMessage = message
    msgObj.isQuestion = qtypes.isQuestion(message)
    msgObj.qType = qtypes.classify(message)
    msgObj.qSubType = qtypes.questionType(message)

    resolve(msgObj)
  })
}

module.exports = questionInfo
