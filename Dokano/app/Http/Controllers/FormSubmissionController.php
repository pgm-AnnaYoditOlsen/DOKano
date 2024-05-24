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
            Log::info('Checking availability for date: ' . $date);

            // Fetch all form submissions for the specific date
            $formSubmissions = FormSubmission::query()
            ->where('form', 'boeking')
            ->where('datum', $date)
            ->get();

            Log::info('Query executed:');
            Log::info('Form submissions for date ' . $date . ': ' . $formSubmissions->count());

            foreach ($formSubmissions as $submission) {
                Log::info('Submission Data: ' . json_encode($submission->data()));
            }

            // Fetch all canoes
            $canoes = Entry::query()
                ->where('collection', 'kanos')
                ->get();
            Log::info('Total canoe types: ' . $canoes->count());

            $availability = [];

            foreach ($canoes as $canoe) {
                $canoeType = $canoe->get('title');
                $totalAvailable = $canoe->get('amount');
                Log::info('Canoe type: ' . $canoeType . ', Total available: ' . $totalAvailable);

                // Calculate total used canoes for this type and date
                $totalUsed = $formSubmissions->filter(function ($submission) use ($canoeType) {
                    $submissionData = $submission->data();
                    return isset($submissionData['type_kano']) && $submissionData['type_kano'] === $canoeType;
                })->sum(function ($submission) {
                    $submissionData = $submission->data();
                    $used = (isset($submissionData['aantal_volwassenen']) ? $submissionData['aantal_volwassenen'] : 0)
                        + (isset($submissionData['aantal_kinderen']) ? $submissionData['aantal_kinderen'] : 0);
                    Log::info('Submission ID: ' . $submission->id() . ', Canoe type: ' . $submissionData['type_kano'] . ', Used: ' . $used);
                    return 1; // Assuming each booking uses one canoe
                });

                Log::info('Canoe type: ' . $canoeType . ', Total used: ' . $totalUsed);

                $availability[$canoeType] = $totalAvailable - $totalUsed;
                Log::info('Canoe type: ' . $canoeType . ', Available: ' . $availability[$canoeType]);
            }

            return response()->json($availability);
        } catch (\Exception $e) {
            Log::error('Error checking availability: ' . $e->getMessage());
            return response()->json(['error' => 'Error checking availability'], 500);
        }
    }

    public function submitForm(Request $request)
    {
        try {
            $data = $request->all();
            Log::info('Submitting form with data: ' . json_encode($data));

            // Save the form submission
            Entry::make()
                ->collection('boeking')
                ->data($data)
                ->save();

            return response()->json(['message' => 'Form submitted successfully']);
        } catch (\Exception $e) {
            Log::error('Error submitting form: ' . $e->getMessage());
            Log::error('Request Data: ' . json_encode($request->all()));
            return response()->json(['error' => 'Error submitting form'], 500);
        }
    }
}
