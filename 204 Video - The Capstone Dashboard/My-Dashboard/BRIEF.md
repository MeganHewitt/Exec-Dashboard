# My Dashboard - Project Brief

## What is this?
A single page analytics dashboard showing mostly business metrics.
Think Shopify Admin or a simple Google Analytics view.

## Data
Generate a fake dataset as a JSON file (src/data/metics.json)
12 months of data (Jan - Dec 2025), each month containing:
- revenue (dollar amount, trending upward with some variation)
- visitors (number, seasonal patter - higher in summer)
- conversions (percentage, fluctuates between 2-5%)
- orders (numbers, correlates loosly with visitors)

## Layout (Vuetify)
- v-app-bar at the top with the dashboard title and month picker
- The month picker should default to show all months
- When a specific month is selected, all cards and charts filter to that month. When "All" is selected show the full year
- Below the app bar: a row of 4 summary cards (v-card) showing the key metrics - revenue, visitors, conversions, orders
- Below the cards: a row of 2 charts
    - Left: Bar chart showing monthly revenue
    - Right: Line chart showing visitors over time
- Below that: one full width are chart showing conversion trends
- Use v-container, v-row, v-col for responsive grid layout

## Interactions
- Month picker in the app bar filters everything - summary cards show the month's numbers, charts highlight or filter to that month
- When "All" is selected, summary cards show yearly totals/averages and charts show all 12 months
- Cards should show a small up/down arrow or color indicating change from previous

## Style
- Light theme by default (Vietify Light Theme)
- Clean, minimal, lots of white space
- Charts should use a cohesive color palette
- Mobile responsive - cards stack on small screens

## Tech
- Vue 3 + Typescript + Vuetify 3
- Chart.js via vue-chartjs for all charts
- Fake data from local JSON file (no API calls)
- Single page - no routing needed for this App  