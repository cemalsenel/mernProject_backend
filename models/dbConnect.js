const mongoose = require("mongoose");

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{  
            // useNewUrlParser: true,   ===> bunları mongodb cluster oluşturunca kullanmamız gerekiyor. Remote database için
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log("Successfully connected to DB");
    } catch (error) {
        console.log("Cannot connect to DB", error);
    }
}

module.exports = DB