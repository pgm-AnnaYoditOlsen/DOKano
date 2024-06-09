<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\CalculatePriceController;
use App\Http\Controllers\AvailableDaysController;
use App\Http\Controllers\TimeCheckerController;
use App\Http\Controllers\MollieController;

use App\Http\Controllers\GoogleSpreedSheetController;
Route::get('/test', [GoogleSpreedSheetController::class, 'index']);


Route::post('/submit_form', [FormSubmissionController::class, 'submitForm']);
Route::get('/api/check_availability', [FormSubmissionController::class, 'checkAvailability']);
Route::post('/calculate-price', [CalculatePriceController::class, 'calculatePrice']);
Route::get('/get-available-days', [AvailableDaysController::class, 'getAvailableDays']);
Route::get('/api/get_available_times', [TimeCheckerController::class, 'getAvailableTimes']);

Route::post('mollie', [MollieController::class, 'mollie'])->name('mollie');
Route::get('success', [MollieController::class, 'success'])->name('payment.success');
Route::get('cancel', [MollieController::class, 'cancel'])->name('payment.cancel');
Route::post('webhooks', [MollieController::class, 'webhooks'])
    ->withoutMiddleware([
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
    ])
    ->name('webhooks.mollie');

Route::post('/submit-booking', [GoogleSpreedSheetController::class, 'submitBooking']);
