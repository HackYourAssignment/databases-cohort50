const setupAccounts = require('./setup');
const transfer = require('./transfer');

(async () => {
  console.log("Setting up accounts...");
  await setupAccounts();

  console.log("Transferring money...");
  await transfer(101, 102, 1000, "Payment for services");
})();
