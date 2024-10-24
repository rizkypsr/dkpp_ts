<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /** Run the migrations. */
    public function up(): void
    {
        Schema::create('tribulan', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('tribulan');
            $table->text('rencana_aksi')->nullable();
            $table->string('target')->nullable();
            $table->boolean('feedback')->default(false);

            $table->foreignId('feedback_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('data_laporan_renaksi_id')->nullable()->constrained('data_laporan_renaksi')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down(): void
    {
        Schema::dropIfExists('tribulan');
    }
};
