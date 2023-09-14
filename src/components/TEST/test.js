import React from "react";
// import "./styles.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const printDocument = () => {
    const input = document.getElementById("test");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 20, 20);
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="App" id="test">
      <p>test</p>
      <button onClick={printDocument}>PDF</button>
    </div>
  );
}