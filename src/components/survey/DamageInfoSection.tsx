// components/DamageInfoSection.tsx
import { useState, useEffect, useRef } from "react";
import L, { LatLng } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

type DamageInfoProps = {
  onLocationChange: (lat: number, lng: number) => void;
};

const DamageInfoSection = ({ onLocationChange }: DamageInfoProps) => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);

  // Reference for the map container
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // This effect runs once when the component mounts, initializing the map
    if (mapRef.current) {
      const map = L.map(mapRef.current, {
        center: [35.0, 38.0], // Initial map center
        zoom: 7,
        maxBounds: [
          [32.0, 35.5], // Southwest corner
          [37.5, 42.0], // Northeast corner
        ], // Restrict map to Syria's bounds
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition(new LatLng(lat, lng)); // Use LatLng here instead of array
        setLatitude(lat.toFixed(6));
        setLongitude(lng.toFixed(6));
        onLocationChange(lat, lng); // Passing the coordinates to the parent
      });

      // Cleanup function to remove map instance on component unmount
      return () => {
        if (map) {
          map.remove();
        }
      };
    }
  }, [onLocationChange]);

  return (
    <section className="mb-8">
      <h2 className="text-center text-xl font-semibold mb-4">معلومات حول الأضرار</h2>

      <div className="mb-4">
        <label htmlFor="damage-type" className="block text-lg mb-2">
          نوع العقار المتضرر:
        </label>
        <select
          id="damage-type"
          name="damage-type"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        >
          <option value="">اختر واحداً</option>
          <option value="شقة">شقة</option>
          <option value="منزل خاص">منزل خاص</option>
          <option value="محل تجاري">محل تجاري</option>
          <option value="أرض زراعية">أرض زراعية</option>
          <option value="مبنى إداري">مبنى إداري</option>
          <option value="أخرى">أخرى</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="damage-address" className="block text-lg mb-2">
          العنوان التفصيلي للعقار المتضرر:
        </label>
        <input
          type="text"
          id="damage-address"
          name="damage-address"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block text-lg mb-2">
          المدينة:
        </label>
        <select
          id="city"
          name="city"
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="">اختر واحداً</option>
          <option value="حلب">حلب</option>
          <option value="دمشق">دمشق</option>
          <option value="حمص">حمص</option>
          <option value="حماة">حماة</option>
        </select>
      </div>

      <h3 className="text-lg font-semibold mt-4">يرجى تحديد مكان الضرر على الخريطة:</h3>

      {/* React-Leaflet Map */}
      <div
        id="map"
        ref={mapRef}
        style={{ height: "300px", width: "100%" }}
      >
        {/* The map will be rendered here */}
      </div>

      <input
        type="text"
        id="latitude"
        name="latitude"
        placeholder="خط العرض"
        value={latitude}
        readOnly
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
      />
      <input
        type="text"
        id="longitude"
        name="longitude"
        placeholder="خط الطول"
        value={longitude}
        readOnly
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
      />

      <div className="mb-4">
        <label htmlFor="damage-description" className="block text-lg mb-2">
          وصف مفصل للأضرار الحاصلة:
        </label>
        <textarea
          id="damage-description"
          name="damage-description"
          className="w-full p-3 border border-gray-300 rounded-md h-32 resize-y"
        ></textarea>
      </div>
    </section>
  );
};

export default DamageInfoSection;
