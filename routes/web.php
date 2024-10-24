<?php

declare(strict_types=1);

use App\Http\Controllers\CetakLaporanController;
use App\Http\Controllers\DataMasterController;
use App\Http\Controllers\DataRenaksiController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\KeterkaitanKurjaController;
use App\Http\Controllers\KurjaController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\MonevRenaksiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RencanaAksiController;
use App\Http\Controllers\TribulanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('data-master', DataMasterController::class);
    Route::resource('jabatan', JabatanController::class);

    Route::get('data-laporan-renaksi/excel', [DataRenaksiController::class, 'export'])->name('data-laporan-renaksi.export');
    Route::resource('data-laporan-renaksi', DataRenaksiController::class);

    Route::resource('data-laporan-renaksi.tribulan', TribulanController::class);

    Route::resource('data-laporan-monev-renaksi', MonevRenaksiController::class);
    Route::resource('data-laporan-monev-renaksi.rencana-aksi', RencanaAksiController::class);

    Route::resource('data-laporan-kurja', KurjaController::class);
    Route::resource('data-laporan-kurja.keterkaitan-kurja', KeterkaitanKurjaController::class);

    Route::resource('laporan', LaporanController::class);

    Route::get('cetak-laporan/excel', [CetakLaporanController::class, 'export'])->name('cetak-laporan.export');
    Route::get('cetak-laporan', [CetakLaporanController::class, 'index'])->name('cetak-laporan.index');
});

require __DIR__.'/auth.php';
