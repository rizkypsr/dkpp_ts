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
        Schema::create('data_master', function (Blueprint $table) {
            $table->id();
            $table->boolean('feedback')->default(false);

            $table->foreignId('users_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('feedback_by')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_master');
    }
};
