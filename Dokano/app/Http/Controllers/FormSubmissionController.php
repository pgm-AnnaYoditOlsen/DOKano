<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Entry;
use Illuminate\Support\Facades\Log;
use Statamic\Facades\FormSubmission;

class FormSubmissionController extends Controller
{
    public function checkAvailability(Request $request)
    {
        try {
            $date = $request->query('date');
            $time = $request->query('time');

            // Log::info('Checking availability for date: ' . $date . ' and time: ' . $time);

            // Fetch all form submissions for the specific date and time
            $formSubmissions = FormSubmission::query()
                ->where('form', 'boeking')
                ->where('datum', $date)
                ->where('tijd', $time)
                ->get();

            // Log::info('Query executed:');
            // Log::info('Form submissions for date ' . $date . ' and time ' . $time . ': ' . $formSubmissions->count());

            // Fetch all canoes
            $canoes = Entry::query()
                ->where('collection', 'kanos')
                ->get();
            // Log::info('Total canoe types: ' . $canoes->count());

            $availability = [];

            foreach ($canoes as $canoe) {
                $canoeType = $canoe->get('title');
                $totalAvailable = $canoe->get('amount');
                // Log::info('Canoe type: ' . $canoeType . ', Total available: ' . $totalAvailable);

                // Calculate total used canoes for this type and date and time
                $totalUsed = $formSubmissions->filter(function ($submission) use ($canoeType) {
                    $submissionData = $submission->data();
                    // isset is used to avoid errors when the 'type_kano' field is not set
                    return isset($submissionData['type_kano']) && $submissionData['type_kano'] === $canoeType;
                })->sum(function ($submission) {
                    $submissionData = $submission->data();
                    $used = isset($submissionData['aantal_kanos']) ? $submissionData['aantal_kanos'] : 0;
                    // Log::info('Submission ID: ' . $submission->id() . ', Canoe type: ' . $submissionData['type_kano'] . ', Used: ' . $used);
                    return $used; // Use the 'aantal_kanos' field directly
                });

                // Log::info('Canoe type: ' . $canoeType . ', Total used: ' . $totalUsed);

                $availability[$canoeType] = $totalAvailable - $totalUsed;
                // Log::info('Canoe type: ' . $canoeType . ', Available: ' . $availability[$canoeType]);
            }

            $response = response()->json($availability);
            // Log::info('Response: ' . $response->getContent());
            return $response;
        } catch (\Exception $e) {
            // Log::error('Error checking availability: ' . $e->getMessage());
            return response()->json(['error' => 'Error checking availability'], 500);
        }
    }

    public function submitForm(Request $request)
    {
        try {
            $data = $request->all();
            Log::info('Submitting form with data: ' . json_encode($data));

            // Save the form submission
            FormSubmission::make()
                ->where('form', 'boeking')
                ->data($data)
                ->save();


            return response();
        } catch (\Exception $e) {
            Log::error('Error submitting form: ' . $e->getMessage());
            Log::error('Request Data: ' . json_encode($request->all()));
            return response()->json(['error' => 'Error submitting form'], 500);
        }
    }
}
