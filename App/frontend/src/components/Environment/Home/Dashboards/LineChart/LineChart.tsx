import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

export const LineChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulação de obtenção de dados
        const data = [
          {
            "In": 638483547516498065,
            "Out": 638483554166625200,
            "Car": { "Color": "Preto" }
          },
          {
            "In": 638483547597517844,
            "Out": 638483555128253538,
            "Car": { "Color": "Preto" }
          },
          {
            "In": 638483552898464576,
            "Out": 638483555141140453,
            "Car": { "Color": "Preto" }
          }
        ];

        const labels = data.map((item) => {
          const date = new Date(item.In);
          return date.toLocaleString('default', { month: 'short' });
        });

        const dataset1 = data.map((item) => {
          const inTime = item.In;
          const outTime = item.Out;
          const metric = outTime - inTime;
          return metric;
        });

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Tempo de permanência (em ms)',
              data: dataset1,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Container_Line_Father">
      <Line data={chartData} />
    </div>
  );
};
