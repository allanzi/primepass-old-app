/* eslint-disable max-len, consistent-return, @typescript-eslint/no-shadow, @typescript-eslint/no-use-before-define, no-empty */
import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

interface Results {
  place_id?: string;
  description?: string;
  id?: string | number;
}
interface LocationState {
  latitude: string | number;
  longitude: string | number;
  handledLocation?: boolean;
  text?: string;
  city?: string;
  stateCode?: string;
  searchResults?: Results[];
  searchKeyword?: string;
  placeId?: string;
}
interface LocationContextData {
  latitude: string | number;
  longitude: string | number;
  city?: string;
  stateCode?: string;
  getLocation(location: LocationState): void;
  geoLocation(location: { ok: boolean }): void;
  handleLocation(selectedPlaceID: string | null | undefined): void;
  searchLocation(text: string): void;
  searchResults?: Results[];
  searchKeyword?: string;
  placeId?: string;
  handledLocation?: boolean;
  gpsOn?: boolean;
  startConfiguration?: () => {};
}

const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData,
);

const LocationProvider: React.FC = ({ children }) => {
  const [location, setLocation] = useState<LocationState>({} as LocationState);
  const [gpsOn, setGpsOn] = useState(false);

  const startConfiguration = async () => {
    if (Platform.OS === 'ios') {
      await Geolocation.requestAuthorization('whenInUse');
      geoLocation({ ok: true });
      return;
    }

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    geoLocation({ ok: true });
  };

  const geoLocation = useCallback(async (location) => {
    if (Platform.OS === 'ios') {
      startGetLocation();
    } else {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted) {
        if (location === undefined || {}) {
          startGetLocation();
        }
      } else {
        startGetLocation();
      }
    }
  }, []);

  const getLocation = useCallback(async (location: LocationState) => {
    const { latitude, longitude, handledLocation } = location;

    if (handledLocation) {
      getCity({ longitude, latitude });
    } else {
      geoLocation(location);
    }
  }, []);

  const startGetLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setGpsOn(true);
        const { latitude, longitude } = pos.coords;
        setLocation((prevState) => ({
          ...prevState,
          longitude,
          latitude,
          handledLocation: true,
        }));
        getCity({ longitude, latitude });
      },
      () => {
        setGpsOn(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 10000,
        accuracy: {
          android: 'balanced',
          ios: 'hundredMeters',
        },
        showLocationDialog: true,
      },
    );
  }, []);

  const getCity = useCallback(
    async ({
      latitude,
      longitude,
    }: {
      latitude: number;
      longitude: number;
    }) => {
      try {
        const { data } = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`,
        );

        const { city, principalSubdivisionCode } = data;

        setLocation((prevState) => ({
          ...prevState,
          city,
          stateCode: principalSubdivisionCode,
        }));
        return true;
      } catch (err) {}
    },
    [],
  );

  const handleLocation = useCallback(
    async (selectedPlaceID: string | null | undefined) => {
      if (selectedPlaceID) {
        setLocation((prevState) => ({ ...prevState, placeId: selectedPlaceID }));
        try {
          const response = await axios.request({
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/geocode/json?place_id=${selectedPlaceID}&key=AIzaSyCuQDJXp1qDRnFAS9tB6UubwJdUrYeo3lY`,
          });
          const { lat, lng } = response.data.results[0].geometry.location;
          setLocation((prevState) => ({ ...prevState, latitude: lat, longitude: lng }));
        } catch (err) {}
      }
    },
    [],
  );

  const searchLocation = useCallback(async (text: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCuQDJXp1qDRnFAS9tB6UubwJdUrYeo3lY&language=pt-BR&components=country:br&input='${text}'`;

    try {
      axios
        .request({
          method: 'get',
          url,
        })
        .then((response) => {
          const results = response.data.predictions as Results[];
          setLocation((prevState) => ({ ...prevState, searchResults: results }));
        })
        .catch(() => {});
    } catch (err) {}
  }, []);

  return (
    <LocationContext.Provider
      value={{
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        stateCode: location.stateCode,
        getLocation,
        searchLocation,
        handleLocation,
        handledLocation: location.handledLocation,
        searchResults: location.searchResults,
        searchKeyword: location.searchKeyword,
        geoLocation,
        gpsOn,
        startConfiguration,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

function useLocation(): LocationContextData {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('location is required');
  }

  return context;
}

export { LocationProvider, useLocation };
