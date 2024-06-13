<?php

namespace Revolution\Google\Client\Facades;

use Illuminate\Support\Facades\Facade;
use Psr\Cache\CacheItemPoolInterface;
use Revolution\Google\Client\GoogleSheetClient;

/**
 * @method static mixed make(string $service)
 * @method static void setAccessToken(array|string $token)
 * @method static bool isAccessTokenExpired()
 * @method static void fetchAccessTokenWithRefreshToken(?string $refreshToken = null)
 * @method static CacheItemPoolInterface getCache()
 *
 * @see GoogleSheetClient
 */
class Google extends Facade
{
    /**
     * Get the registered name of the component.
     */
    protected static function getFacadeAccessor(): string
    {
        return 'google-client';
    }
}
