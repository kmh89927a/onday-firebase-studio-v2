'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { selectCandidates } from '@/lib/mocks/candidate-selector';

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
  isLoading: boolean;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const addrA = searchParams.get('addrA') || '서울시청';
  const addrB = searchParams.get('addrB') || undefined;
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState('08:00');
  const [maxCommute, setMaxCommute] = useState(60);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([1000, 30000]);
  const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize candidates based on search params
  useEffect(() => {
    setIsLoading(true);
    const initialCandidates = selectCandidates(addrA, addrB);
    setAllCandidates(initialCandidates);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [addrA, addrB]);

  const [debouncedFilters, setDebouncedFilters] = useState({ maxCommute, budgetRange });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters({ maxCommute, budgetRange });
    }, 200);
    return () => clearTimeout(handler);
  }, [maxCommute, budgetRange]);

  const filteredCandidates = useMemo(() => {
    return allCandidates.filter((c) => {
      const info = c.commuteInfo[timeSlot];
      const commuteMatch = info.partner1.duration <= debouncedFilters.maxCommute && 
                           info.partner2.duration <= debouncedFilters.maxCommute;
      const budgetMatch = c.price >= debouncedFilters.budgetRange[0] && 
                          c.price <= debouncedFilters.budgetRange[1];
      return commuteMatch && budgetMatch;
    });
  }, [allCandidates, timeSlot, debouncedFilters]);

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
        allCandidates,
        resetFilters,
        isLoading,
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
