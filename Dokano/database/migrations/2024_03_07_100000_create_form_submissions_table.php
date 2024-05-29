<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Statamic\Eloquent\Database\BaseMigration as Migration;

return new class extends Migration
{
    public function up()
    {
        Schema::create($this->prefix('form_submissions'), function (Blueprint $table) {
            $table->id();
            $table->string('form', 30)->nullable()->index();
            $table->jsonb('data')->nullable();
            $table->string('payment_id', 45)->nullable()->index();
            $table->string('payment_status', 20)->nullable()->index();
            $table->string('payment_method', 50)->nullable()->index();

            $table->timestamps(6);

            $table->unique(['form', 'created_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists($this->prefix('form_submissions'));
    }
};
