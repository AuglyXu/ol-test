import { useContext, useEffect } from "react";
import MapContext from "../Context/MapContext";
import OLTileLayer from "ol/layer/Tile";

const TileLayer = ({ source, zIndex = 0 }) => {
    const { map } = useContext(MapContext);
    useEffect(() => {
        if (!map) return;

        let tileLayer = new OLTileLayer({
            source,
            zIndex,
        });

        map.addLayer(tileLayer);
        tileLayer.setZIndex(zIndex);
        return () => {
            if (map) {
                map.removeLayer(tileLayer);
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);
    return null;
};

export default TileLayer;