const deployTemplate = require('@aragon/templates-shared/scripts/deploy-template')

const TEMPLATE_NAME = ''
const CONTRACT_NAME = ''

module.exports = (callback) => {
  deployTemplate(web3, artifacts, TEMPLATE_NAME, CONTRACT_NAME)
    .then(template => {
      console.log("Template address: ", template.address)
    })
    .catch(error => console.log(error))
    .finally(callback)
}
