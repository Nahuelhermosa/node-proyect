// Mongo DB Atlas connection 
import { connect } from "mongoose";

// sice V 6 this is not neccesary 
const options = { 
    maxPoolSize: 100,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const db_uri = process.env.db_uri;
connect(db_uri);