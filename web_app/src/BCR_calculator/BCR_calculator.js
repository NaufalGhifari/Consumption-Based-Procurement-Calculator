import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function BCRCalculator() {
    const [initialInvestment, setInitialInvestment] = useState(0);
    const [yearlyCosts, setYearlyCosts] = useState(0);
    const [yearlyBenefits, setYearlyBenefits] = useState(0);
    const [discountRate, setDiscountRate] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bcr, setBCR] = useState(null);
    const [solutionSteps, setSolutionSteps] = useState([]);

    const calculateBCR = () => {
        let discountedBenefits = 0;
        let discountedCosts = 0;
        let steps = [];

        for (let year = 1; year <= duration; year++) {
            let benefitDiscounted = yearlyBenefits / Math.pow(1 + discountRate / 100, year);
            let costDiscounted = yearlyCosts / Math.pow(1 + discountRate / 100, year);
            
            discountedBenefits += benefitDiscounted;
            discountedCosts += costDiscounted;
            
            steps.push(`Year ${year}: Benefit = ${benefitDiscounted.toFixed(2)}, Cost = ${costDiscounted.toFixed(2)}`);
        }

        discountedCosts += initialInvestment; // Adding initial investment

        const bcrValue = discountedBenefits / discountedCosts;
        setBCR(bcrValue.toFixed(2));
        setSolutionSteps(steps);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">BCR Calculator</h2>

            {/* Input Fields */}
            <div className="mb-3">
                <label className="form-label">Initial Investment:</label>
                <input
                    type="number"
                    className="form-control"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Yearly Costs:</label>
                <input
                    type="number"
                    className="form-control"
                    value={yearlyCosts}
                    onChange={(e) => setYearlyCosts(Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Yearly Benefits:</label>
                <input
                    type="number"
                    className="form-control"
                    value={yearlyBenefits}
                    onChange={(e) => setYearlyBenefits(Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Discount Rate (%):</label>
                <input
                    type="number"
                    className="form-control"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Duration (years):</label>
                <input
                    type="number"
                    className="form-control"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                />
            </div>

            <button className="btn btn-primary mb-3" onClick={calculateBCR}>
                Calculate BCR
            </button>

            {/* Display BCR Result */}
            {bcr !== null && (
                <div>
                    <h3>BCR: {bcr}</h3>

                    {/* Interpretation Section */}
                    <div className="card p-3 mt-3">
                        <h5>How to Interpret BCR:</h5>
                        <ul>
                            <li><strong>If BCR &gt; 1</strong>: The project is financially viable.</li>
                            <li><strong>If BCR = 1</strong>: The project breaks even.</li>
                            <li><strong>If BCR &lt; 1</strong>: The project may not be worth it.</li>
                        </ul>
                    </div>

                    {/* Step-by-step solution collapsible */}
                    <button
                        className="btn btn-secondary mt-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#solutionSteps"
                        aria-expanded="false"
                        aria-controls="solutionSteps"
                    >
                        Show Solution Steps
                    </button>

                    <div className="collapse mt-3" id="solutionSteps">
                        <div className="card card-body">
                            <h5>Step 1: Given Inputs</h5>
                            <ul>
                                <li>Initial Investment: {initialInvestment}</li>
                                <li>Yearly Costs: {yearlyCosts}</li>
                                <li>Yearly Benefits: {yearlyBenefits}</li>
                                <li>Discount Rate: {discountRate}%</li>
                                <li>Duration: {duration} years</li>
                            </ul>

                            <h5>Step 2: Discounted Cash Flows</h5>
                            <ul>
                                {solutionSteps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>

                            <h5>Step 3: Compute BCR</h5>
                            <p>BCR = (Total Discounted Benefits) / (Total Discounted Costs)</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BCRCalculator;
