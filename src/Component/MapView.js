import React, { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map';
import "./mapStyle.css";
import View from 'ol/View';
import MapContext from '../Context/MapContext';

const MapView = ({ children, zoom = 2, center = [0, 0] }) => {
    const mapRef = useRef()

    const [map, setMap] = useState(null)

    const initMap = () => {
        // new Map({
        //     target: 'map',
        //     layers: [
        //         new TileLayer({
        //             source: new XYZ({
        //                 url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        //             })
        //         })
        //     ],
        //     view: new View({
        //         center: [0, 0],
        //         zoom: 2
        //     })
        // });
        let options = {
            view: new View({ zoom, center }),
            layers: [],
            controls: [],
            overlays: []
        };
        let mapObject = new Map(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);
        return () => mapObject.setTarget(undefined);
    }
    useEffect(() => {
        initMap()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!map) return;
        map.getView().setZoom(zoom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoom]);
    // center change handler
    useEffect(() => {
        if (!map) return;
        map.getView().setCenter(center)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center])


    return (
        <MapContext.Provider value={{ map }}>
            <div ref={mapRef} className="ol-map">
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default MapView