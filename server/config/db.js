import mongoose from 'mongoose';

export const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB✅');
        if (process.env.NODE_ENV === 'development') {
            mongoose.set('debug', true); // Enable Mongoose debug mode in development
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}