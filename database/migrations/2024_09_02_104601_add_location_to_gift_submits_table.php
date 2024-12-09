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
        Schema::table('gift_submits', function (Blueprint $table) {
            $table->string('location');
            $table->string('uploaded_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gift_submits', function (Blueprint $table) {
            $table->string('location');
            $table->string('uploaded_date');
        });
    }
};