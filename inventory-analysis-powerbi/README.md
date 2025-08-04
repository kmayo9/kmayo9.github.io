Inventory Analysis for WarmeHands — Python-Powered Data Cleanup for Power BI
This project streamlines raw inventory data from WarmeHands into a structured format optimized for Power BI dashboards. Using Python, it automates the cleaning of multiple Excel sheets to prepare consistent, duplicate-free datasets that feed into visual analytics tools.
Key Features
- Reads and cleans every sheet from a multi-tab Excel workbook
- Removes blanks, standardizes SKU formats, and deduplicates rows
- Saves cleaned datasets to timestamped folders for auditability
- Logs cleaned sheet names and row counts for easy verification
- Auto-generates a requirements.txt for reproducibility
Tech Stack
- Python 3.11
- pandas
- openpyxl
- Power BI (for dashboard visualizations)
Workflow Summary
- Place the Excel file in /data_raw/
- Run clean_all.py from the /scripts/ folder
- Cleaned files appear in /data_cleaned_YYYY-MM-DD/
- Use the outputs in Power BI to build trustworthy dashboards
Why It Matters This pipeline reflects a focus on data integrity and storytelling. The preprocessing ensures Power BI visuals reflect reality, not assumptions — a crucial step for supply chain analysts and business decision-makers. It blends technical rigor with clear narrative, just like the rest of the portfolio.
