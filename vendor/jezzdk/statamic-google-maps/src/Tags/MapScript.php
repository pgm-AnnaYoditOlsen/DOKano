<?php

namespace Jezzdk\StatamicGoogleMaps\Tags;

use Jezzdk\StatamicGoogleMaps\Helpers\MapHelper;
use Statamic\Tags\Tags;

class MapScript extends Tags
{
    protected static $handle = 'map_script';

    /**
     * The {{ map_script }} tag.
     *
     * @return string|array
     */
    public function index()
    {
        return '<script src="' . MapHelper::googleMapsScriptUrl() . '" type="text/javascript" async defer></script>';
    }
}
