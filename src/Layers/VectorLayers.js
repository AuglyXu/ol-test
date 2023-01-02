import { useContext, useEffect } from "react";
import MapContext from "../Context/MapContext";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ source, style, zIndex = 0 }) => {

    const { map } = useContext(MapContext);
    useEffect(() => {
        if (!map) return;
        let vectorLayer = new OLVectorLayer({
            source,
            style
        });
        map.addLayer(vectorLayer);
        vectorLayer.setZIndex(zIndex);
        return () => {
            if (map) {
                map.removeLayer(vectorLayer);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    return null;
};
export default VectorLayer;