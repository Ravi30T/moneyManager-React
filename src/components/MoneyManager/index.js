import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    title: '',
    enteredAmount: '',
    optionVal: transactionTypeOptions[0].optionId,
    balance: 0,
    income: 0,
    expenses: 0,
    history: [],
  }

  onEnterTitle = event => {
    this.setState({title: event.target.value})
  }

  onEnterAmount = event => {
    this.setState({enteredAmount: event.target.value})
  }

  onSelectOption = event => {
    const filterOptionName = transactionTypeOptions.filter(
      each => each.optionId === event.target.value,
    )
    this.setState({optionVal: filterOptionName[0].optionId})
  }

  onClickAdd = event => {
    event.preventDefault()

    const {
      balance,
      income,
      expenses,
      enteredAmount,
      optionVal,
      title,
      history,
    } = this.state

    if (optionVal === 'INCOME') {
      const newBalance = parseInt(balance) + parseInt(enteredAmount)

      const newIncome = parseInt(income) + parseInt(enteredAmount)

      this.setState({balance: newBalance, income: newIncome})
    }

    if (optionVal === 'EXPENSES') {
      const remainingAmount = parseInt(balance) - parseInt(enteredAmount)
      const newExpense = parseInt(expenses) + parseInt(enteredAmount)
      this.setState({balance: remainingAmount, expenses: newExpense})
    }

    const findDisplayText = transactionTypeOptions.filter(
      each => each.optionId === optionVal,
    )

    const displayText = findDisplayText[0].displayText

    const newTransaction = {
      id: uuidv4(),
      title,
      enteredAmount,
      optionVal,
      balance,
      income,
      expenses,
      displayText,
    }

    if (title !== '' && enteredAmount !== '') {
      this.setState(prevState => ({
        history: [...prevState.history, newTransaction],
        title: '',
        optionVal: 'INCOME',
        enteredAmount: '',
      }))
    }
  }

  onDeleteTransaction = id => {
    const {balance, history, income, expenses} = this.state

    const findTransaction = history.filter(each => each.id === id)

    const transactionAmount = findTransaction[0].enteredAmount

    if (findTransaction[0].optionVal === 'INCOME') {
      const updatedIncome = parseInt(income) - parseInt(transactionAmount)

      const updatedBalance = parseInt(balance) - parseInt(transactionAmount)

      this.setState({balance: updatedBalance, income: updatedIncome})
    }

    if (findTransaction[0].optionVal === 'EXPENSES') {
      const updatedExpenses = parseInt(expenses) - parseInt(transactionAmount)

      const updatedBalance = parseInt(balance) + parseInt(transactionAmount)

      this.setState({balance: updatedBalance, expenses: updatedExpenses})
    }

    const updatedHistory = history.filter(each => each.id !== id)

    this.setState({history: updatedHistory})
  }

  render() {
    const {
      balance,
      income,
      expenses,
      title,
      enteredAmount,
      optionVal,
      history,
    } = this.state

    return (
      <div className="bgContainer">
        <div className="profileContainer">
          <h1> Hi, Richard </h1>
          <p className="profileMessage">
            Welcome back to your <span className="spanEL"> Money Manager </span>
          </p>
        </div>

        <div className="accountDetailsContainer">
          <ul className="listContainer">
            <MoneyDetails
              balance={balance}
              income={income}
              expenses={expenses}
            />
          </ul>
        </div>

        <div className="transactionsContainer">
          <div className="transactionFormContainer">
            <form className="transactionForm">
              <h1> Add Transaction </h1>

              <label className="labelItem" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="textBox"
                placeholder="TITLE"
                onChange={this.onEnterTitle}
                value={title}
              />

              <label className="labelItem" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="textBox"
                placeholder="AMOUNT"
                onChange={this.onEnterAmount}
                value={enteredAmount}
              />

              <label className="labelItem" htmlFor="type">
                TYPE
              </label>
              <select
                id="type"
                className="selectBox"
                onChange={this.onSelectOption}
                value={optionVal}
              >
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>

              <button onClick={this.onClickAdd} type="sumbit" className="btn">
                Add
              </button>
            </form>
          </div>

          <div className="transactionsRecordContainer">
            <h1 className="historyHeading"> History </h1>
            <div className="transactionsTable">
              <div className="transactionsTableHeaders">
                <p className="headers"> Title </p>
                <p className="headers"> Amount </p>
                <p className="headers"> Type </p>
                <button className="headerBtn"></button>
              </div>
              <ul className="transactionsListContainer">
                {history.map(each => (
                  <TransactionItem
                    key={each.id}
                    transactionId={each.id}
                    title={each.title}
                    amount={each.enteredAmount}
                    type={each.displayText}
                    onDelete={this.onDeleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
