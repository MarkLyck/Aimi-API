
const name = (msgObj) => {
  return new Promise(resolve => {
    const myIndex = msgObj.cleanedMessage.toLowerCase().split(' ').indexOf('my')
    if (myIndex > -1 && msgObj.cleanedMessage.toLowerCase().split(' ')[myIndex + 1] === 'name') {
      console.log('Should save name')
    }
    resolve(msgObj)
  })
}

module.exports = name
