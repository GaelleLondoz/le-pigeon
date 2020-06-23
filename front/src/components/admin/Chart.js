import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import userAPI from "../services/userAPI";

export default function Chart() {
  const theme = useTheme();
  const currentDate = new Date(Date.now()).toDateString();
  const array = [];
  const [salesList, setSalesList] = useState(array);
  const [load, setLoad] = useState(true);

  const initSales = async () => {
    let data = [];
    const sales = await userAPI.getRecentSales();
    const entries = sales.entries();
    for (const [i, item] of entries) {
      let row = {
        name: item.firstname + " " + item.lastname,
        amount: item.sales,
      };
      data.push(row);
    }
    setSalesList(data);
  };

  useEffect(() => {
    if (load) {
      initSales();
      setLoad(false);
    }
  });

  return (
    <React.Fragment>
      <Title>{currentDate}</Title>
      <ResponsiveContainer>
        <LineChart
          data={salesList}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Sales (€)
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
