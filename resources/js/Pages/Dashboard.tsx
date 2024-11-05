import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, usePage } from "@inertiajs/react";
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

type RencanaAksi = {
    rencanaAksi: string;
    capaian: number;
}

type Kurja = {
    kinerja: string;
    capaian: number;
}

type DashboardProps = {
    chartData: Record<number, number>;
    rencanaAksiData: RencanaAksi[];
    kurjaData: Kurja[];
    selectedYear: number;
    availableYears: number[];
}

export default function Dashboard({
    chartData,
    rencanaAksiData,
    kurjaData,
    selectedYear,
    availableYears
}: DashboardProps) {

    const labels = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const data = Object.values(chartData as Record<string, number>);

    const chartConfig = {
        labels: labels,
        datasets: [
            {
                label: 'Jumlah Dokumen Laporan Ter Upload',
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
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    callback: function (value: unknown) {
                        return Number.isInteger(value) ? value : null;
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
        // @ts-ignore
        labels: rencanaAksiData.map(item => item.rencanaAksi),
        datasets: [
            {
                label: 'Capaian',
                // @ts-ignore
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
                    // @ts-ignore
                    callback: function (value) {
                        return value + '%';
                    }
                }
            },
            x: {
                ticks: {
                    // @ts-ignore
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
        // @ts-ignore
        labels: kurjaData.map(item => item.kinerja),
        datasets: [
            {
                label: 'Capaian',
                // @ts-ignore
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
                    // @ts-ignore
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
                    // @ts-ignore
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

    const handleYearChange = (value: string) => {
        router.get(route('dashboard'), {
            year: value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout header="Dashboard">
            <div className="w-[180px] mt-8 mb-12">
                <Label>Tahun</Label>
                <Select
                    defaultValue={selectedYear.toString()}
                    onValueChange={handleYearChange}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableYears.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="max-w-4xl mx-auto overflow-x-auto mb-20">
                <div className="min-w-96">
                    <Bar data={rencanaAksiConfig} options={rencanaAksiOptions} />
                </div>
            </div>

            <div className="max-w-4xl mx-auto overflow-x-auto mb-20">
                <div className="min-w-96">
                    <Bar data={kurjaChartConfig} options={kurjaOptions} />
                </div>
            </div>


            <div className="max-w-4xl mx-auto">
                {/* @ts-ignore */}
                <Bar data={chartConfig} options={options} />
            </div>
        </AuthenticatedLayout>
    );
}
