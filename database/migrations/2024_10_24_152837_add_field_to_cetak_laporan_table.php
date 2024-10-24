<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /** Run the migrations. */
    public function up(): void
    {
        Schema::table('cetak_laporan', function (Blueprint $table) {
            $table->string('nama_kepala_dinas')->after('name');
            $table->string('nip_kepala_dinas', 18);
            $table->string('pangkat_kepala_dinas');
            $table->string('jabatan_kepala_dinas');
            $table->string('unit_kerja_kepala_dinas');
        });
    }

    /** Reverse the migrations. */
    public function down(): void
    {
        Schema::table('cetak_laporan', function (Blueprint $table) {
            $table->dropColumn('nama_kepala_dinas');
            $table->dropColumn('nip_kepala_dinas');
            $table->dropColumn('pangkat_kepala_dinas');
            $table->dropColumn('jabatan_kepala_dinas');
            $table->dropColumn('unit_kerja_kepala_dinas');
        });
    }
};
