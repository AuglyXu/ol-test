import Map from './Component/MapView'
import Layers from './Layers/Layers'
import TileLayer from './Layers/TileLayers'
import VectorLayer from './Layers/VectorLayers'
import Controls from './Controls/Controls'
import FullScreenControl from './Controls/FullScreenControls'
import { osm, vector } from "./Source";

function App() {
  return (
    <div className="App">
      <Map>
        <Layers>
          <TileLayer
            source={osm()}
            zIndex={0}
          />
          {/* {showLayer1 && (
            <VectorLayer
              source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
              style={styles.MultiPolygon}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
              style={styles.MultiPolygon}
            />
          )} */}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
}

export default App;
