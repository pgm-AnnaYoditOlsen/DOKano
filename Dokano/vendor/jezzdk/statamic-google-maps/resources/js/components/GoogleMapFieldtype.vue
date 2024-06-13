<template>
    <div>
        <input v-if="hasGeocoder" type="text" v-model="location" @keyup.enter="findPosition" placeholder="Search location" class="input-text">
        <div class="w-full h-96" ref="map"></div>
        <div class="flex justify-between">
            <div>
                <a v-if="hasMarker" href="#" @click.prevent="removeMarker" class="!text-red-400 text-xs">[x] Remove marker</a>
                <a v-else-if="config.markers" href="#" @click.prevent="addMarker(map.getCenter())" class="text-xs">[+] Add marker</a>
            </div>
            <div><a v-if="canReset && mapHasChanged" href="#" @click.prevent="resetMap" class="!text-red-400 text-xs">[-] Reset map</a></div>
        </div>
        <div><label><input type="checkbox" v-model="showControls" /> Map controls</label></div>
        <div v-if="this.meta.pro && !config.hideStyles" class="my-2">
            <div v-show="stylesExpanded">
                <div class="help-block"><p>Paste in the styles as JSON.</p></div>
                <textarea-input v-model="style"></textarea-input>
                <div class="text-gray-600 text-xs">Need help? Check out the <a href="https://mapstyle.withgoogle.com/" target="_blank">style tool</a> or <a href="https://snazzymaps.com/" target="_blank">Snazzy Maps</a>.</div>
                <button @click.prevent="stylesExpanded = false" class="btn mt-2">Hide styles</button>
            </div>
            <button v-show="!stylesExpanded" @click.prevent="stylesExpanded = true" class="btn">Show styles</button>
        </div>
    </div>
</template>

