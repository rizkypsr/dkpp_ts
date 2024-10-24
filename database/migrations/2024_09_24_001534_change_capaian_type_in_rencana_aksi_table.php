<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /** Run the migrations. */
    public function up(): void
    {
        Schema::table('rencana_aksi', function (Blueprint $table) {
            $table->double('capaian')->nullable()->change();
        });
    }

    /** Reverse the migrations. */
    public function down(): void
    {
        Schema::table('rencana_aksi', function (Blueprint $table) {
            $table->string('capaian')->nullable()->change();
        });
    }
};
