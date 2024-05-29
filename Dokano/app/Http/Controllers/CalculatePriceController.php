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

        $taxonomy = Taxonomy::findByHandle('formule_categories');

        if ($taxonomy) {
            $termen = $taxonomy->queryTerms()->where('slug', $formule)->get();
        
            if ($termen->isNotEmpty()) {
                $categorieTerm = $termen->first();
        
                $categorieName = $categorieTerm->value('title');
                $priceAdult = $categorieTerm->get('price_adult');
                $priceChild = $categorieTerm->get('price_children');


                $totalPrice = $amountAdults * $priceAdult + $amountChildren * $priceChild;
                $formattedPrice = number_format($totalPrice, 2, '.', '');
                
                return response()->json(['totalPrice' => $formattedPrice]);

            } else {
                Log::error('Geen term gevonden voor categorie ' . $formule);
            }
        } else {
            Log::error('Taxonomie niet gevonden');
        }
    }
}
