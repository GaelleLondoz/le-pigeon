import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import userAPI from "../services/userAPI";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const currentDate = new Date(Date.now()).toDateString();
  const [amount, setAmount] = useState(0);
  const [load, setLoad] = useState(true);

  const initSalesAmount = async () => {
    let amount = 0;
    const sales = await userAPI.getRecentSales();
    const entries = sales.entries();
    for (const [i, item] of entries) {
      let row = {
        amount: item.sales,
      };
      amount = amount + row.amount;
    }
    setAmount(amount);
  };

  useEffect(() => {
    if (load) {
      initSalesAmount();
      setLoad(false);
    }
  });

  return (
    <React.Fragment>
      <Title> Monthly Sales </Title>{" "}
      <Typography component="p" variant="h4">
        € {amount}{" "}
      </Typography>{" "}
      <Typography color="textSecondary" className={classes.depositContext}>
        on {currentDate}{" "}
      </Typography>{" "}
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance{" "}
        </Link>{" "}
      </div>{" "}
    </React.Fragment>
  );
}
