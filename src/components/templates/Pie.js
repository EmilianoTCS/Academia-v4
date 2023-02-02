import React, { Component } from "react";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

class PieChart extends Component {
  state = { cards: [], loadedData: false };

  loadData() {
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/Cards-General.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, cards: dataResponse });
      })
      .catch(console.log());
  }

  componentDidMount() {
    this.loadData();
  }
  render() {
    const etiquetas = ["Finalizado", "En curso", "Pendiente"];
    const { cards } = this.state;
    var data = {
      labels: etiquetas,
      datasets: [
        {
          label: `Cantidad`,
          data: [
            cards.map((card) => card.totalFinalizados),
            cards.map((card) => card.totalActivos),
            cards.map((card) => card.totalPendientes),
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    var options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "white",
          },
        },
        title: {
          display: true,
          text: "Cantidad de cursos por estado",
          color: "white",
        },
      },
    };

    return (
      <div>
        <Pie data={data} options={options} width={400} />
      </div>
    );
  }
}

export default PieChart;
