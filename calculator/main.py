from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Define allowed origins
origins = [
    "http://localhost:3001",  # React frontend
    "http://127.0.0.1:3001",  # Alternative localhost format
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class ConsumptionMethodRequest(BaseModel):
    yearly_usage: float
    remaining_stock: float
    buffer_percent: float
    lead: float = None  # Optional

class CBRMethodRequest(BaseModel):
    initial_investment: float
    yearly_costs: List[float]
    yearly_benefits: List[float]
    discount_rate: float
    duration: int

def calculate_consumption_method(yearly_usage, remaining_stock, buffer_percent, lead=None):
    """
    Calculate the optimal stock required for procurement based on the past 12 months' consumption.

    Formula:
        Required Stock = (Monthly Usage + Buffer Stock + Lead Time Stock) - Remaining Stock

    Parameters:
    - yearly_usage (float): Total usage over the past 12 months.
    - remaining_stock (float): Current stock available.
    - buffer_percent (float): Percentage of monthly usage to keep as buffer stock.
    - lead (float, optional): Additional stock required based on lead time (default is one week of usage).

    Returns:
    - float: The amount of stock required for procurement.
    """

    print(f"calculate_consumption_method called() !")

    monthly_usage = yearly_usage / 12
    weekly_usage = monthly_usage / 4
    buffer_value = (buffer_percent / 100) * monthly_usage

    if lead is None:
        lead = weekly_usage

    result = (monthly_usage + buffer_value + lead) - remaining_stock
    print(f"Result: {result}")
    return result

def calculate_CBR(initial_investment, yearly_costs, yearly_benefits, discount_rate, duration):
    
    yearly_cost_sum = sum(yearly_costs)
    yearly_benefit_sum = sum(yearly_benefits)
    
    def calc_discounted_value(total, rate, duration):
        pv_total = 0
        for t in range(duration):
            pv = total / (1.0 + rate)**(t+1)
            pv_total += pv
        return pv_total
    
    pv_cost = calc_discounted_value(yearly_cost_sum, discount_rate, duration)
    pv_benefit = calc_discounted_value(yearly_benefit_sum, discount_rate, duration)

    cbr = pv_benefit / (initial_investment + pv_cost)
    return cbr

@app.post("/consumption_method")
def consumption_method(request: ConsumptionMethodRequest):
    result = calculate_consumption_method(
        request.yearly_usage,
        request.remaining_stock,
        request.buffer_percent,
        request.lead
    )
    return {"required_stock": result}

@app.post("/cost_benefit_ratio")
def CBR(request: CBRMethodRequest):
    result = calculate_CBR(
        request.initial_investment,
        request.yearly_costs,
        request.yearly_benefits,
        request.discount_rate,
        request.duration
    )
    return {"cbr": round(result, 3)}