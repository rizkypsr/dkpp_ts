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
        Schema::table('keterkaitan_kurja', function (Blueprint $table) {
            $table->string('feedback')->nullable();

            $table->foreignId('feedback_by')->nullable()->constrained('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('keterkaitan_kurja', function (Blueprint $table) {
            $table->dropColumn('feedback');
            $table->dropForeign(['feedback_by']);
        });
    }
};
