const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://mdyasin7636:MdenW6dWb7wVm14F@cluster0.ts4gggc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const userDB = client.db("userDB");
    const userCollection = userDB.collection("userCollection")


    app.post("/users", async (req, res)=> {
      const user = req.body;
      const isUserExist = await userCollection.findOne({email: user?.email});
      if(isUserExist?._id) {
        return res.send({
          status: "Success",
          message: "Login Success"
        })
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    })



    console.log("Database Connected");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Route is working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
