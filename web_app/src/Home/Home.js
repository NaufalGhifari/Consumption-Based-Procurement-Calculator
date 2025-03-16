import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <>
        <div className="container mt-5 d-flex flex-column">
            <h1 className="mb-4 fw-bold">Select a Calculator</h1>

            <div className="card p-4 shadow-lg bg-light text-center">
                <p className="lead">Choose a calculator that suits your needs:</p>
                
                <div className="d-flex flex-column gap-3 mt-3">
                <Link to="/consumption-calculator" className="btn btn-primary btn-lg">
                    Consumption-Based Calculator
                </Link>

                <Link to="/bcr-calculator" className="btn btn-secondary btn-lg">
                    BCR Calculator
                </Link>
                </div>
            </div>
        </div>
    </>
  );
}

export default Home;