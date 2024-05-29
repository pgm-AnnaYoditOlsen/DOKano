<?php

// routes/web.php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Statamic\Facades\Term;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\CalculatePriceController;
use App\Http\Controllers\AvailableDaysController;
use App\Http\Controllers\TimeCheckerController;


Route::get('/api/get_available_times', [TimeCheckerController::class, 'getAvailableTimes']);
Route::post('/calculate-price', [CalculatePriceController::class, 'calculatePrice']);
Route::get('/get-available-days', [AvailableDaysController::class, 'getAvailableDays']);
Route::get('/api/check_availability', [FormSubmissionController::class, 'checkAvailability']);
Route::post('/submit_form', [FormSubmissionController::class, 'submitForm']);
