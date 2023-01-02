import { useState } from 'react'
import Map from './Component/MapView'
import Layers from './Layers/Layers'
import TileLayer from './Layers/TileLayers'
import VectorLayer from './Layers/VectorLayers'
import Controls from './Controls/Controls'
import FullScreenControl from './Controls/FullScreenControls'
import { osm, vector } from "./Source";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat, get } from "ol/proj";
import mapConfig from "./mock/config.json";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import FeatureStyles from "./Features/Style";

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function App() {

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showMarker, setShowMarker] = useState(false);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  return (
    <div className="App">
      <Map>
        <Layers>
          <TileLayer
            source={osm()}
            zIndex={0}
          />
          {showLayer1 && (
            <VectorLayer
              source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
              style={FeatureStyles.MultiPolygon}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
              style={FeatureStyles.MultiPolygon}
            />
          )}
          {showMarker && <VectorLayer source={vector({ features })} />}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
      <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        Johnson County
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={(event) => setShowLayer2(event.target.checked)}
        />{" "}
        Wyandotte County
      </div>
      <hr />
      <div>
        <input
          type="checkbox"
          checked={showMarker}
          onChange={(event) => setShowMarker(event.target.checked)}
        />{" "}
        Show markers
      </div>
    </div>
  );
}

export default App;
