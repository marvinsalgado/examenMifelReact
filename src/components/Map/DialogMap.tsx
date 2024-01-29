import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useEffect } from "react";
import { useUsersStore } from "../../hooks/users/useUsersStore";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
Geocode?.setApiKey(apiKey);
Geocode?.setRegion("es");
Geocode?.setLanguage("es");

export const DialogMap = () => {
  const { user } = useUsersStore();
  const lat = user?.address.geo.lat;
  const lng = user?.address.geo.lng;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["geometry", "drawing"],
  });
  const obtenerDireccion = () => {
    const direccion = {
      latitude: String(lat) || "1",
      longitude: String(lng) || "1",
    };
    Geocode.fromLatLng(direccion?.latitude, direccion?.longitude).then(
      () => {
        console.log();
      },
      () => {
        console.log();
      }
    );
  };

  useEffect(() => {
    if (lat && lng) {
      obtenerDireccion();
    } //eslint-disable-next-line
  }, [lat, lng]);

  const onMarkerLoad = (marker: unknown) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    marker.setAnimation(window.google.maps.Animation.DROP);
  };

  return isLoaded && lat && lng ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={{
        lat: Number(lat),
        lng: Number(lng),
      }}
      zoom={16}
    >
      <Marker
        onLoad={onMarkerLoad}
        animation={window.google.maps.Animation.DROP}
        position={{
          lat: Number(lat),
          lng: Number(lng),
        }}
      />
    </GoogleMap>
  ) : null;
};
