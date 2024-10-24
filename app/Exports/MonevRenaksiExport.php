<?php

namespace App\Exports;

use App\Models\Kurja;
use App\Models\MonevRenaksi;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class MonevRenaksiExport implements WithMultipleSheets
{
    use Exportable;

    protected $requestData;

    public function __construct($requestData)
    {
        $this->requestData = $requestData;
    }

    public function sheets(): array
    {
        $sheets = [];

        $sheets[] = new MonevSheet($this->requestData, 'Monev Renaksi');
        $sheets[] = new KurjaSheet($this->requestData, 'Kurja');

        return $sheets;
    }
}

class MonevSheet implements FromView, ShouldAutoSize, WithStyles, WithColumnWidths, WithTitle
{
    protected $requestData;
    protected $sheetName;

    public function __construct($requestData, $sheetName)
    {
        $this->requestData = $requestData;
        $this->sheetName = $sheetName;
    }


    /**
     * @return string
     */
    public function title(): string
    {
        return $this->sheetName;
    }

    public function view(): View
    {
        $monevRenaksi = MonevRenaksi::with(['rencanaAksi'])->get();

        return view('renaksi-excel', [
            'monevRenaksi' => $monevRenaksi,
            'name' => $this->requestData['name'],
            'nip' => $this->requestData['nip'],
        ]);
    }

    public function columnWidths(): array
    {
        return [
            'A' => 4,
            'E' => 30,
            'F' => 30,
            'G' => 30,
            'H' => 30,
            'I' => 30,
            'J' => 30,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('B')->getAlignment()->setWrapText(true);
        $sheet->getStyle('C')->getAlignment()->setWrapText(true);
        $sheet->getStyle('E')->getAlignment()->setWrapText(true);
        $sheet->getStyle('I')->getAlignment()->setWrapText(true);
        $sheet->getStyle('J')->getAlignment()->setWrapText(true);
    }
}

class KurjaSheet implements FromView, ShouldAutoSize, WithStyles, WithColumnWidths, WithTitle, WithColumnFormatting
{
    protected $requestData;
    protected $sheetName;

    public function __construct($requestData, $sheetName)
    {
        $this->requestData = $requestData;
        $this->sheetName = $sheetName;
    }


    /**
     * @return string
     */
    public function title(): string
    {
        return $this->sheetName;
    }

    public function view(): View
    {
        $kurja = Kurja::with(['keterkaitanKurja'])->get();

        return view('kurja-excel', [
            'kurja' => $kurja,
            'name' => $this->requestData['name'],
            'nip' => $this->requestData['nip'],
        ]);
    }

    public function columnWidths(): array
    {
        return [
            'A' => 4,
            'D' => 30,
            'E' => 30,
            'F' => 30,
            'H' => 30,
            'I' => 30,
            'J' => 30,
            'K' => 30,
            'L' => 30,
            'M' => 30,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('H')->getAlignment()->setWrapText(true);
        $sheet->getStyle('L')->getAlignment()->setWrapText(true);
        $sheet->getStyle('M')->getAlignment()->setWrapText(true);
    }

    public function columnFormats(): array
    {
        return [
            'F' => NumberFormat::FORMAT_PERCENTAGE_0,
            'I' => NumberFormat::FORMAT_ACCOUNTING_USD,
            'J' => NumberFormat::FORMAT_ACCOUNTING_USD,
            'K' => NumberFormat::FORMAT_PERCENTAGE_0,
        ];
    }
}
