
'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

export type CommuteDetail = {
  duration: number;
  mode: 'bus' | 'car';
  transfers: number;
};

export type Candidate = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  price: number; // 단위: 만원
  commuteInfo: Record<string, { partner1: CommuteDetail; partner2: CommuteDetail }>;
};

interface MapContextType {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  timeSlot: string;
  setTimeSlot: (time: string) => void;
  maxCommute: number;
  setMaxCommute: (val: number) => void;
  budgetRange: [number, number];
  setBudgetRange: (range: [number, number]) => void;
  filteredCandidates: Candidate[];
  allCandidates: Candidate[];
  resetFilters: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: '강남역 인근',
    lat: 37.4979,
    lng: 127.0276,
    price: 15000,
    commuteInfo: {
      '07:00': {
        partner1: { duration: 15, mode: 'bus', transfers: 0 },
        partner2: { duration: 45, mode: 'car', transfers: 0 },
      },
      '08:00': {
        partner1: { duration: 25, mode: 'bus', transfers: 0 },
        partner2: { duration: 60, mode: 'car', transfers: 0 },
      },
      '09:00': {
        partner1: { duration: 20, mode: 'bus', transfers: 0 },
        partner2: { duration: 55, mode: 'car', transfers: 0 },
      },
      '10:00': {
        partner1: { duration: 15, mode: 'bus', transfers: 0 },
        partner2: { duration: 40, mode: 'car', transfers: 0 },
      },
    },
  },
  {
    id: '2',
    name: '판교 백현동',
    lat: 37.3948,
    lng: 127.1111,
    price: 12000,
    commuteInfo: {
      '07:00': {
        partner1: { duration: 40, mode: 'car', transfers: 0 },
        partner2: { duration: 10, mode: 'bus', transfers: 0 },
      },
      '08:00': {
        partner1: { duration: 55, mode: 'car', transfers: 0 },
        partner2: { duration: 20, mode: 'bus', transfers: 0 },
      },
      '09:00': {
        partner1: { duration: 50, mode: 'car', transfers: 0 },
        partner2: { duration: 15, mode: 'bus', transfers: 0 },
      },
      '10:00': {
        partner1: { duration: 35, mode: 'car', transfers: 0 },
        partner2: { duration: 10, mode: 'bus', transfers: 0 },
      },
    },
  },
  {
    id: '3',
    name: '송파 문정동',
    lat: 37.4875,
    lng: 127.1225,
    price: 9000,
    commuteInfo: {
      '07:00': {
        partner1: { duration: 30, mode: 'bus', transfers: 1 },
        partner2: { duration: 30, mode: 'bus', transfers: 1 },
      },
      '08:00': {
        partner1: { duration: 45, mode: 'bus', transfers: 1 },
        partner2: { duration: 45, mode: 'bus', transfers: 1 },
      },
      '09:00': {
        partner1: { duration: 40, mode: 'bus', transfers: 1 },
        partner2: { duration: 40, mode: 'bus', transfers: 1 },
      },
      '10:00': {
        partner1: { duration: 25, mode: 'bus', transfers: 1 },
        partner2: { duration: 25, mode: 'bus', transfers: 1 },
      },
    },
  },
];

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState('08:00');
  const [maxCommute, setMaxCommute] = useState(60);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([1000, 30000]);

  const [debouncedFilters, setDebouncedFilters] = useState({ maxCommute, budgetRange });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters({ maxCommute, budgetRange });
    }, 200);
    return () => clearTimeout(handler);
  }, [maxCommute, budgetRange]);

  const filteredCandidates = useMemo(() => {
    return MOCK_CANDIDATES.filter((c) => {
      const info = c.commuteInfo[timeSlot];
      const commuteMatch = info.partner1.duration <= debouncedFilters.maxCommute && 
                           info.partner2.duration <= debouncedFilters.maxCommute;
      const budgetMatch = c.price >= debouncedFilters.budgetRange[0] && 
                          c.price <= debouncedFilters.budgetRange[1];
      return commuteMatch && budgetMatch;
    });
  }, [timeSlot, debouncedFilters]);

  const resetFilters = () => {
    setMaxCommute(60);
    setBudgetRange([1000, 30000]);
    setTimeSlot('08:00');
  };

  return (
    <MapContext.Provider
      value={{
        selectedId,
        setSelectedId,
        timeSlot,
        setTimeSlot,
        maxCommute,
        setMaxCommute,
        budgetRange,
        setBudgetRange,
        filteredCandidates,
        allCandidates: MOCK_CANDIDATES,
        resetFilters,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) throw new Error('useMapContext must be used within MapProvider');
  return context;
}

export function useSelectedCandidate() {
  const { selectedId, allCandidates } = useMapContext();
  return useMemo(() => allCandidates.find((c) => c.id === selectedId) || null, [selectedId, allCandidates]);
}

export function useFilteredCandidates() {
  return useMapContext().filteredCandidates;
}
