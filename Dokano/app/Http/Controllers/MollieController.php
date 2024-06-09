<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mollie\Laravel\Facades\Mollie;
use Statamic\Facades\Form;
use Statamic\Facades\Entry;
use Statamic\Facades\Taxonomy;
use Revolution\Google\Sheets\Facades\Sheets;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class MollieController extends Controller
{
    public function mollie(Request $request)
    {
        // Save the form submission data to the session
        session()->put('formData', $request->all());

        $price = $this->calculatePrice($request);
        // Log::info('Calculated price: ' . $price);

        if ($price < 1.00) { // Mollie minimum amount check
            $price = '1.00'; // Set to minimum allowed amount
        }

        $payment = Mollie::api()->payments->create([
            "amount" => [
                "currency" => "EUR",
                "value" => $price,
            ],
            "description" => $request->formule,
            "redirectUrl" => route('payment.success'),
            // "webhookUrl" => route('webhooks.mollie'),
            "metadata" => [
                "order_id" => time(),
                "data" => json_encode($request->all()),
            ],
        ]);

        // Save the form submission with status 'pending'
        $form = Form::find('boeking');
        $submission = $form->makeSubmission();
        $submission->data(array_merge($request->all(), [
            'payment_id' => $payment->id,
            'payment_status' => 'pending', // Initially set to pending
            'payment_method' => $payment->method,
        ]));
        $submission->save();

        session()->put('paymentId', $payment->id);

        return redirect($payment->getCheckoutUrl(), 303);
    }

    public function calculatePrice(Request $request)
    {
        $formule = $request->input('formule');
        $amountAdults = $request->input('aantal_volwassenen');
        $amountChildren = $request->input('aantal_kinderen');

        $taxonomy = Taxonomy::findByHandle('formule_categories');

        if ($taxonomy) {
            $termen = $taxonomy->queryTerms()->where('slug', $formule)->get();
            if ($termen->isNotEmpty()) {
                $categorieTerm = $termen->first();

                $categorieName = $categorieTerm->value('title');
                $priceAdult = $categorieTerm->get('price_adult');
                $priceChild = $categorieTerm->get('price_children');

                $totalPrice = $amountAdults * $priceAdult + $amountChildren * $priceChild;
                return number_format($totalPrice, 2, '.', '');
            } else {
                Log::error('Geen term gevonden voor categorie ' . $formule);
                return '0.00';
            }
        } else {
            Log::error('Taxonomie niet gevonden');
            return '0.00';
        }
    }

    public function webhooks(Request $request)
    {
        $paymentId = $request->id;
        $payment = Mollie::api()->payments->get($paymentId);

        $formData = json_decode($payment->metadata->data, true);

        if ($formData) {
            $form = Form::find('boeking');
            $submissions = $form->submissions()->filter(function($submission) use ($paymentId) {
                return $submission->get('payment_id') === $paymentId;
            });

            foreach ($submissions as $submission) {
                if ($payment->isPaid()) {
                    $submission->data(array_merge($submission->data(), [
                        'payment_status' => 'paid'
                    ]));
                } elseif ($payment->isFailed() || $payment->isExpired() || $payment->isCanceled()) {
                    return redirect()->route('payment.cancel')->with('error', 'Payment failed, expired or canceled.');
                }
                $submission->save();
            }
        }

        return response()->json('Webhook received', 200);
    }

    public function success(Request $request)
    {
        $paymentId = session()->get('paymentId');

        if (!$paymentId) {
            Log::error('Payment ID not found in session.');
            return redirect()->route('payment.cancel')->with('error', 'Payment ID not found.');
        }

        $payment = Mollie::api()->payments->get($paymentId);

        $formData = session()->get('formData', []);

        if (empty($formData)) {
            Log::error('Form data not found in session.');
            return redirect()->route('payment.cancel')->with('error', 'Form data not found.');
        }

        // Send the form data to the Google Spreadsheet
        $this->sendToSpreadsheet($formData);

        // Form submission is already created in mollie method, just return a success response here
        session()->forget('formData'); // Clear form data from session
        session()->forget('paymentId'); // Clear payment ID from session
        
        return redirect("/")->with('success', 'Payment received. Your order is pending.');
    }

    public function sendToSpreadsheet($formData)
    {
        $sheetName = 'Boekingen';
        $spreadsheetId = config('google.post_spreadsheet_id');
        
        // Headers die alleen één keer moeten worden toegevoegd
        $headers = ['Formule', 'Voornaam', 'Achternaam', 'Email', 'Telefoon', 'Datum', 'Tijd', 'Aantal volwassenen', 'Aantal kinderen', 'Aantal kano\'s', 'Type kano', 'Opmerkingen', 'Totaal prijs', 'Betalings status'];

        // Gegevensrij met formuliergegevens
        $rowData = [
            $formData['formule'] ?? '',
            $formData['voornaam'] ?? '',
            $formData['achternaam'] ?? '',
            $formData['email'] ?? '',
            $formData['telefoon'] ?? '',
            $formData['datum'] ?? '',
            $formData['tijd'] ?? '',
            $formData['aantal_volwassenen'] ?? '',
            $formData['aantal_kinderen'] ?? '',
            $formData['aantal_kanos'] ?? '',
            $formData['type_kano'] ?? '',
            $formData['opmerkingen'] ?? '',
            $formData['total_price'] ?? '',
            $formData['payment_status'] ?? '',
        ];

        // Controleer of er al gegevens in de sheet staan
        $existingData = Sheets::spreadsheet($spreadsheetId)
            ->sheet($sheetName)
            ->all();

        // Als de sheet leeg is (behalve de eerste rij met headers), voeg dan de headers toe
        if (empty($existingData) || count($existingData) === 0) {
            $sheetData = [
                $headers,
                $rowData,
            ];
        } else {
            $sheetData = [$rowData];
        }

        Sheets::spreadsheet($spreadsheetId)
            ->sheet($sheetName)
            ->append($sheetData);
    }

    public function cancel()
    {
        $paymentId = session()->get('paymentId');

        if ($paymentId) {
            $form = Form::find('boeking');
            $submissions = $form->submissions()->filter(function($submission) use ($paymentId) {
                return $submission->get('payment_id') === $paymentId;
            });

            foreach ($submissions as $submission) {
                $submission->delete();
            }

            session()->forget('paymentId');
            session()->forget('formData');
        }

        return response('Payment cancelled', 200);
    }
}
