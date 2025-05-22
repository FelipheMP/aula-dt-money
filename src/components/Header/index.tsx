"use client"
;
import Image from "next/image";
import { useState } from "react";

export function Header({ onNewTransaction }: { onNewTransaction: (transaction: any) => void }) {
  const [showPopup, setShowPopup] = useState(false);
  const [transactionName, setTransactionName] = useState("");
  const [transactionPrice, setTransactionPrice] = useState("");
  const [transactionType, setTransactionType] = useState(""); // "entrada" or "saida"
  const [transactionCategory, setTransactionCategory] = useState("");

  const handleNewTransactionClick = () => {
    setShowPopup(true);
  };

  const handleConfirmClick = () => {
    const newTransaction = {
      title: transactionName,
      price: parseFloat(transactionPrice),
      type: transactionType === 'entrada' ? 'income' : 'outcome',
    };
    onNewTransaction(newTransaction);
    setTransactionName("");
    setTransactionPrice("");
    setTransactionType("");
    setTransactionCategory("");
    setShowPopup(false);
  };

  return (
    <header className="bg-header w-full h-[212px]" >
        <div className="max-w-[1120px] mx-auto flex row justify-between pt-8">
            <Image src="/logo.png" width={172} height={40} alt="Logo Image" />
            <button
              className="bg-button text-white px-8 py-3 rounded-md hover:opacity-80"
              onClick={handleNewTransactionClick}
            >
              Nova transação
            </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md">
              <h2 className="text-xl mb-4">Nova Transação</h2>
              <input type="text" placeholder="Nome" className="border p-2 mb-2 w-full" value={transactionName} onChange={(e) => setTransactionName(e.target.value)} />
              <input type="number" placeholder="Preço" className="border p-2 mb-2 w-full" value={transactionPrice} onChange={(e) => setTransactionPrice(e.target.value)} />
              <div className="flex justify-between mb-2">
                <button className={`px-4 py-2 rounded-md ${transactionType === 'entrada' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setTransactionType('entrada')}>Entrada</button>
                <button className={`px-4 py-2 rounded-md ${transactionType === 'saida' ? 'bg-red-500 text-white' : 'bg-gray-200'}`} onClick={() => setTransactionType('saida')}>Saída</button>
              </div>
              <input type="text" placeholder="Categoria" className="border p-2 mb-4 w-full" value={transactionCategory} onChange={(e) => setTransactionCategory(e.target.value)} />
              <button className="bg-button text-white px-4 py-2 rounded-md w-full" onClick={handleConfirmClick}>Confirmar</button>
            </div>
          </div>
        )}
    </header>
  );
}