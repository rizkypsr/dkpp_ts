<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Kurja;
use App\Models\Laporan;
use App\Models\RencanaAksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $currentYear = date('Y');
        $startYear = $currentYear - 5;

        $selectedYear = $request->input('year', $currentYear);

        $counts = Laporan::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', $selectedYear)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->pluck('count', 'month');

        // Step 2: Initialize an array for all 12 months with count 0
        $allMonths = array_fill(1, 12, 0);

        // Step 3: Merge counts into allMonths, replacing 0 with actual counts where available
        foreach ($counts as $month => $count) {
            $allMonths[$month] = $count;
        }

        $rencanaAksiData = RencanaAksi::with('monevRenaksi')
            ->whereYear('created_at', $selectedYear)
            ->get()
            ->map(function ($item) {
                return [
                    'rencanaAksi' => $item->rencana_aksi . '(' . $item->monevRenaksi->kinerja . ')',
                    'capaian' => $item->capaian,
                ];
            });

        $kurjaData = Kurja::whereYear('created_at', $selectedYear)
            ->get()
            ->map(function ($item) {
                return [
                    'kinerja' => $item->kinerja,
                    'capaian' => $item->capaian,
                ];
            });

        $availableYears = range($startYear, $currentYear);

        return Inertia::render('Dashboard', [
            'chartData' => $allMonths,
            'rencanaAksiData' => $rencanaAksiData,
            'kurjaData' => $kurjaData,
            'selectedYear' => $selectedYear,
            'availableYears' => array_reverse($availableYears),
        ]);
    }
}
