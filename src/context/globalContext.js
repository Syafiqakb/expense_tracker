import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:3000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (incomes) => {
        const response = await axios.post(`${BASE_URL}add-income`, incomes)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncome()
    }

    const getIncome = async () => {
        const response = await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncome()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((incomes) =>{
            totalIncome = totalIncome + incomes.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (incomes) => {
        const response = await axios.post(`${BASE_URL}add-expense`, incomes)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpense()
    }

    const getExpense = async () => {
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpense()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((incomes) =>{
            totalIncome = totalIncome + incomes.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncome,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpense,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}