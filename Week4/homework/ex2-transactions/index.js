import { seedDatabase } from './setup.js';
import { transferFunds } from './transfer.js';

(async () => {
  try {
    await seedDatabase();
    await transferFunds(101, 102, 1000, 'Transfer to account 102');
  } catch (error) {
    console.error(error);
  }
})();
