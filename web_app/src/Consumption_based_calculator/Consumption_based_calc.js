import React, { useState } from "react";

export default function ConsumptionCalculator() {
    const [yearlyUsage, setYearlyUsage] = useState("");
    const [remainingStock, setRemainingStock] = useState("");
    const [bufferPercent, setBufferPercent] = useState("");
    const [lead, setLead] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const weeklyUsage = yearlyUsage/12/4

        const response = await fetch(`http://localhost:5000/consumption_method`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                yearly_usage: parseFloat(yearlyUsage),
                remaining_stock: parseFloat(remainingStock),
                buffer_percent: parseFloat(bufferPercent),
                lead: parseFloat(lead) || weeklyUsage,
            }),
        });

        const data = await response.json();
        setResult(data.required_stock);
    };

    return (
        <div>
            <h1>Consumption-Based Stock Estimation Calculator</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Yearly Usage" value={yearlyUsage} onChange={(e) => setYearlyUsage(e.target.value)} required />
                <input type="number" placeholder="Remaining Stock" value={remainingStock} onChange={(e) => setRemainingStock(e.target.value)} required />
                <input type="number" placeholder="Buffer %" value={bufferPercent} onChange={(e) => setBufferPercent(e.target.value)} required />
                <input type="number" placeholder="Lead (optional)" value={lead} onChange={(e) => setLead(e.target.value)} />
                <button type="submit">Calculate</button>
            </form>
            {result !== null && <h2>Estimated stock procurement for the month: {result}</h2>}
        </div>
    );
}
