<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Taxonomy;
use Statamic\Facades\Term;

class CalculatePriceController extends Controller
{
    public function calculateTotalPrice(Request $request)
    {
        $aantalVolwassenen = $request->input('aantal_volwassenen');
        $aantalKinderen = $request->input('aantal_kinderen');
        $formule = $request->input('formule');

        // Haal de formule term op uit de taxonomie
        $formuleTerm = Term::where('title', $formule)->first();

        if (!$formuleTerm) {
            return response()->json(['error' => 'Formule niet gevonden'], 404);
        }

        // Haal de prijzen op vanuit de formule
        $prijsPerVolwassene = $formuleTerm->get('price_adult');
        $prijsPerKind = $formuleTerm->get('prijs_children');

        // Bereken de totale prijs
        $totalPrice = ($aantalVolwassenen * $prijsPerVolwassene) + ($aantalKinderen * $prijsPerKind);

        return response()->json(['total_price' => $totalPrice]);
    }
}
