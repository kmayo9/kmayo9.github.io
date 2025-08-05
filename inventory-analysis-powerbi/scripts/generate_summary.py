import os
import pandas as pd

def summarize_cleaned_folder(folder_path):
    summary = []

    for filename in os.listdir(folder_path):
        if filename.endswith('.csv'):
            filepath = os.path.join(folder_path, filename)
            try:
                df = pd.read_csv(filepath)
                row_count = len(df)
                summary.append({
                    'Sheet': filename.replace('_cleaned.csv', ''),
                    'Rows': row_count
                })
            except Exception as e:
                summary.append({
                    'Sheet': filename,
                    'Rows': f"Error loading file: {e}"
                })

    return pd.DataFrame(summary)

if __name__ == "__main__":
    folder_path = "../data_cleaned"  # adjust if needed
    summary_df = summarize_cleaned_folder(folder_path)
    summary_df.to_csv("cleaned_summary.csv", index=False)
    print(summary_df)