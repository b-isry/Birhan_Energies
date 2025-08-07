import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const PriceChart = () => {
    const [data, setData] = useState({ prices: [], events: [], change_points: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the Flask backend API
        axios.get('http://127.0.0.1:5000/api/data')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []); // Empty array ensures this runs only once on component mount

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div style={{ width: '100%', height: 600 }}>
            <h2>Brent Oil Price History & Key Events</h2>
            <ResponsiveContainer>
                <LineChart
                    data={data.prices}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis domain={['auto', 'auto']} label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} name="Brent Price" />
                    
                    {/* Map over the change points to draw vertical reference lines */}
                    {data.change_points.map(point => (
                        <ReferenceLine 
                            key={point.date} 
                            x={point.date} 
                            stroke="red" 
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            label={{ value: point.label, position: 'top', fill: 'red' }} 
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;