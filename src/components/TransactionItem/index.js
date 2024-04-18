// Write your code here

import './index.css'

const TransactionItem = props => {
  const {transactionId, title, amount, type, onDelete} = props

  const firstLetter = type[0]
  const remainingLetters = type.slice(1).toLowerCase()
  const res = firstLetter + remainingLetters

  const onDeleteEachTransaction = () => {
    onDelete(transactionId)
  }

  return (
    <>
      <li className="transactionListItem">
        <p className="history title"> {title} </p>
        <p className="history sourceType amount">{`Rs ${amount}`}</p>
        <p className="history sourceType type"> {type} </p>
        <button
          className="deleteBtn"
          onClick={onDeleteEachTransaction}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            className="deleteLogo"
            alt="delete"
          />
        </button>
      </li>
    </>
  )
}

export default TransactionItem
