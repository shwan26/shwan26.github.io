import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CarPieChart = ({ data }) => {
  // Function to generate multiple random colors
  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }
    return colors;
  };

  // Calculate the total number of cars by brand
  const brands = data.reduce((acc, car) => {
    if (!acc[car.brand]) {
      acc[car.brand] = 0;
    }
    acc[car.brand] += car.numberOfCars;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(brands),
    datasets: [{
      data: Object.values(brands),
      backgroundColor: getRandomColors(Object.keys(brands).length), // Generate colors based on number of brands
    }]
  };

  return <Pie data={chartData} />;
};

export default CarPieChart;
