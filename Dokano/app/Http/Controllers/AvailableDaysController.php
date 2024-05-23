<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use Statamic\Facades\Taxonomy;
use Statamic\Facades\Term;

class AvailableDaysController extends Controller
{
    public function getAvailableDays(Request $request)
    {
        $formule = $request->input('formule');
        $cacheKey = 'available_days_' . $formule;

        $availableDates = Cache::remember($cacheKey, 60, function () use ($formule) {
            $taxonomy = Taxonomy::findByHandle('formule_categories');
            $termen = $taxonomy->queryTerms()->where('slug', $formule)->get();

            if ($termen->isNotEmpty()) {
                $categoryTerm = $termen->first();
                $days = $categoryTerm->get('available_days') ?? [];

                $availableDates = [];
                foreach ($days as $item) {
                    $datum = $item['date'];
                    if ($datum) {
                        $formattedDate = Carbon::createFromFormat('Y-m-d', $datum)->format('d-m-Y');
                        $availableDates[] = $formattedDate;
                    }
                }
                return $availableDates;
            } else {
                return [];
            }
        });

        Log::info('Beschikbare datums voor categorie ' . $formule, $availableDates);

        return response()->json($availableDates);
    }
}