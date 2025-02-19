import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportPDF = ({
  mode,
  summary,
  reportTransaction,
  allTransactions,
}) => {
  const doc = new jsPDF();
  const marginLeft = 14;
  let yPos = 10;

  doc.setFontSize(16);
  doc.text("Summary Report", marginLeft, yPos);
  yPos += 10;
  doc.setFontSize(12);
  doc.text(
    `Date Generated: ${new Date().toLocaleDateString()}`,
    marginLeft,
    yPos
  );
  yPos += 10;

  if (mode !== "transactions") {
    // Overview
    doc.setFontSize(14);
    doc.text("1. Overview", marginLeft, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.text(`Total Income: £${summary.income}`, marginLeft, yPos);
    yPos += 7;
    doc.text(`Total Expenses: £${summary.expense}`, marginLeft, yPos);
    yPos += 7;
    doc.text(`Balance: £${summary.balance}`, marginLeft, yPos);
    yPos += 10;

    // Spending Breakdown (Table)
    doc.setFontSize(14);
    doc.text("2. Spending Breakdown", marginLeft, yPos);
    yPos += 7;
    doc.autoTable({
      startY: yPos,
      head: [["Category", "Amount Spent (£)", "% of Total Expenses"]],
      body: summary.spending.breakdown.map((item) => [
        item.category,
        `£${item.amount}`,
        `${item.percentage}%`,
        console.log(item)
      ]),
      theme: "grid",
    });
    yPos = doc.lastAutoTable.finalY + 10;
  }

  // Transactions Table
  doc.setFontSize(14);
  doc.text(
    mode === "dashboard"
      ? "3. Recent Transactions (Latest 30)"
      : "Full Transaction History",
    marginLeft,
    yPos
  );
  yPos += 7;
  doc.autoTable({
    startY: yPos,
    head: [["Date", "Description", "Category", "Type", "Amount (£)"]],
    body: (mode === "dashboard" ? reportTransaction : allTransactions).map(
      (t) => [t.date, t.note, t.category, t.type, `£${t.amount}`]
    ),
    theme: "grid",
  });

  // Save PDF
  doc.save(`export_${mode}.pdf`);
};
