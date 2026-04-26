import { CANDIDATE_POOL, type PoolCandidate } from './candidate-pool';
import type { Candidate, CommuteDetail } from '@/app/diagnosis/result/MapContext';

// Geocoding Stub
const ADDRESS_COORDS: Record<string, { lat: number; lng: number }> = {
  '강남역': { lat: 37.4979, lng: 127.0276 },
  '테헤란로': { lat: 37.4979, lng: 127.0276 },
  '판교역': { lat: 37.3948, lng: 127.1111 },
  '판교': { lat: 37.3948, lng: 127.1111 },
  '광화문': { lat: 37.5704, lng: 126.9768 },
  '종로': { lat: 37.5704, lng: 126.9768 },
  '여의도': { lat: 37.5216, lng: 126.9241 },
  '잠실': { lat: 37.5133, lng: 127.1001 },
  '목동': { lat: 37.5264, lng: 126.8641 },
  '마곡': { lat: 37.5601, lng: 126.8252 },
  '분당': { lat: 37.3850, lng: 127.1235 },
  '일산': { lat: 37.6595, lng: 126.7733 },
  '평촌': { lat: 37.3943, lng: 126.9568 },
  '송도': { lat: 37.3851, lng: 126.6434 },
  '구로디지털단지역': { lat: 37.4852, lng: 126.9015 },
  '가산디지털단지': { lat: 37.4812, lng: 126.8826 },
  '시청': { lat: 37.5665, lng: 126.9780 },
  '서울시청': { lat: 37.5665, lng: 126.9780 },
};

function getCoords(address: string) {
  for (const key in ADDRESS_COORDS) {
    if (address.includes(key)) return ADDRESS_COORDS[key];
  }
  // Default to Seoul City Hall if not found
  return ADDRESS_COORDS['시청'];
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function selectCandidates(
  addressA: string,
  addressB?: string,
  filters?: { maxCommute: number; budgetRange: [number, number] }
): Candidate[] {
  const coordsA = getCoords(addressA);
  const coordsB = addressB ? getCoords(addressB) : coordsA;

  const midLat = (coordsA.lat + coordsB.lat) / 2;
  const midLng = (coordsA.lng + coordsB.lng) / 2;

  const timeSlots = ['07:00', '08:00', '09:00', '10:00'];

  const results: Candidate[] = CANDIDATE_POOL.map(pool => {
    const distA = calculateDistance(pool.lat, pool.lng, coordsA.lat, coordsA.lng);
    const distB = calculateDistance(pool.lat, pool.lng, coordsB.lat, coordsB.lng);
    const distFromMid = calculateDistance(pool.lat, pool.lng, midLat, midLng);

    // Estimate commute time: dist * coefficient (approx 3-5 min per km) + random noise
    const generateCommute = (dist: number): Record<string, CommuteDetail> => {
      const commuteMap: Record<string, CommuteDetail> = {};
      timeSlots.forEach(slot => {
        const rushHourFactor = slot === '08:00' || slot === '09:00' ? 1.5 : 1.0;
        const duration = Math.max(10, Math.floor(dist * 4 * rushHourFactor + Math.random() * 5));
        commuteMap[slot] = {
          duration,
          mode: Math.random() > 0.5 ? 'bus' : 'car',
          transfers: Math.random() > 0.7 ? 1 : 0
        };
      });
      return commuteMap;
    };

    const commuteAInfo = generateCommute(distA);
    const commuteBInfo = generateCommute(distB);

    const commuteInfo: Record<string, { partner1: CommuteDetail; partner2: CommuteDetail }> = {};
    timeSlots.forEach(slot => {
      commuteInfo[slot] = {
        partner1: commuteAInfo[slot],
        partner2: commuteBInfo[slot]
      };
    });

    return {
      id: pool.id,
      name: pool.name,
      lat: pool.lat,
      lng: pool.lng,
      price: pool.basePrice + (Math.random() * 2000 - 1000), // 약간의 가격 변동성
      commuteInfo,
      distanceFromMid: distFromMid
    } as Candidate & { distanceFromMid: number };
  });

  // Sort by proximity to midpoint
  let filtered = results.sort((a, b) => (a as any).distanceFromMid - (b as any).distanceFromMid);

  // Apply filters if provided
  if (filters) {
    filtered = filtered.filter(c => {
      const info = c.commuteInfo['08:00'];
      const commuteMatch = info.partner1.duration <= filters.maxCommute && info.partner2.duration <= filters.maxCommute;
      const budgetMatch = c.price >= filters.budgetRange[0] && c.price <= filters.budgetRange[1];
      return commuteMatch && budgetMatch;
    });
  }

  return filtered.slice(0, 8);
}
