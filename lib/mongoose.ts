import mongoose from 'mongoose';

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI is not defined');
    return;
  }

  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }

  try {
    // Use the following options for better connection handling
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout in milliseconds to wait for server selection
    };

    await mongoose.connect(process.env.MONGODB_URI, options);

    isConnected = true;

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:');
    // Set isConnected to false if an error occurs during connection
    isConnected = false;
  }
};

// Export the isConnected variable for external use if needed
export const isDBConnected = () => isConnected;
