function boundaryBox(centerLat, centerLng, radiusInKm) {
  const radiusInDegrees = radiusInKm / 111;

  const minLat = centerLat - radiusInDegrees;
  const maxLat = centerLat + radiusInDegrees;
  const minLng = centerLng - radiusInDegrees;
  const maxLng = centerLng + radiusInDegrees;

  return [minLng, minLat, maxLng, maxLat];
}

export default boundaryBox;