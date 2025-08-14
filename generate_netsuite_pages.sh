#!/bin/bash

# Define an array of filenames and titles
declare -A pages=(
  ["netsuite-inventory-implementation.html"]="NetSuite ERP — Inventory Implementation"
  ["netsuite-workflows.html"]="Saved Searches & Workflow Automation"
  ["netsuite-kpi-enablement.html"]="KPI Dashboard & Training Enablement"
  ["netsuite-cycle-counts.html"]="Cycle Counting & Inventory Accuracy"
  ["netsuite-procurement-vendor.html"]="Procurement & Vendor Performance"
  ["netsuite-master-data.html"]="Master Data Cleanup & Governance"
)

# Define a reusable HTML template function
generate_html() {
  local filename=$1
  local title=$2
  local heading=$2
  local summary=$3

  cat <<EOF > "$filename"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>$title</title>
  <link rel="stylesheet" href="styles/styles-v2.css" />
</head>
<body>
  <section class="fade-in-up">
    <h1>$heading</h1>
    <p>$summary</p>
    <p><a href="index.html" class="btn btn-secondary">← Back to Portfolio</a></p>
  </section>
</body>
</html>
EOF
}

# Define summaries for each page
declare -A summaries=(
  ["netsuite-inventory-implementation.html"]="Migration from Zenventory and Google Sheets into NetSuite, including SKU/bin/location architecture and live-ops adoption."
  ["netsuite-workflows.html"]="Exception-first visibility and lightweight workflows for receiving variances, stale POs, and approvals."
  ["netsuite-kpi-enablement.html"]="Role-based KPIs and micro-demos to drive adoption and behavior change."
  ["netsuite-cycle-counts.html"]="ABC-based cycle count program with variance thresholds and root cause reconciliation."
  ["netsuite-procurement-vendor.html"]="PO aging, promise-date drift, and vendor scorecards to tighten SLAs."
  ["netsuite-master-data.html"]="Standardized item master and implemented pre-save checks to boost report reliability."
)

# Loop through and generate each file
for file in "${!pages[@]}"; do
  generate_html "$file" "${pages[$file]}" "${summaries[$file]}"
  echo "Created $file"
done