<?php

declare(strict_types=1);

namespace App\Exports;

use App\Models\Renaksi;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class RenaksiExport implements FromView, ShouldAutoSize
{
    public function view(): View
    {
        $renaksi = Renaksi::with(['tribulan'])->get();

        return view('renaksi-excel', [
            'renaksiData' => $renaksi,
        ]);
    }
}
