<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use Mollie\Laravel\Facades\Mollie;
class MollieController extends Controller
{
    public function mollie(Request $request)
    {
        $payment = Mollie::api()->payments->create([
            "amount" => [
                "currency" => "EUR",
                "value" => $request->total_price , 
            ],
            "description" => $request->formule,
            "redirectUrl" => route('payment.success'),
            // "webhookUrl" => route('webhooks.mollie'),
            "metadata" => [
                "order_id" => time(),
            ],
        ]);

        // dd($payment);
        
        session()->put('paymentId', $payment->id);

        return redirect($payment->getCheckoutUrl(), 303);
    }

    public function success(Request $request)
    {
        $paymentId = session()->get('paymentId');
        $payment = Mollie::api()->payments->get($paymentId);
        if ($payment->isPaid())
        {
            $obj = new Payment();
            $obj->payment_id = $paymentId;
            $obj->payment_status = $payment->status;
            $obj->payment_method = $payment->method;
            echo 'Payment received. Thank you!';
        } else {
            return redirect()->route('cancel');
        }
    }

    public function cancel()
    {
        echo 'Payment cancelled';
    }
}
