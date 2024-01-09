const mongoose = require ('mongoose');

const db = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.ATLAS_URI)
        console.log('DB connected successfully')
    } catch (error) {
        console.log('DB connection error pak!')
    }
}

module.exports = {db}