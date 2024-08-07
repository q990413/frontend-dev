// MyChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function MyChart({ populationData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (populationData) {
      const chartData = {
        labels: ['5km', '10km', '30km', '100km'],
        datasets: [
          {
            label: 'Population',
            data: [
              populationData.population_5km,
              populationData.population_10km,
              populationData.population_30km,
              populationData.population_100km,
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const myChart = new Chart(chartRef.current, chartConfig);

      return () => {
        myChart.destroy(); // Cleanup chart on unmount
      };
    }
  }, [populationData]);

  return <canvas ref={chartRef} />;
}

export default MyChart;
