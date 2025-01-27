import { insertData } from './setup.js';
import { transfer } from './transfer.js';

async function main() {
    try {
        await insertData();

        await transfer();
    } catch (error) {
        console.error("Error in main execution:", error);
    }
}

main();