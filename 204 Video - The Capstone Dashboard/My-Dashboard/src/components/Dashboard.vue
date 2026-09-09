<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bar as BarChart, Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import metricsData from '../data/metrics.json'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface MetricMonth {
  month: string
  revenue: number
  visitors: number
  conversions: number
  orders: number
}

const selectedMonth = ref('All')
const metrics = ref<MetricMonth[]>(metricsData)

const months = computed(() => ['All', ...metrics.value.map(m => m.month)])

const filteredData = computed(() => {
  if (selectedMonth.value === 'All') {
    return metrics.value
  }
  return metrics.value.filter(m => m.month === selectedMonth.value)
})

const summaryCards = computed(() => {
  if (selectedMonth.value === 'All') {
    const totalRevenue = metrics.value.reduce((sum, m) => sum + m.revenue, 0)
    const totalVisitors = metrics.value.reduce((sum, m) => sum + m.visitors, 0)
    const avgConversions = (metrics.value.reduce((sum, m) => sum + m.conversions, 0) / metrics.value.length).toFixed(2)
    const totalOrders = metrics.value.reduce((sum, m) => sum + m.orders, 0)

    return [
      { label: 'Revenue', value: `$${(totalRevenue / 1000).toFixed(1)}k`, change: 8.2, positive: true },
      { label: 'Visitors', value: totalVisitors.toLocaleString(), change: 5.3, positive: true },
      { label: 'Conversions', value: `${avgConversions}%`, change: 1.2, positive: true },
      { label: 'Orders', value: totalOrders.toLocaleString(), change: 3.8, positive: true }
    ]
  } else {
    const current = filteredData.value[0]
    const currentIndex = metrics.value.findIndex(m => m.month === selectedMonth.value)
    const previous = currentIndex > 0 ? metrics.value[currentIndex - 1] : null

    const revenueChange = previous ? ((current.revenue - previous.revenue) / previous.revenue * 100).toFixed(1) : 0
    const visitorsChange = previous ? ((current.visitors - previous.visitors) / previous.visitors * 100).toFixed(1) : 0
    const conversionsChange = previous ? (current.conversions - previous.conversions).toFixed(1) : 0
    const ordersChange = previous ? ((current.orders - previous.orders) / previous.orders * 100).toFixed(1) : 0

    return [
      { label: 'Revenue', value: `$${(current.revenue / 1000).toFixed(1)}k`, change: parseFloat(revenueChange), positive: parseFloat(revenueChange) >= 0 },
      { label: 'Visitors', value: current.visitors.toLocaleString(), change: parseFloat(visitorsChange), positive: parseFloat(visitorsChange) >= 0 },
      { label: 'Conversions', value: `${current.conversions}%`, change: parseFloat(conversionsChange), positive: parseFloat(conversionsChange) >= 0 },
      { label: 'Orders', value: current.orders.toLocaleString(), change: parseFloat(ordersChange), positive: parseFloat(ordersChange) >= 0 }
    ]
  }
})

const revenueChartData = computed(() => {
  const selectedIndex = selectedMonth.value === 'All' ? -1 : metrics.value.findIndex(m => m.month === selectedMonth.value)
  
  if (selectedMonth.value === 'All') {
    return {
      labels: metrics.value.map(m => m.month.substring(0, 3)),
      datasets: [
        {
          label: 'Revenue',
          data: metrics.value.map(m => m.revenue),
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50',
          borderWidth: 1
        }
      ]
    }
  }
  
  // Highlight selected month
  const colors = metrics.value.map((_, idx) => 
    idx === selectedIndex ? '#4CAF50' : '#CCCCCC'
  )
  
  return {
    labels: metrics.value.map(m => m.month.substring(0, 3)),
    datasets: [
      {
        label: 'Revenue',
        data: metrics.value.map(m => m.revenue),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }
    ]
  }
})

