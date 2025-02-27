import { unparse } from "papaparse";
import { saveAs } from "file-saver";

export const exportCSV = ({
  mode,
  summary,
  recentTransactions,
  transactions,
}) => {
  let csvData = [];

  if (mode === "dashboard") {
    csvData = [
      ["Recent Transactions"], // Title
      [],
      ["Total Income", `£${summary.income}`],
      ["Total Expenses", `£${summary.expense}`],
      [],
      ["Date", "Description", "Category", "Type", "Amount (£)"],
      ...recentTransactions.map((t) => [
        t.date,
        t.note,
        t.category,
        t.type,
        `£${t.amount}`,
      ]),
    ];
    // console.log(recentTransactions);
  } else if (mode === "transactions") {
    csvData = [
      ["Transaction History"],
      [],
      ["Date", "Description", "Category", "Type", "Amount (£)"],
      ...transactions.map((t) => [
        t.date,
        t.note,
        t.category,
        t.type,
        `£${t.amount}`,
      ]),
    ];
  } else if (mode === "reports") {
    csvData = [
      ["Full Financial Report"],
      [],
      ["Total Income", `£${summary.income}`],
      ["Total Expenses", `£${summary.expense}`],
      ["Balance", `£${summary.balance}`],
      [],
      ["Date", "Description", "Category", "Type", "Amount (£)"],
      ...transactions.map((t) => [
        t.date,
        t.note,
        t.category,
        t.type,
        `£${t.amount}`,
      ]),
    ];
  }

  const csv = unparse(csvData, { quotes: true });
  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  saveAs(blob, `export_${mode}.csv`);
};
