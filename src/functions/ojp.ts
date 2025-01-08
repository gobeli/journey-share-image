import { LocationInformationRequest, StageConfig, type Location, TripRequest, TripLeg, StopPoint, TripTimedLeg } from 'ojp-sdk'
import { TripsRequestParams } from 'ojp-sdk/lib/request/trips-request/trips-request-params'
import { TripStats } from 'ojp-sdk/lib/types/trip-stats';

interface LegPointView {
  name: string | null;
  platform?: PlatformView | null;
}

interface PlatformView {
  plannedPlatform: string | null;
  actualPlatform: string | null;
}

interface LegView {
  lineNumber?: string | null;
  from: LegPointView;
  to: LegPointView;
}

export interface TripView {
  from: LegView;
  to: LegView;
  stats: TripStats;
}

const stage: StageConfig = {
  key: 'CUSTOM',
  authBearerKey: 'eyJvcmciOiI2NDA2NTFhNTIyZmEwNTAwMDEyOWJiZTEiLCJpZCI6Ijk0YTFhNjExYjM5ZjQ4MWNiMGI5MjFiNTgyNmM1ZGFjIiwiaCI6Im11cm11cjEyOCJ9',
  apiEndpoint: 'https://api.opentransportdata.swiss/ojp20'
}

export async function findStation(query: string): Promise<Location[]> {
  if (query == null || query.length < 2) {
    return []
  }

  return await LocationInformationRequest.initWithLocationName(
    stage,
    'de',
    query,
    ['stop'],
    5
  ).fetchResponse().then(l => l.locations.map(l => { l.locationName = l.computeLocationName(); return l; }))
}

export function searchTrips(from: Location, to: Location, date: Date): Promise<TripView[]> {
  const req = TripsRequestParams.initWithLocationsAndDate('de', from, to, date, 'Dep')!;
  req.numberOfResults = 5;
  req.includeLegProjection = true;

  return new TripRequest(stage, req).fetchResponse().then(res => res.trips.map(trip => ({ stats: trip.stats, from: mapLegView(trip.legs[0]), to: mapLegView(trip.legs.at(-1)!) })))
}

function mapLegView(leg: TripLeg) {
  const legView: LegView = {
    from: { name: leg.fromLocation.computeLocationName() },
    to: { name: leg.toLocation.computeLocationName() },
  };

  if (leg.legType === 'TimedLeg') {
    const timedLeg = leg as TripTimedLeg;
    legView.lineNumber = timedLeg.service.serviceLineNumber;
    legView.from.platform = mapPlatform(timedLeg.fromStopPoint);
    legView.to.platform = mapPlatform(timedLeg.toStopPoint);
  }

  return legView;
}

function mapPlatform(point: StopPoint) {
  return {
    plannedPlatform: point.plannedPlatform,
    actualPlatform: point.actualPlatform,
  };
}