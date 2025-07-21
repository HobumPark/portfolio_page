import React, { useEffect, useRef } from 'react';

// OpenLayers core
import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';

// Geometry & feature
import Point from 'ol/geom/Point';
import { Feature } from 'ol';

// Projection & format
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';

// Layers & sources
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

// Controls
import { defaults as defaultControls, Zoom } from 'ol/control';

// Styles
import { Style, Icon, Stroke, Fill, Circle as CircleStyle } from 'ol/style';

// Assets (마커 이미지 등)
import markerImageRed from '../../../assets/placeholder_red.png';
import markerImageBlue from '../../../assets/placeholder_blue.png';

// Stylesheet
import 'ol/ol.css';
import './css/OpenLayersStyle.css';

import PopUp from '../popup/PopUp.jsx'; // 만약 팝업 컴포넌트를 화면에 렌더링할 경우 사용

import {fetchPollutionData} from '../api/pollution.js';
import ToggleFillControl from '../mapControl/ToggleFillControl.jsx'

const SEOUL_CENTER = fromLonLat([126.9780, 37.5665]);

const OpenLayersSeoulPage = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const defaultLayerRef = useRef(null); // 투명도 조절용
  const fillLayerRef = useRef(null);

useEffect(() => {
  if (!mapRef.current) return;

  const initialize = async () => {
    defaultLayerRef.current = new TileLayer({
      source: new OSM(),
      opacity: 1,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [defaultLayerRef.current],
      view: new View({
        center: SEOUL_CENTER,
        zoom: 14,
      }),
      controls: defaultControls().extend([new Zoom()]),
    });

    mapInstanceRef.current = map;


    fetchGeoDistrictJsonFile();
    fetchGeoCenterJsonFile();

    // 클린업 함수는 useEffect 바깥에 반환

    // 커스텀 토글 컨트롤 생성 및 지도에 추가
    const toggleControl = new ToggleFillControl(() => {
      if (!fillLayerRef.current) return;
      const visible = !fillLayerRef.current.getVisible();
      fillLayerRef.current.setVisible(visible);
    });
    map.addControl(toggleControl);

  };

  initialize();

  return () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setTarget(undefined);
    }
  };
}, []);

  // 다각형 그리기 함수
  const makeGeoDistrictByJson = (geojsonData) => {
    if (!mapInstanceRef.current) return;

    const format = new GeoJSON();
    // GeoJSON 좌표계 EPSG:4326 → 지도 좌표계 EPSG:3857 변환 옵션
    const features = format.readFeatures(geojsonData, {
      featureProjection: 'EPSG:3857',
    });

    const vectorSource = new VectorSource({
      features: features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 2,
        }),
        fill: null, // 선만 그리려면 fill 없애기
      }),
    });

    // 내부 채우기 레이어
    const fillLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.2)', // 반투명 파랑
        }),
        stroke: null, // 선 없음 또는 약하게
      }),
    });

    fillLayerRef.current = fillLayer;

    // 기존 레이어 뒤에 추가
    mapInstanceRef.current.addLayer(vectorLayer);
    mapInstanceRef.current.addLayer(fillLayer);

    // 지도 뷰를 다각형 영역에 맞춤
    const extent = vectorSource.getExtent();
    mapInstanceRef.current.getView().fit(extent, { padding: [20, 20, 20, 20] });
  };

  // 마커 그리기 함수
  const makeGeoCenterByJson = async (centersArray) => {
  if (!mapInstanceRef.current) return;

  // 미세먼지 데이터 비동기 받아오기
  const pollutionData = await fetchPollutionData("서울");

  // 피처 배열 생성
  const features = centersArray.map(({ name, lat, lon }) => {
    return new Feature({
      geometry: new Point(fromLonLat([lon, lat])),
      name: name,
    });
  });

  // 벡터 소스 및 레이어 생성
  const vectorSource = new VectorSource({ features });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: markerImageRed,
        scale: 0.1,
      }),
    }),
  });

  mapInstanceRef.current.addLayer(vectorLayer);

  // 팝업 오버레이 생성 (한번만)
  const popupContainer = document.getElementById('popup');
  const popupContent = document.getElementById('popup-content');

  const popupOverlay = new Overlay({
    element: popupContainer,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -15],
  });

  mapInstanceRef.current.addOverlay(popupOverlay);

  // 마우스 포인터 움직임에 따라 피처가 있으면 팝업 띄우기
  mapInstanceRef.current.on('pointermove', (evt) => {
    const feature = mapInstanceRef.current.forEachFeatureAtPixel(evt.pixel, (f) => f);

    if (feature && feature.getGeometry().getType() === 'Point') {
      const coord = feature.getGeometry().getCoordinates();
      const name = feature.get('name');

      const pollutionInfo = pollutionData.find(station => station.stationName === name);

      let html = `<div><b>${name}</b></div>`;
      if (pollutionInfo) {
        html += `
          <div>미세먼지: ${pollutionInfo.pm10Value} ㎍/㎥</div>
          <div>이산화황: ${pollutionInfo.so2Value} ppm</div>
          <div>오존: ${pollutionInfo.o3Value} ppm</div>
        `;
      }

      popupContent.innerHTML = html;
      popupOverlay.setPosition(coord);
      mapInstanceRef.current.getTargetElement().style.cursor = 'pointer';
    } else {
      popupOverlay.setPosition(undefined);
      mapInstanceRef.current.getTargetElement().style.cursor = '';
    }
  });

  // 지도 뷰 맞추기
  const extent = vectorSource.getExtent();
  mapInstanceRef.current.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 12 });
};


  //구역 데이터 가져오기 + 구역 그리기
  const fetchGeoDistrictJsonFile = () => {
    fetch('/data/skorea-municipalities-2018-geo.json')
      .then((response) => {
        if (!response.ok) throw new Error('네트워크 오류');
        return response.json();
      })
      .then((data) => {
        console.log('읽어들인 데이터:', data);

        const seoulOnly = {
          type: 'FeatureCollection',
          features: data.features.filter(
            (f) => f.properties.code?.toString().startsWith('21')
          ),
        };

        // 서울만 추려서 함수 호출
        makeGeoDistrictByJson(seoulOnly);
      })
      .catch((error) => {
        console.error('파일 읽기 실패:', error);
      });
  };

  //중심좌표 데이터 가져오기 + 마커 그리기
  const fetchGeoCenterJsonFile = () => {
    fetch('/data/busan_municipalities_geo_center.json')
      .then((response) => {
        if (!response.ok) throw new Error('네트워크 오류');
        return response.json();
      })
      .then((data) => {
        console.log('읽어들인 데이터:', data);
        makeGeoCenterByJson(data);
      })
      .catch((error) => {
        console.error('파일 읽기 실패:', error);
      });
  };

  return (
    <div style={{ display: 'flex', height: '800px', border: '1px solid #ccc' }}>
      <div ref={mapRef} style={{ flex: '0 0 100%', height: '100%' }} />

      <PopUp/>

    </div>
  );
};

export default OpenLayersSeoulPage;
