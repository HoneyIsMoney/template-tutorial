const deployTemplate = require('@aragon/templates-shared/scripts/deploy-template')

const TEMPLATE_NAME = 'company-template' // in your arapp.json
const CONTRACT_NAME = 'CompanyTemplate'

module.exports = (callback) => {
  deployTemplate(web3, artifacts, TEMPLATE_NAME, CONTRACT_NAME)
    .then(template => {
      console.log("Template address: ", template.address)
    })
    .catch(error => console.log(error))
    .finally(callback)
}
