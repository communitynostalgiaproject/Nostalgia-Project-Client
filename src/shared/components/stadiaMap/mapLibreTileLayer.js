import { TileLayer } from 'react-leaflet';

const MapLibreTileLayer = ({ url, attribution }) => {
    return <TileLayer url={url} attribution={attribution} />;
  };

export default MapLibreTileLayer