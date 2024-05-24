<?php

// routes/web.php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Statamic\Facades\Term;
use App\Http\Controllers\FormSubmissionController;

Route::get('/api/check_availability', [FormSubmissionController::class, 'checkAvailability']);
Route::post('/submit_form', [FormSubmissionController::class, 'submitForm']);
