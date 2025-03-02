from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

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

@app.post("/consumption_method")
def consumption_method(request: ConsumptionMethodRequest):
    result = calculate_consumption_method(
        request.yearly_usage,
        request.remaining_stock,
        request.buffer_percent,
        request.lead
    )
    return {"required_stock": result}
