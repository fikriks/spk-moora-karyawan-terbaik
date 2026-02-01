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
        Schema::create('nilai', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alternative_id')
                ->constrained('alternative')
                ->cascadeOnDelete();

            $table->foreignId('criteria_id')
                ->constrained('criteria')
                ->cascadeOnDelete();

            $table->double('value');

            // mencegah duplikasi nilai alternatif-kriteria
            $table->unique(['alternative_id', 'criteria_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nilai');
    }
};