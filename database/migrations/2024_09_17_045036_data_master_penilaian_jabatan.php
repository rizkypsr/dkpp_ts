<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /** Run the migrations. */
    public function up(): void
    {
        Schema::create('data_master_penilaian_jabatan', function (Blueprint $table) {
            $table->id();

            $table->foreignId('penilaian_ke_jabatan')->nullable()->constrained('jabatan')->nullOnDelete();
            $table->foreignId('data_master_id')->nullable()->constrained('data_master')->nullOnDelete();

            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down(): void
    {
        Schema::dropIfExists('data_master_penilaian_jabatan');
    }
};
