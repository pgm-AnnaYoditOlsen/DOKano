<?php

// routes/web.php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Statamic\Facades\Term;
use App\Http\Controllers\CalculatePriceController;
use App\Http\Controllers\AvailableDaysController;

Route::post('/calculate-price', [CalculatePriceController::class, 'calculatePrice']);
Route::get('/get-available-days', [AvailableDaysController::class, 'getAvailableDays']);

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

