import requests

URL = "http://127.0.0.1:8000/predict"

# I've mapped your CSV data to the 'features' list your model expects
sample_data = {
    "hour": 15,
    "day_of_week": 6,  # Sunday (from 2023-11-05)
    "month": 11,
    "Transaction_Amount": 3198.94,
    "Transaction_Type": "Debit",
    "Category": "Transport",
    "City": "Phoenix",
    "Country": "USA",
    "Payment_Method": "Online Transfer",
    "Customer_Age": 55,
    "Customer_Gender": "Others",
    "Customer_Occupation": "Quality manager",
    "Account_Balance": 350.28,
    "Transaction_Status": 0
}

def run_test():
    try:
        response = requests.post(URL, json=sample_data)
        if response.status_code == 200:
            print("Success!")
            print(f"Prediction: {response.json()}")
        else:
            print(f"Error {response.status_code}: {response.text}")
    except Exception as e:
        print(f"Could not connect to Flask: {e}")

if __name__ == "__main__":
    run_test()
