var RuleClassifier = require('qtypes')

function questionInfo(message) {
  console.log('QUESTION INFO IS RUNNING', message)
  const qtypes = new RuleClassifier(() => {})
  let msgObj = {}

  return new Promise(resolve => {

    msgObj.cleaned = message
    msgObj.isQuestion = qtypes.isQuestion(message)
    msgObj.qType = qtypes.classify(message)
    msgObj.qSubType = qtypes.questionType(message)

    console.log(msgObj)

    resolve(msgObj)
  })
}

module.exports = questionInfo
