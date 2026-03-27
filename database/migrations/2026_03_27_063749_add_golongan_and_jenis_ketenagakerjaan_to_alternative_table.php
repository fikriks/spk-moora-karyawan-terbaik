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
        Schema::table('alternative', function (Blueprint $table) {
            $table->string('golongan')->nullable()->after('jabatan');
            $table->string('jenis_ketenagakerjaan')->nullable()->after('golongan');
        });
    }

    public function down(): void
    {
        Schema::table('alternative', function (Blueprint $table) {
            $table->dropColumn(['golongan', 'jenis_ketenagakerjaan']);
        });
    }
};
