<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CalculatePriceController;

Route::post('/calculate-total-price', [CalculatePriceController::class, 'calculateTotalPrice']);
// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);
