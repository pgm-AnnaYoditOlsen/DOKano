<?php

namespace Jezzdk\StatamicGoogleMaps\Fieldtypes;

use Jezzdk\StatamicGoogleMaps\Helpers\MapHelper;
use Statamic\Facades\Addon;
use Statamic\Fields\Fieldtype;

class GoogleMap extends Fieldtype
{
    protected $icon = 'earth';

    protected $categories = ['text'];

    /**
     * @return string
     */
    public static function title()
    {
        return 'Google Map';
    }

    public function selectable(): bool
    {
        $addon = Addon::get('jezzdk/statamic-google-maps');

        if ($addon->edition() !== 'pro') {
            return false;
        }

        return parent::selectable();
    }

    public function augment($value)
    {
        if (!isset($value['showControls'])) {
            $value['showControls'] = $this->config('showControls', false);
        }

        return MapHelper::convertToHtml($value);
    }

    public function preload()
    {
        $addon = Addon::get('jezzdk/statamic-google-maps');

        return [
            'defaultLat' => MapHelper::defaultLatitude(),
            'defaultLng' => MapHelper::defaultLongitude(),
            'pro' => $addon->edition() === 'pro',
        ];
    }

    /**
     * Pre-process the data before it gets sent to the publish page.
     *
     * @param mixed $data
     * @return array|mixed
     */
    public function preProcess($data)
    {
        if (empty($data)) {
            return [
                'lat' => MapHelper::defaultLatitude(),
                'lng' => MapHelper::defaultLongitude(),
            ];
        }

        return $data;
    }

    /**
     * Process the data before it gets saved.
     *
     * @param mixed $data
     * @return array|mixed
     */
    public function process($data)
    {
        return $data;
    }

    protected function configFieldItems(): array
    {
        return [
            'initial_type' => [
                'display' => 'Initial map type',
                'instructions' => 'Choose which map type should be selected as default.',
                'type' => 'select',
                'default' => 'roadmap',
                'options' => [
                    'roadmap' => __('Roadmap'),
                    'satellite' => __('Satellite'),
                    'terrain' => __('Terrain'),
                    'hybrid' => __('Hybrid'),
                ],
                'width' => 50
            ],
            'initial_zoom' => [
                'display' => 'Initial zoom level',
                'instructions' => 'Set a zoom level from 1 (far) to 21 (near).',
                'type' => 'text',
                'default' => '16',
                'width' => 50
            ],
            'maptypes' => [
                'display' => 'Enable maptype selector',
                'instructions' => 'Allow the user to select the map type.',
                'type' => 'toggle',
                'default' => true,
                'width' => 50
            ],
            'markers' => [
                'display' => 'Enable marker creation',
                'instructions' => 'The user can create and remove a marker on the map.',
                'type' => 'toggle',
                'default' => true,
                'width' => 50
            ],
            'geocoder' => [
                'display' => 'Enable Geocoder',
                'instructions' => 'The Geocoder API must be enabled in Google Cloud Console for this to work.',
                'type' => 'toggle',
                'default' => false,
                'width' => 50
            ],
            'showControls' => [
                'display' => 'Show controls (deprecated)',
                'instructions' => 'This can now be set on the resource and will be removed in a later release.',
                'type' => 'toggle',
                'default' => false,
                'width' => 50
            ],
            'hideStyles' => [
                'display' => 'Disable custom styles',
                'instructions' => 'Remove the ability to apply custom styles.',
                'type' => 'toggle',
                'default' => false,
                'width' => 50
            ]
        ];
    }
}
