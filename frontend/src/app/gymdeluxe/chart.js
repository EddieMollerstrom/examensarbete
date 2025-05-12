import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChartComponent({ recentLifts, exerciseName }) {
    const chartData = {
        labels: recentLifts.map((_, index) => `Set ${index + 1}`),
        datasets: [
            {
                label: `${exerciseName}`,
                data: recentLifts.slice().reverse().map(lift => lift.weight),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Vikt (kg)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Set'
                }
            }
        }
    };

    return (
        <div className="w-full h-64">
            <Line options={options} data={chartData} />
        </div>
    );
}
