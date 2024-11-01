import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const { chartData, rencanaAksiData, kurjaData } = usePage().props;

    const labels = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const data = Object.values(chartData);

    const chartConfig = {
        labels: labels,
        datasets: [
            {
                label: 'Jumlah Dokumen Ter Upload',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true, // Ensure the axis starts at zero
                ticks: {
                    stepSize: 1, // Set the interval to 1 to show only whole numbers
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null; // Only show whole numbers
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Jumlah Dokumen Ter Upload per Bulan',
            },
        },
    };

    const rencanaAksiConfig = {
        labels: rencanaAksiData.map(item => item.rencanaAksi),
        datasets: [
            {
                label: 'Capaian',
                data: rencanaAksiData.map(item => item.capaian),
                backgroundColor: 'rgba(53, 162, 235, 0.2)',
                borderColor: 'rgba(53, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    }

    const rencanaAksiOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10,
                    callback: function (value) {
                        return value + '%';
                    }
                }
            },
            x: {
                ticks: {
                    callback: function (value, index) {
                        const label = rencanaAksiConfig.labels[index];
                        return label.length > 10 ? label.slice(0, 20) + '...' : label;
                    }
                },
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Capaian Kinerja Pada Laporan Monev Renaksi'
            },
        },
    };


    const kurjaChartConfig = {
        labels: kurjaData.map(item => item.kinerja),
        datasets: [
            {
                label: 'Capaian',
                data: kurjaData.map(item => item.capaian),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    }

    const kurjaOptions = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    callback: function (value, index) {
                        const label = kurjaChartConfig.labels[index];
                        return label.length > 10 ? label.slice(0, 30) + '...' : label;
                    }
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10,
                    callback: function (value) {
                        return value + '%';
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: { display: true, text: 'Capaian Kinerja Pada Laporan Kurja' },
        },
    };


    return (
        <AuthenticatedLayout header="Dashboard">
            <div className="max-w-4xl mx-auto mb-20">
                <Bar data={chartConfig} options={options} />
            </div>

            <div className="max-w-4xl mx-auto overflow-x-auto mb-20">
                <div className="min-w-96">
                    <Bar data={kurjaChartConfig} options={kurjaOptions} />
                </div>
            </div>

            <div className="max-w-4xl mx-auto overflow-x-auto">
                <div className="min-w-96">
                    <Bar data={rencanaAksiConfig} options={rencanaAksiOptions} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
