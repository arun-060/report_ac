import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./PieChart.css"; // Assuming you have a PieChart.css file

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Distribution of Activities', // Generic title
        },
    },
};

function PieChart({ activities }) {
    // Function to categorize activities based on type (optional)
    const categorizeActivities = (activities) => {
        const categories = {
            Educational: 0,
            Sports: 0,
            Internships: 0,
            Others: 0,
            Extracurricular: 0,
        };

        activities.forEach((activity) => {
            // Classify activity based on its name or description (modify as needed)
            const category = activity.name.toLowerCase().includes('educational')
                ? 'Educational'
                : activity.description.toLowerCase().includes('sport')
                    ? 'Sports'
                    : activity.description.toLowerCase().includes('intern')
                        ? 'Internships'
                        : 'Others'; // Default category

            categories[category]++;
        });

        return Object.entries(categories); // Return category-count pairs
    };

    // Prepare data based on activity categories or directly from activities
    const data = {
        labels: activities.length === 0 ? [] : activities.map((activity) => activity.name), // Use activity names for labels if no categories
        datasets: [
            {
                label: 'Activities Distribution',
                data: activities.length === 0 ? [] : (
                    activities.map((activity) => 1) // Use 1 for equal emphasis if no categories or counts
                ),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // If you want pie charts for individual activities (more complex):
    if (activities.length > 0) {
        return activities.map((activity, index) => (
            <div key={index} className="piechart-container">
                <h2>{activity.name}</h2>
                <Pie data={data} options={options} />
            </div>
        ));
        
    } else {
        return <p>No activities found.</p>;
    }
}

export default PieChart;