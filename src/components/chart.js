import React from "react";
import { Bar } from 'react-chartjs-2';

export default function ChartComponent(props) {

  console.log(props);
  if (!props.data) {
    return <div></div>;
  }
  let data;
  if (props.data) {
    data = {
      labels: props.data.map(el => el.lang),
      datasets: [
        {
          label: 'Time elapsed (s)',
          data: props.data.map(el => el.execution['time elapsed']),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
  return (
    <div>
      Chart component
      <Bar
        data={data}
        width={100}
        height={50}
      />
    </div>
  );
}
