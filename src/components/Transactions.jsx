function Transactions({ transactions }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="transaction-list">
      <table className="full-width">
        <thead>
          <tr>
            <th>Description</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const formattedDate = formatDate(transaction.date);
            return (
              <tr key={transaction.id}>
                <td>{transaction.note}</td>
                <td>
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </td>
                <td>{transaction.category}</td>
                <td>£{transaction.amount}</td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
