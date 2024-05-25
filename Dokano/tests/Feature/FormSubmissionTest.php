<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\FormSubmission;

class FormSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_count_kanos_by_date()
    {
        // Seed the database with test data
        FormSubmission::create(['data' => [
            'formule' => 'jeugdbeweging',
            'datum' => '2024-05-15',
            'aantal_volwassenen' => 8,
            'aantal_kinderen' => 10,
            'type_kano' => 'Groene Kano',
            'opmerkingen' => 'cxxxc',
            'voornaam' => 'dries',
            'achternaam' => 'dhondt',
            'email' => 'dries@out.be',
            'telefoon' => '0460977801'
        ]]);

        FormSubmission::create(['data' => [
            'formule' => 'jeugdbeweging',
            'datum' => '2024-05-21',
            'aantal_volwassenen' => 6,
            'aantal_kinderen' => 8,
            'type_kano' => 'Groene Kano',
            'opmerkingen' => 'cddcds',
            'voornaam' => 'dssd',
            'achternaam' => 'dsds',
            'email' => 'DriesSchool@outlook.com',
            'telefoon' => '0460977801'
        ]]);

        FormSubmission::create(['data' => [
            'formule' => 'scholen',
            'datum' => '2024-05-16',
            'aantal_volwassenen' => 11,
            'aantal_kinderen' => 8,
            'type_kano' => 'Gele Kano',
            'opmerkingen' => 'dsdqdsd',
            'voornaam' => 'dries',
            'achternaam' => 'dsds',
            'email' => 'dries@out.be',
            'telefoon' => '0460977801'
        ]]);

        // Call the endpoint
        $response = $this->get('/count-kanos');

        // Output the response content for debugging
        if ($response->status() !== 200) {
            dd($response->content());
        }

        // Assert the response
        $response->assertStatus(200);
        $response->assertJson([
            '2024-05-15' => 18,
            '2024-05-21' => 14,
            '2024-05-16' => 19,
        ]);
    }
}