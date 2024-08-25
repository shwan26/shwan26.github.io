import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CarBarChart = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  // Function to generate random colors
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Get unique brands
  const brands = Object.keys(data);

  // Get all unique models across all brands
  const allModels = [...new Set(brands.flatMap(brand => Object.keys(data[brand].models)))];

  // Create a dataset for each model
  const datasets = allModels.map(model => {
    return {
      label: model,
      data: brands.map(brand => data[brand].models[model]?.numberOfCars || 0),
      backgroundColor: getRandomColor(),
      stack: 'stack1',
    };
  });

  // Chart data structure
  const chartData = {
    labels: brands,
    datasets: datasets,
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Brand'
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Cars'
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default CarBarChart;
