import pandas as pd
import json

# --- Load Your Datasets ---
# Ensure these files are in the same directory
price_df = pd.read_csv('./data/BrentOilPrices.csv')
events_df = pd.read_csv('./data/events.csv')

# --- Clean and Format Data ---
price_df['Date'] = pd.to_datetime(price_df['Date'], format="mixed")
price_df = price_df.set_index('Date').sort_index()

# Format for charting libraries: an array of objects
price_data_json = [
    {"date": date.strftime('%Y-%m-%d'), "price": row['Price']} 
    for date, row in price_df.iterrows()
]

# Format event data
events_df['date'] = pd.to_datetime(events_df['date'])
event_data_json = [
    {"date": row['date'].strftime('%Y-%m-%d'), "name": row['event']}
    for _, row in events_df.iterrows()
]

change_points_json = [
    {
        "date": "2008-09-16", 
        "label": "Change Point: Financial Crisis",
        "description": "Volatility regime shifted, increasing by over 100%."
    }
]

# --- Combine into a Single Dictionary ---
dashboard_data = {
    "prices": price_data_json,
    "events": event_data_json,
    "change_points": change_points_json
}

# --- Save to a JSON File ---
with open('dashboard_data.json', 'w') as f:
    json.dump(dashboard_data, f, indent=4)

print("Successfully created dashboard_data.json")