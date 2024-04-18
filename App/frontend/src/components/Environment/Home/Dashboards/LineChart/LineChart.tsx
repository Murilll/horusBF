import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

export const LineChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('URL_DO_SEU_BACKEND_PARA_OBTER_DADOS');
        // const data = response.data;

        const data = [{
          "_id": {
            "$oid": "6616c6ef9443bf86dcddaed4"
          },
          "Collaborator": {
            "_id": {
              "$oid": "660469a8f55e0e2983be9767"
            },
            "Name": "Murilo",
            "EDV": "123"
          },
          "Car": {
            "_id": {
              "$oid": "660469cbf55e0e2983be9768"
            },
            "Name": "Gol Volksvagem",
            "Color": "Preto",
            "LicensePlate": "abdc123",
            "CollaboratorId": "660469a8f55e0e2983be9767"
          },
          "In": [
            {
              "$numberLong": "638483547516498065"
            },
            -180
          ],
          "Out": [
            {
              "$numberLong": "638483554166625200"
            },
            -180
          ],
          "Status": "Saiu",
          "LicensePlateUnknown": "null"
        },
        {
          "_id": {
            "$oid": "6616c6f79443bf86dcddaed5"
          },
          "Collaborator": {
            "_id": {
              "$oid": "660469a8f55e0e2983be9767"
            },
            "Name": "Murilo",
            "EDV": "123"
          },
          "Car": {
            "_id": {
              "$oid": "660469cbf55e0e2983be9768"
            },
            "Name": "Gol Volksvagem",
            "Color": "Preto",
            "LicensePlate": "abdc123",
            "CollaboratorId": "660469a8f55e0e2983be9767"
          },
          "In": [
            {
              "$numberLong": "638483547597517844"
            },
            -180
          ],
          "Out": [
            {
              "$numberLong": "638483555128253538"
            },
            -180
          ],
          "Status": "Saiu",
          "LicensePlateUnknown": "null"
        },
        {
          "_id": {
            "$oid": "6616c909137d9498248dd863"
          },
          "Collaborator": {
            "_id": {
              "$oid": "660469a8f55e0e2983be9767"
            },
            "Name": "Murilo",
            "EDV": "123"
          },
          "Car": {
            "_id": {
              "$oid": "660469cbf55e0e2983be9768"
            },
            "Name": "Gol Volksvagem",
            "Color": "Preto",
            "LicensePlate": "abdc123",
            "CollaboratorId": "660469a8f55e0e2983be9767"
          },
          "In": [
            {
              "$numberLong": "638483552898464576"
            },
            -180
          ],
          "Out": [
            {
              "$numberLong": "638483555141140453"
            },
            -180
          ],
          "Status": "Saiu",
          "LicensePlateUnknown": "null"
        }]

        const labels = data.map((item: any) => {
          const timestamp = item.In[0].$numberLong;
          const date = new Date(parseInt(timestamp));
          console.log(date)
          return date.toLocaleString('default', { month: 'short' });
        });

        const dataset1 = data.map((item: any) => {
          const inTime = parseInt(item.In[0].$numberLong);
          const outTime = parseInt(item.Out[0].$numberLong);
          const metric = outTime - inTime;
          console.log(metric)
          return metric;
        });

        const dataset2 = data.map((item: any) => {
          console.log(dataset2)
          return item.Car.Color;
        });

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: dataset1,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Dataset 2',
              data: dataset2,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []); // O array vazio [] indica que esse efeito só será executado uma vez, equivalente ao componentDidMount

  return (
    <div className="Container_Line_Father">
     
    </div>
  );
};
