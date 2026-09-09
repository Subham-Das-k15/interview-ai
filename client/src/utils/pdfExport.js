export const exportInterviewReportPDF = (interview) => {
  if (!interview) return;

  // Trigger print dialog tailored with @media print styling
  window.print();
};
