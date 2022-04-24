const express=require('express');
const cors=require('cors');
require('dotenv').config();
const app=express();
const port=process.env.PORT||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// set middleware

app.use(cors());
app.use(express.json());

// connect database JA9tEjlo6rgTARQI  geniusUser


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_PASSWORD}@cluster0.jg3zd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const serviceCollection=client.db('geniusCar').collection('service');

        app.get('/service',async(req,res)=>{
            const query={};
            const cursor=serviceCollection.find(query);
            const services=await cursor.toArray();
            res.send(services)
        });

        // get single user
        app.get('/service/:id',async(req,res)=>{
            const id=req.params._id;
            const query={_id:ObjectId(id)};
            const service=await serviceCollection.findOne(query);            
            res.send(service)
        });

        // Post means Add data database

        app.post('/service',async(req,res)=>{
            const newService=req.body;
            const result=await serviceCollection.insertOne(newService);
            res.send(result)

        },[]);

        // Delete Api

        app.delete('/service/:id',async(req,res)=>{
            const id=req.params._id;
            const query={_id:ObjectId(id)};
            const result=await serviceCollection.deleteOne(query);            
            res.send(result)
        });
       


    }
    finally{

    }

}
run().catch(console.dir);


// get 

app.get('/',(req,res)=>{
    res.send('server runing');
});

app.listen(port,()=>{
    console.log('Listening port');
})