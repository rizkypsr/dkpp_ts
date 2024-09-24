<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('keterkaitan_kurja', function (Blueprint $table) {
            $table->id();

            $table->string('program')->nullable();
            $table->decimal('anggaran', 13, 2)->nullable();
            $table->decimal('realisasi_rupiah', 13, 2)->nullable();
            $table->decimal('realisasi_persentase')->nullable();

            $table->foreignId('data_laporan_kurja_id')->constrained('data_laporan_kurja')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keterkaitan_kurja');
    }
};
