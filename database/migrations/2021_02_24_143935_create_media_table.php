<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->text('path');
            $table->enum('type', ['pdf', 'video']);

            $table->string('name');
            // 
            $table->unsignedBigInteger('likes')->default(0);
            $table->unsignedBigInteger('shares')->default(0);
            $table->unsignedBigInteger('comments')->default(0);
            $table->unsignedBigInteger('views')->default(0);
            // 
            $table->unsignedBigInteger('user_open')->default(0);
            $table->unsignedBigInteger('user_bounce')->default(0);
            $table->unsignedBigInteger('user_engage')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('media');
    }
}