const visitorsChartData = computed(() => {
  const selectedIndex = selectedMonth.value === 'All' ? -1 : metrics.value.findIndex(m => m.month === selectedMonth.value)
  
  const pointRadius = metrics.value.map((_, idx) =>
    idx === selectedIndex ? 8 : 4
  )
  const pointBackgroundColor = metrics.value.map((_, idx) =>
    idx === selectedIndex ? '#1976D2' : '#2196F3'
  )
  
  return {
    labels: metrics.value.map(m => m.month.substring(0, 3)),
    datasets: [
      {
        label: 'Visitors',
        data: metrics.value.map(m => m.visitors),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: pointRadius,
        pointBackgroundColor: pointBackgroundColor,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  }
})

const conversionsChartData = computed(() => {
  const selectedIndex = selectedMonth.value === 'All' ? -1 : metrics.value.findIndex(m => m.month === selectedMonth.value)
  
  const pointRadius = metrics.value.map((_, idx) =>
    idx === selectedIndex ? 8 : 4
  )
  const pointBackgroundColor = metrics.value.map((_, idx) =>
    idx === selectedIndex ? '#F57C00' : '#FF9800'
  )
  
  return {
    labels: metrics.value.map(m => m.month.substring(0, 3)),
    datasets: [
      {
        label: 'Conversion Rate',
        data: metrics.value.map(m => m.conversions),
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: pointRadius,
        pointBackgroundColor: pointBackgroundColor,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
</script>

<template>
  <v-app-bar color="white" flat>
    <v-app-bar-title class="text-h5 font-weight-bold">Dashboard</v-app-bar-title>
  </v-app-bar>

  <v-main>
    <v-container fluid class="pa-6">
      <!-- Month Picker -->
      <v-row class="mb-6">
        <v-col cols="12">
          <v-select
            v-model="selectedMonth"
            :items="months"
            label="Month"
            variant="outlined"
            density="compact"
            style="width: 200px"
          ></v-select>
        </v-col>
      </v-row>

      <!-- Summary Cards Row -->
      <v-row class="mb-6">
        <v-col v-for="(card, index) in summaryCards" :key="index" cols="12" sm="6" md="3">
          <v-card class="h-100" elevation="1">
            <v-card-content>
              <div class="text-subtitle2 text-grey mb-3">{{ card.label }}</div>
              <div class="text-h4 font-weight-bold mb-3">{{ card.value }}</div>
              <div class="d-flex align-center gap-2">
                <v-icon :color="card.positive ? 'success' : 'error'" size="small">
                  {{ card.positive ? 'mdi-trending-up' : 'mdi-trending-down' }}
                </v-icon>
                <span :class="card.positive ? 'text-success' : 'text-error'">
                  {{ card.positive ? '+' : '' }}{{ card.change.toFixed(1) }}%
                </span>
              </div>
            </v-card-content>
          </v-card>
        </v-col>
      </v-row>

      <!-- Charts Row 1: Revenue (Left) and Visitors (Right) -->
      <v-row class="mb-6">
        <v-col cols="12" md="6">
          <v-card elevation="1">
            <v-card-title>Monthly Revenue</v-card-title>
            <v-card-content>
              <BarChart :data="revenueChartData" :options="chartOptions" />
            </v-card-content>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="1">
            <v-card-title>Visitors Over Time</v-card-title>
            <v-card-content>
              <LineChart :data="visitorsChartData" :options="chartOptions" />
            </v-card-content>
          </v-card>
        </v-col>
      </v-row>

      <!-- Full Width Conversions Chart -->
      <v-row>
        <v-col cols="12">
          <v-card elevation="1">
            <v-card-title>Conversion Trends</v-card-title>
            <v-card-content>
              <LineChart :data="conversionsChartData" :options="chartOptions" />
            </v-card-content>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
:deep(.v-card) {
  border-radius: 8px;
}

:deep(.v-app-bar) {
  border-bottom: 1px solid #e0e0e0;
}
</style>
