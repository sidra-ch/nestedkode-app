const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log(users.map(u => ({ email: u.email, name: u.name, role: u.role })));
    process.exit(0);
});
