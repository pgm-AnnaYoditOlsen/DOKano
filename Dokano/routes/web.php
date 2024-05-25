<?php

// routes/web.php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Statamic\Facades\Term;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\CalculatePriceController;
use App\Http\Controllers\AvailableDaysController;

Route::post('/calculate-price', [CalculatePriceController::class, 'calculatePrice']);
Route::get('/get-available-days', [AvailableDaysController::class, 'getAvailableDays']);

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

Route::get('/api/check_availability', [FormSubmissionController::class, 'checkAvailability']);
Route::post('/submit_form', [FormSubmissionController::class, 'submitForm']);
