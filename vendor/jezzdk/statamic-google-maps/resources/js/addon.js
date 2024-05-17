import Fieldtype from './components/GoogleMapFieldtype.vue';

Statamic.booting(() => {
    Statamic.$components.register('google_map-fieldtype', Fieldtype);
});
