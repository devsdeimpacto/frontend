import React from 'react';
import { Box, Typography } from '@mui/material';
import Chart from 'react-apexcharts';

const DonutChart = () => {
    
    const chartSeries = [ 44, 55, 13, 43, 25 ];
    const labels = [ 'Plásticos', 'Vidro', 'Papel', 'Metais', 'Eletronicos' ];
    const colors = [ 'blue', 'yellow', 'orange', 'black', 'brown' ];

    const chartOptions = {
        chart: {
            type: 'donut',
            toolbar: { show: false },
        },
        labels,
        colors,
        legend: {
            show: false, // 🔹 vamos renderizar os labels e totais manualmente
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '14px',
                            color: '#666',
                            offsetY: -10,
                        },
                        value: {
                            show: true,
                            fontSize: '24px',
                            fontWeight: 700,
                            color: '#222',
                            offsetY: 10,
                            formatter: (val) => val,
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            color: '#888',
                            fontSize: '16px',
                            formatter: function (w) {
                                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return total;
                            },
                        },
                    },
                },
            },
        },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
    };

    return (
        <Box textAlign="center">
            <Box display="flex" justifyContent="center" alignItems="center" mb={2} flexWrap="wrap">
                { labels.map((label, i) => (
                    <Box key={i} textAlign="center" mx={2}>
                        <Box display="flex" alignItems="center" justifyContent="center" mb={0.5}>
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    backgroundColor: colors[i],
                                    mr: 1,
                                }}
                            />
                            <Typography variant="body2" sx={{ color: '#333' }}>
                                { label } ({ chartSeries[i] })
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ color: '#222' }}>
                            { chartSeries[i] }
                        </Typography>
                    </Box>
                )) }
            </Box>

            <Chart options={chartOptions} series={chartSeries} type="donut" height={300} />
        </Box>
    );
};

export default DonutChart;