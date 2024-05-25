<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Statamic\Facades\Taxonomy;

class TimeCheckerController extends Controller
{
    public function getAvailableTimes(Request $request)
    {
        try {
            $formule = $request->query('formula');
            
            // Find the taxonomy by handle
            $taxonomy = Taxonomy::findByHandle('formule_categories');
            
            // Check if the taxonomy is found
            if ($taxonomy) {
                // Query terms of the taxonomy by the formula slug
                $terms = $taxonomy->queryTerms()->where('slug', $formule)->get();
                
                // Check if any terms are found
                if ($terms->isNotEmpty()) {
                    // Get the first found term (assuming the formula is unique)
                    $term = $terms->first();
                    
                    // Get the times from the term
                    $times = $term->get('tijdstip') ?? [];
                    
                    // Return the times as JSON response
                    return response()->json($times);
                } else {
                    Log::error('No term found for category ' . $formule);
                    return response()->json(['error' => 'No times found'], 404);
                }
            } else {
                Log::error('Taxonomy not found');
                return response()->json(['error' => 'Taxonomy not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
