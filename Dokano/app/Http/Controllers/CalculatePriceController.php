<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Statamic\Facades\Taxonomy;
use Statamic\Facades\Term;
use Illuminate\Support\Str;

class CalculatePriceController extends Controller
{
    public function calculatePrice(Request $request)
    {
        $formule = $request->input('formule');
        $amountAdults = $request->input('amountAdults');
        $amountChildren = $request->input('amountChildren');

        // Haal de taxonomie op
        $taxonomy = Taxonomy::findByHandle('formule_categories');

        // Controleer of de taxonomie correct is opgehaald
        if ($taxonomy) {
            // Query de termen van de taxonomie
            $termen = $taxonomy->queryTerms()->where('slug', $formule)->get();
        
            // Controleer of er termen zijn gevonden
            if ($termen->isNotEmpty()) {
                // Haal de eerste gevonden term op (aannemende dat formule uniek is)
                $categorieTerm = $termen->first();
        
                // Haal de prijsinformatie op uit de term
                $categorieName = $categorieTerm->value('title');
                $priceAdult = $categorieTerm->get('price_adult');
                $priceChild = $categorieTerm->get('price_children');

                // Bereken de totaalprijs
                $totalPrice = $amountAdults * $priceAdult + $amountChildren * $priceChild;

                // Stuur de totaalprijs terug als JSON-respons
                return response()->json(['totalPrice' => $totalPrice]);

            } else {
                Log::error('Geen term gevonden voor categorie ' . $formule);
            }
        } else {
            Log::error('Taxonomie niet gevonden');
        }
    }
}
