<?php

namespace Jezzdk\StatamicGoogleMaps\Helpers;

use Illuminate\Support\Str;
use Statamic\Facades\Addon;

class MapHelper
{
    public static function defaultLatitude()
    {
        return config('google_maps.default_lat');
    }

    public static function defaultLongitude()
    {
        return config('google_maps.default_lng');
    }

    public static function googleMapsScriptUrl()
    {
        $params = [
            'callback' => 'Function.prototype',
            'libraries' => 'places',
            'key' => config('google_maps.api_key'),
        ];
        
        return 'https://maps.googleapis.com/maps/api/js?' . http_build_query($params);
    }

    public static function convertToHtml(array $params)
    {
        $addon = Addon::get('jezzdk/statamic-google-maps');

        // Generate a random ID for the map
        $id = Str::random();

        // Use some sensible defaults
        $params = array_merge([
            'width' => '100%',
            'height' => '100%',
            'markerLat' => null,
            'markerLng' => null,
            'icon' => $addon->edition() === 'pro' ? '/assets/marker.png' : null,
            'style' => null,
        ], $params);

        // Destruct the params array into variables
        [
            'lat' => $lat,
            'lng' => $lng,
            'zoom' => $zoom,
            'markerLat' => $markerLat,
            'markerLng' => $markerLng,
            'width' => $width,
            'height' => $height,
            'type' => $type,
            'icon' => $icon,
            'style' => $style,
            'showControls' => $showControls,
        ] = $params;

        // Return the HTML
        return '
        <div id="' . $id . '" style="width: ' . $width . '; height: ' . $height . ';"></div>
        <script>
        window.addEventListener("load", function() {
            let map = new google.maps.Map(document.getElementById("' . $id . '"), {
                center: { lat: ' . $lat. ', lng: ' . $lng . ' },
                zoom: ' . $zoom . ',
                disableDefaultUI: ' . (!empty($showControls) ? 'false' : 'true') . ',
                mapTypeId: "' . $type . '",
                styles: ' . ($style ?? '[]') . ',
            });
            ' . (isset($markerLat, $markerLng) ? '
            new google.maps.Marker({
                ' . (isset($icon) && is_file(public_path($icon)) ? '
                icon: {
                    url: "' . $icon . '"
                },
                ' : null) . '
                position: {
                    lat: ' . $markerLat . ',
                    lng: ' . $markerLng . ',
                },
                map: map,
            })
            ' : null) . '
        })
        </script>
        ';
    }
}
