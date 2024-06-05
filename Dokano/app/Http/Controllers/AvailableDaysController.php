<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Statamic\Facades\Taxonomy;
use Statamic\Facades\Term;

class AvailableDaysController extends Controller
{
    public function getAvailableDays(Request $request)
    {
        $taxonomy = Taxonomy::findByHandle('formule_categories');
        $terms = $taxonomy->queryTerms()->get();

        $allAvailableDates = [];

        if ($terms->isNotEmpty()) {
            foreach ($terms as $term) {
                $title = $term->title;
                $days = $term->get('available_days') ?? [];
                $fixedDays = $term->get('fixed_days') ?? [];
                Log::info('Vaste dagen', $fixedDays);

                $availableDates = [];
                foreach ($days as $item) {
                    $datum = $item['date'];
                    if ($datum && Carbon::createFromFormat('Y-m-d', $datum)->isFuture()) {
                        $formattedDate = Carbon::createFromFormat('Y-m-d', $datum)->format('d-m-Y');
                        $availableDates[] = $formattedDate;
                    }
                }

                $allAvailableDates[$title] = [
                    'availableDates' => $availableDates,
                    'fixedDays' => $fixedDays
                ];
            }

            Log::info('Beschikbare datums per categorie', $allAvailableDates);
            return response()->json($allAvailableDates);
        } else {
            Log::info('Geen termen gevonden.');
            return response()->json([]);
        }
    }
}