import React from 'react';
import Chart from 'react-apexcharts';

const LixoPorBairroChart = () => {

    const bairros = [ 'Centro', 'Jardim América', 'Boa Vista', 'Industrial' ];
    const chartSeries = [
        {
            name: 'Plástico',
            data: [ 120, 90, 45, 70 ],
        },
        {
            name: 'Vidro',
            data: [ 60, 40, 20, 35 ],
        },
        {
            name: 'Papel',
            data: [ 80, 55, 25, 60 ],
        },
        {
            name: 'Metais',
            data: [ 50, 35, 15, 25 ],
        },
        {
            name: 'Eletronicos',
            data: [ 200, 150, 120, 180 ],
        },
    ];

    const chartOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 4,
            },
        },
        colors: [ 'blue', 'yellow', 'orange', 'black', 'brown' ],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: [ 'transparent' ],
        },
        xaxis: {
            categories: bairros,
            labels: { rotate: -45 },
            title: {
                text: 'Bairros',
                style: { fontSize: '14px', fontWeight: 600 },
            },
        },
        yaxis: {
            title: {
                text: 'Quantidade (kg)',
                style: { fontSize: '14px', fontWeight: 600 },
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} kg`,
            },
        },
    };

    return (
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
    );
};

export default LixoPorBairroChart;