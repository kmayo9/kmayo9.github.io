import pandas as pd
import os

# Set paths
excel_path = "../data_raw/WarmeHands - data.xlsx"
clean_dir = "../data_cleaned"
os.makedirs(clean_dir, exist_ok=True)

# Load Excel sheets
xls = pd.ExcelFile(excel_path)
for sheet in xls.sheet_names:
    df = xls.parse(sheet)

    if 'SKU' in df.columns:
        df['SKU'] = df['SKU'].astype(str).str.strip().str.upper()
        df = df[df['SKU'].notna()]
        df = df[~df['SKU'].str.contains(r'[^\w\d]', regex=True)]
        df = df.drop_duplicates(subset='SKU')

    df.to_csv(f"{clean_dir}/{sheet}_cleaned.csv", index=False)
    print(f"✅ Cleaned sheet: {sheet}")