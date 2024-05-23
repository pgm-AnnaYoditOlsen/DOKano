<?php

// routes/web.php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Statamic\Facades\Term;
use App\Http\Controllers\CalculatePriceController;

Route::post('/calculate-price', [CalculatePriceController::class, 'calculatePrice']);

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

