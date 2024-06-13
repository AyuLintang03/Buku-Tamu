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
        Schema::create('buku_tamus', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('nik')->nullable();
            $table->string('tujuan')->nullable(); 
            $table->string('keperluan')->nullable();
            $table->date('tanggal')->nullable();
            $table->time('jam_masuk')->nullable();
            $table->time('jam_keluar')->nullable();
            $table->string('alamat')->nullable();
            $table->string('no_tlp_tamu')->nullable();
            $table->enum('status', ['Tunda', 'Selesai','Proses'])->nullable();
             $table->foreignId('user_id')->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buku_tamus');
    }
};
