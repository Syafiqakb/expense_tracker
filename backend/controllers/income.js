const incomeSchema = require("../models/incomeModel")

exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const incomes = incomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'Isi dulu pak!'})
        }
        if(amount <= 0 || amount === 'number'){
            return res.status(400).json({message: 'Amount nya pak!'})
        }
        await incomes.save()
        res.status(200).json({message: 'Berhasil ditambah pak!'})
    } catch (error) {
        res.status(500).json({message: 'Error pak!'})
    }

    console.log(incomes)
}

exports.getIncome = async (req, res) => {
    try {
        const incomes = await incomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Error pak!'})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    incomeSchema.findByIdAndDelete(id)
    .then((incomes) => {
        res.status(200).json({message: 'Deleted pak!'})
    })
    .catch((err) => {
        res.status(500).json({message: 'Error pak!'})
    })
}