import { TileLayer } from 'react-leaflet';

interface LeafletTileLayerProps {
  url: string;
  attribution: string;
}

const LeafletTileLayer: React.FC<LeafletTileLayerProps> = ({ url, attribution, ...props }) => {
  const options = { attribution }
  return <TileLayer url={url} {...options} {...props} />;
};

export default LeafletTileLayer;