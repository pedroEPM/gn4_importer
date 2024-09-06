import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://megamedia:umLuPqBGd998G4Y0@clustermegateca.ymjsd.mongodb.net/tark', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

export default connectDB;
