import * as turf from '@turf/turf';

function PolygonCheck(polygonCoordinates, dataArray) {


  const polygonFeature = turf.polygon([polygonCoordinates]);

  const pointsInsidePolygon = dataArray.filter(point => {
    const pointFeature = turf.point(point.center);
    return turf.booleanPointInPolygon(pointFeature, polygonFeature);
  });

  

  return pointsInsidePolygon;
}

export default PolygonCheck;
