const expenseSchema = require("../models/expenseModel")

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const incomes = expenseSchema({
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

exports.getExpense = async (req, res) => {
    try {
        const incomes = await expenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Error pak!'})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    expenseSchema.findByIdAndDelete(id)
    .then((incomes) => {
        res.status(200).json({message: 'Deleted pak!'})
    })
    .catch((err) => {
        res.status(500).json({message: 'Error pak!'})
    })
}