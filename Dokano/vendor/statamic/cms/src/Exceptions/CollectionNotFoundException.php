<?php

namespace Statamic\Exceptions;

use Exception;
use Spatie\Ignition\Contracts\BaseSolution;
use Spatie\Ignition\Contracts\ProvidesSolution;
use Spatie\Ignition\Contracts\Solution;
use Spatie\LaravelIgnition\Support\StringComparator;
use Statamic\Facades\Collection;
use Statamic\Statamic;

class CollectionNotFoundException extends Exception implements ProvidesSolution
{
    protected $collection;

    public function __construct($collection)
    {
        parent::__construct("Collection [{$collection}] not found");

        $this->collection = $collection;
    }

    public function getSolution(): Solution
    {
        $description = ($suggestedCollection = $this->getSuggestedCollection())
            ? "Did you mean `$suggestedCollection`?"
            : 'Are you sure the collection exists?';

        return BaseSolution::create("The {$this->collection} collection was not found.")
            ->setSolutionDescription($description)
            ->setDocumentationLinks([
                'Read the collections guide' => Statamic::docsUrl('/collections'),
            ]);
    }

    protected function getSuggestedCollection()
    {
        return StringComparator::findClosestMatch(
            Collection::handles()->all(),
            $this->collection
        );
    }
}
