const ethers = require("ethers");
const homedir = require("os").homedir;
const path = require("path");
const abi = require("../build/contracts/CompanyTemplate.json").abi;
const { rpc, keys } = require(path.join(homedir(), `.aragon/rinkeby_key.json`));

const CompanyTemplateAddress = "0x293a486a7b1915d300770a6041609c6d3fdc805b";

async function main() {
  // 0. setup provider and signer
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const signer = new ethers.Wallet(keys[0], provider);

  // 1. init args: get these from the test file https://github.com/aragon/dao-templates/blob/master/templates/company/test/company.js
  const tokenName = "TestToken"; // the name for the token used by share holders in the organization
  const tokenSymbol = "TST"; // the symbol for the token used by share holders in the organization
  const id = `testing-org${Math.random().toString().substring(2)}`; // the name for org, will assign `[id].aragonid.eth`
  const holders = [
    "0x6a1cf24C645DB2e37141Fa12E70Cb67e56b336f3",
    "0x75B98710D5995AB9992F02492B7568b43133161D",
  ]; // Array of token holder addresses
  const stakes = holders.map(() => 1e18.toString()); // Array of token stakes for holders (token has 18 decimals, multiply token amount `* 10^18`)
  const votingSettings = [50e16.toString(), 5e16.toString(), 86400]; // Array of [supportRequired, minAcceptanceQuorum, voteDuration] to set up the voting app of the organization
  const financePeriod = 0; // Initial duration for accounting periods, it can be set to zero in order to use the default of 30 days.
  const useAgentAsVault = true; //Boolean to tell whether to use an Agent app as a more advanced form of Vault app

  const Template = new ethers.Contract(CompanyTemplateAddress, abi, signer);
  await Template.newTokenAndInstance(
    tokenName,
    tokenSymbol,
    id,
    holders,
    stakes,
    votingSettings,
    financePeriod,
    useAgentAsVault
  );

  console.log("done");
}
main()
  .then(() => {
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit();
  });
