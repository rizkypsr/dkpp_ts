<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /** Run the migrations. */
    public function up(): void
    {
        Schema::create('data_laporan_kurja', function (Blueprint $table) {
            $table->id();

            $table->string('kinerja')->nullable();
            $table->string('indikator')->nullable();
            $table->string('target')->nullable();
            $table->string('realisasi')->nullable();
            $table->double('capaian')->nullable();
            $table->text('penjelasan')->nullable();
            $table->text('alternatif')->nullable();

            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down(): void
    {
        Schema::dropIfExists('data_laporan_kurja');
    }
};
