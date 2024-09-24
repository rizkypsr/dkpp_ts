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
        Schema::create('rencana_aksi', function (Blueprint $table) {
            $table->id();
            $table->text('rencana_aksi')->nullable();
            $table->string('target')->nullable();
            $table->string('realisasi')->nullable();
            $table->string('capaian')->nullable();
            $table->text('catatan')->nullable();
            $table->text('tindak_lanjut')->nullable();
            $table->string('bukti_pendukung')->nullable();
            $table->string('feedback')->nullable();

            $table->foreignId('feedback_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('data_laporan_monev_renaksi_id')->constrained('data_laporan_monev_renaksi')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rencana_aksi');
    }
};
