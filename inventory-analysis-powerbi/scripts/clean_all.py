import pandas as pd
import os

# ✅ Paths: adjust if needed based on working directory
excel_path = r"./inventory-analysis-powerbi/data_raw/WarmeHands - data.xlsx"
output_path = r"./inventory-analysis-powerbi/data_cleaned"
os.makedirs(output_path, exist_ok=True)

def clean_sheet(df, sheet_name):
    # 💡 Standardize column names
    df.columns = df.columns.str.strip().str.replace(" ", "_")

    # 🔍 Clean text columns
    for col in df.select_dtypes(include="object").columns:
        df[col] = (
            df[col]
            .astype(str)
            .str.replace(r"\.\.+", ".", regex=True)
            .str.replace(r"[^\w\.\-]", "", regex=True)
        )

    # 🧹 Drop duplicate keys in dimension tables
    if sheet_name == "Customer" and "Customer_ID" in df.columns:
        df = df.drop_duplicates(subset="Customer_ID")

    if sheet_name == "Stock" and "Stock_ID" in df.columns:
        df = df.drop_duplicates(subset="Stock_ID")

    # 📦 Enrich Orders sheet
    if sheet_name == "Orders":
        required_cols = {"Quantity", "Price_per_Unit"}
        if required_cols.issubset(df.columns):
            df["Total_Sale"] = df["Quantity"] * df["Price_per_Unit"]

    # 🔍 Filter Cost sheet if applicable
    if sheet_name == "Costs":
        cost_cols = [c for c in df.columns if any(k in c.lower() for k in ["cost", "price", "amount"])]
        df = df[cost_cols]

    return df

# 🔄 Process each sheet
xls = pd.ExcelFile(excel_path)

for sheet_name in xls.sheet_names:
    print(f"🧾 Processing sheet: {sheet_name}")
    df_raw = xls.parse(sheet_name)
    df_cleaned = clean_sheet(df_raw, sheet_name)
    output_file = os.path.join(output_path, f"{sheet_name}_cleaned.csv")
    df_cleaned.to_csv(output_file, index=False)
    print(f"✅ Cleaned and saved: {output_file}")

# Load datasets
orders = orders = pd.read_csv("./inventory-analysis-powerbi/data_cleaned/Orders_cleaned.csv")

customers = customers = pd.read_csv("./inventory-analysis-powerbi/data_cleaned/Customer_cleaned.csv")

# Check unmatched Customer_IDs

print("Orders columns:", orders.columns.tolist())
print("Customers columns:", customers.columns.tolist())
missing_customers = orders[~orders["Customer_ID"].isin(customers["Customer_ID"])]
print("❌ Unmatched Customer_IDs:", missing_customers.shape[0])
