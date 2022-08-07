import React, { useEffect, useState } from "react";
import ChartComponent from "../components/chart";

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!data) {
      fetch(`${process.env.PUBLIC_URL}/results/stats.json`).then(
        function (res) {
          return res.json()
        }).then(function (data) {
          // store Data in State Data Variable
          setData(data.hello_world)
        }).catch(
          function (err) {
            console.log(err, ' error')
          }
        )
    }
  });

  return (
    <div>
      home page
      <ChartComponent data={data}></ChartComponent>
    </div>
  );
}
