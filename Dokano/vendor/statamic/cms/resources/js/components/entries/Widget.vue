<template>
    <div class="h-full">
        <div v-if="initializing" class="loading">
            <loading-graphic />
        </div>

        <data-list
            v-if="!initializing && items.length"
            :rows="items"
            :columns="cols"
            :sort="false"
            :sort-column="sortColumn"
            :sort-direction="sortDirection"
            class="h-full flex flex-col justify-between"
        >
            <div slot-scope="{ }">
                <data-list-table :loading="loading">
                    <template slot="cell-title" slot-scope="{ row: entry }">
                        <div class="flex items-center">
                            <div class="little-dot rtl:ml-2 ltr:mr-2" :class="[entry.published ? 'bg-green-600' : 'bg-gray-400']" />
                            <a :href="entry.edit_url">{{ entry.title }}</a>
                        </div>
                    </template>
                </data-list-table>
                <data-list-pagination
                    v-if="meta.last_page != 1"
                    class="py-2 border-t bg-gray-200 rounded-b-lg text-sm dark:bg-dark-650 dark:border-gray-900"
                    :resource-meta="meta"
                    @page-selected="selectPage"
                    :scroll-to-top="false"
                />
            </div>
        </data-list>

        <p v-else-if="!initializing && !items.length" class="p-4 pt-2 text-sm text-gray-600">
            {{ __('There are no entries in this collection') }}
        </p>

    </div>
</template>

<script>
import Listing from '../Listing.vue';

export default {

    mixins: [Listing],

    props: {
        collection: String,
        additionalColumns: Array,
    },

    data() {
        return {
            cols: [{ label: "Title", field: "title", visible: true }, ...this.additionalColumns],
            listingKey: 'entries',
            requestUrl: cp_url(`collections/${this.collection}/entries`),
        }
    },

}
</script>
