import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

export async function insertData() {
    try {
        await client.connect();
        const db = client.db("assignmentWeek4-Transaction");
        const collection = db.collection("accounts");

        await collection.deleteMany({});

        await collection.insertMany([
            {account_number: 130,
             balance: 2650,
             account_changes: [
                {change_number: 57,
                amount: 300,
                changed_date: "2025-01-13",
                remark: "gift"
                },
                {change_number: 58,
                amount: -200,
                changed_date: "2025-01-14",
                remark: ""
                }
            ]
            },
            {account_number: 131,
            balance: 5320,
            account_changes: [
                {change_number: 13,
                amount: 1000,
                changed_date: "2025-01-09",
                remark: "salary"
                },
                { change_number: 14,
                amount: -500,
                changed_date: "2025-01-11",
                remark: ""
                }
            ]}
        ])

        console.log("Data inserted successfully!");
    } catch (error) {   
        console.error("Error data insert:", error)
    } finally { 
       await client.close();
    }
};