<script>
export default {
    mixins: [Fieldtype],
    data() {
        return {
            lat: null,
            lng: null,
            markerLat: null,
            markerLng: null,
            zoom: null,
            type: null,
            style: null,
            showControls: false,
            map: null,
            marker: null,
            hasMarker: false,
            stylesExpanded: false,
            geocoder: null,
            location: null,
        }
    },
    watch: {
        lat () {
            this.saveLocation()
        },
        lng () {
            this.saveLocation()
        },
        markerLat () {
            this.saveLocation()
        },
        markerLng () {
            this.saveLocation()
        },
        zoom () {
            this.saveLocation()
        },
        type () {
            this.saveLocation()
        },
        style () {
            this.saveLocation()
        },
        showControls () {
            this.saveLocation()
        },
    },
    computed: {
        hasGeocoder () {
            return this.config.geocoder
        },
        canReset () {
            return this.meta.defaultLat && this.meta.defaultLng
        },
        mapHasChanged () {
            return this.lat != this.meta.defaultLat
                || this.lng != this.meta.defaultLng
                || this.zoom != this.config.initial_zoom
                || this.type != this.config.initial_type
        },
        hasGeolocation () {
            return navigator.geolocation || false
        }
    },
    mounted () {
        this.lat = this.value.lat || this.meta.defaultLat
        this.lng = this.value.lng || this.meta.defaultLng
        this.markerLat = this.value.markerLat
        this.markerLng = this.value.markerLng
        this.zoom = this.value.zoom || this.config.initial_zoom || 16
        this.type = this.value.type || this.config.initial_type || 'roadmap'
        this.style = this.value.style
        this.showControls = this.value.showControls

        this.map = new google.maps.Map(this.$refs.map, {
            zoom: Number(this.zoom),
            center: {
                lat: Number.parseFloat(this.lat),
                lng: Number.parseFloat(this.lng),
            },
            mapTypeId: this.type,
            mapTypeControl: this.config.maptypes,
            mapTypeControlOptions: {
                mapTypeIds: [
                    google.maps.MapTypeId.ROADMAP,
                    google.maps.MapTypeId.SATELLITE,
                    google.maps.MapTypeId.TERRAIN,
                    google.maps.MapTypeId.HYBRID,
                ]
            },
            streetViewControl: false,
        })

        if (this.config.markers) {
            this.marker = new google.maps.Marker({
                clickable: false,
                draggable: true,
            })

            this.marker.addListener('dragend', () => {
                this.markerLat = this.marker.getPosition().lat()
                this.markerLng = this.marker.getPosition().lng()
            })

            if (this.markerLat && this.markerLng) {
                this.addMarker(
                    new google.maps.LatLng(Number.parseFloat(this.markerLat), Number.parseFloat(this.markerLng))
                )
            }
        }

        if (this.config.geocoder) {
            this.geocoder = new google.maps.Geocoder()
        }

        this.addMapListeners()

        this.addUserPositionButton()
    },
    methods: {
        addMapListeners () {
            if (this.config.markers) {
                this.map.addListener('click', (e) => {
                    this.addMarker(e.latLng)

                    this.markerLat = e.latLng.lat()
                    this.markerLng = e.latLng.lng()
                })
            }

            this.map.addListener('center_changed', () => {
                this.lat = this.map.getCenter().lat()
                this.lng = this.map.getCenter().lng()
            })

            this.map.addListener('zoom_changed', () => {
                this.zoom = this.map.getZoom()
            })

            this.map.addListener('maptypeid_changed', () => {
                this.type = this.map.getMapTypeId()
            })
        },
        addMarker (position) {
            this.marker.setMap(this.map)
            this.marker.setPosition(position)
            this.markerLat = position.lat()
            this.markerLng = position.lng()
            this.hasMarker = true
        },
        removeMarker () {
            this.marker.setPosition(null)
            this.marker.setMap(null)
            this.markerLat = null
            this.markerLng = null
            this.hasMarker = false
        },
        resetMap () {
            this.map.setCenter({
                lat: Number.parseFloat(this.meta.defaultLat),
                lng: Number.parseFloat(this.meta.defaultLng),
            })

            this.map.setZoom(Number(this.meta.defaultZoom) || 16)
            this.map.setMapTypeId(Number(this.meta.defaultType) || 'roadmap')

            this.removeMarker()
        },
        saveLocation () {
            this.update({
                lat: this.lat,
                lng: this.lng,
                markerLat: this.markerLat,
                markerLng: this.markerLng,
                zoom: this.zoom,
                type: this.type,
                style: this.style,
                showControls: this.showControls,
            })
        },
        findPosition () {
            this.geocoder.geocode({
                address: this.location
            }).then((response) => {
                if (response.results.length > 0) {
                    this.$toast.success('Location found')

                    let position = response.results[0].geometry.location
                    this.map.setCenter(position)

                    this.addMarker(position)
                } else {
                    this.$toast.error('Location not found')
                }
            }).catch((error) => {
                this.$toast.error(error.message)
            })
        },
        findUserPosition () {
            if (!navigator.geolocation) {
                return;
            }

            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                this.map.setCenter(pos)
            }, () => {
                console.debug('Error getting user position')
            })
        },
        addUserPositionButton () {
            const locationButton = document.createElement("button")
            locationButton.innerHTML = `
<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; display: block;" xml:space="preserve">
<g><g><path d="M256,0c-48.551,0-95.818,13.675-136.693,39.545l16.044,25.35C171.419,42.066,213.139,30,256,30 c42.861,0,84.581,12.066,120.648,34.895l16.044-25.35C351.818,13.675,304.551,0,256,0z"/></g></g>
<g><g><path d="M376.649,447.105C340.581,469.934,298.861,482,256,482c-42.861,0-84.581-12.066-120.648-34.895l-16.044,25.35 C160.182,498.325,207.449,512,256,512c48.551,0,95.818-13.675,136.693-39.545L376.649,447.105z"/></g></g>
<g><g><path d="M472.455,119.307l-25.35,16.044C469.934,171.419,482,213.139,482,256c0,42.861-12.066,84.581-34.895,120.648l25.35,16.044 C498.325,351.818,512,304.551,512,256C512,207.449,498.325,160.182,472.455,119.307z"/></g></g>
<g><g><path d="M64.895,135.352l-25.35-16.045C13.675,160.182,0,207.449,0,256c0,48.551,13.675,95.818,39.545,136.693l25.35-16.044 C42.066,340.581,30,298.861,30,256C30,213.139,42.066,171.419,64.895,135.352z"/></g></g>
<g><g><path d="M256,204c-28.673,0-52,23.327-52,52c0,28.673,23.327,52,52,52c28.673,0,52-23.327,52-52C308,227.327,284.673,204,256,204z M256,278c-12.131,0-22-9.869-22-22s9.869-22,22-22c12.131,0,22,9.869,22,22S268.131,278,256,278z"/></g></g>
</svg>`
            locationButton.style.margin = '10px'
            locationButton.style.padding = '8px'
            locationButton.style.width = '40px'
            locationButton.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px'
            locationButton.style.backgroundColor = '#FFFFFF'
            locationButton.addEventListener("mouseover", () => locationButton.style.backgroundColor = '#EFEFEF')
            locationButton.addEventListener("mouseout", () => locationButton.style.backgroundColor = '#FFFFFF')
            locationButton.addEventListener("click", () => this.findUserPosition())
            this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(locationButton)
        }
    }
};
</script>
