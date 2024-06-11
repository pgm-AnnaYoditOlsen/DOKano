<?php

namespace Nomala\StatamicGooglePlaces;

use Exception;
use SKAgarwal\GoogleApi\PlacesApi;

class GooglePlaces
{
    /**
     * The PlacesApi object
     *
     * @var SKAgarwal\GoogleApi\PlacesApi
     */
    protected $placeApi;

    /**
     * The Google place API photo URL
     *
     * @var string
     */
    protected $photoUrl = 'https://maps.googleapis.com/maps/api/place/photo';

    /**
     * Request constructor.
     */
    public function __construct()
    {
        if (!config()->has('statamic.places.gmap_api_key') || !config('statamic.places.gmap_api_key')) {
            return 'Please add a Google Maps API key in config [statamic.places.gmap_api_key]';
        }

        $this->placeApi = new PlacesApi(config('statamic.places.gmap_api_key'));
    }

    /**
     * Get photos for a place.
     *
     * @param $place
     *
     * @return \Illuminate\Support\Collection|null
     */
    public function getPhotos($place)
    {
        $photos = [];

        $placeIds = $this->findPlace($place, 'textquery');

        if (!($placeIds) || is_string($placeIds)) {
            return $placeIds;
        }

        foreach ($placeIds as $placeId) {
            $placeDetails = $this->placeApi->placeDetails($placeId['place_id']);

            if (!$placeDetails) {
                continue;
            }

            $placePhotos = $placeDetails->all()['result']['photos'] ?? [];

            foreach ($placePhotos as $placePhoto) {
                $photos[] = [
                    'photo' => $placePhoto['photo_reference'],
                    'photoUrl' => $this->photoUrl . '?photoreference=' . $placePhoto['photo_reference']
                        . '&key=' . config('statamic.places.gmap_api_key') . '&maxheight=1000&maxwidth=600'
                ];
            }
        }

        return collect($photos);
    }

    /**
     * Search for places within a specified area.
     *
     * @param string $location
     * @param int $radius
     * @param array|string $parameters
     *
     * @return \Illuminate\Support\Collection|null
     */
    public function nearbySearch($location, $radius = 500, $parameters = [])
    {
        $parameters = $this->prepareParameters($parameters);

        try {
            $places = $this->placeApi->nearbySearch($location, $radius, $parameters);

            if (!isset($places->all()['results']) || !$places->all()['results']->count()) {
                return null;
            }

            return collect($places->all()['results']->all());
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Find a place from search string.
     *
     * @param string $input
     * @param string $inputType (textquery or phonenumber)
     * @param array|string $parameters
     *
     * @return \Illuminate\Support\Collection|null
     */
    public function findPlace($input, $inputType, $parameters = [])
    {
        $inputType = $inputType ?: 'textquery';
        $parameters = $this->prepareParameters($parameters);

        try {
            $places = $this->placeApi->findPlace($input, $inputType, $parameters);

            if (!$places->get('candidates')->count()) {
                return null;
            }
    
            return collect(array_values($places->get('candidates')->all()));
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Return a place details.
     *
     * @param string $placeId
     *
     * @return \Illuminate\Support\Collection|null
     */
    public function placeDetails($placeId, $parameters = [])
    {
        $parameters = $this->prepareParameters($parameters);

        try {
            $places = $this->placeApi->placeDetails($placeId, $parameters);

            if (!count($places->get('result'))) {
                return null;
            }

            return collect($places->get('result'));
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Prepare the parameters.
     *
     * @param $parameters
     *
     * @return mixed
     */
    private function prepareParameters($parameters)
    {
        $return = [];

        if (is_string($parameters) == false || $parameters == '') {
            return [];
        }

        $parameters = explode('&', $parameters);

        if (count($parameters)) {
            foreach ($parameters as $parameter) {
                $data = explode('=', $parameter);
                if (isset($data[0]) && !empty($data[0]) && isset($data[1]) && !empty($data[1])) {
                    $return[$data[0]] = $data[1];
                }
            }
        }
        
        return $return;
    }
}
