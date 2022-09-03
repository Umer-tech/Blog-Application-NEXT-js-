const MONGO_URI = "mongodb+srv://admin123:admin123@nextjscrud.lipodpl.mongodb.net/?retryWrites=true&w=majority"
import mongoose from 'mongoose';

const connectMongo = async () => {

    const client  = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true
    });
    
    return client;
}
    
export default connectMongo;