"use client";
import { Card } from "../Card";
import { useState, useEffect } from "react";

interface Transaction {
  title: string;
  price: number;
  category: string;
  date: string;
  type: 'income' | 'outcome';
}

export function CardContainer({ transactions }: { transactions: Transaction[] }) {
    const [total, setTotal] = useState(0);
    const [income, setIncome] = useState(0);
    const [outcome, setOutcome] = useState(0);

    useEffect(() => {
      let newIncome = 0;
      let newOutcome = 0;
      let newTotal = 0;

      transactions.forEach(transaction => {
        if (transaction.type === 'income') {
          newIncome += transaction.price;
        } else {
          newOutcome += transaction.price;
        }
      });

      newTotal = newIncome - newOutcome;
      setIncome(newIncome);
      setOutcome(newOutcome);
      setTotal(newTotal);
    }, [transactions]);

    return (
        <div className="flex justify-between">
          <Card title="Entradas" value={income} type="income" />
          <Card title="Saídas" value={outcome} type="outcome" />
          <Card title="Total" value={total} type="total" />
        </div>
    );
}