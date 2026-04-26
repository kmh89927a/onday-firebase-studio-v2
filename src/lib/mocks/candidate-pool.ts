export type PoolCandidate = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  basePrice: number; // 단위: 만원
  tags: string[];
};

export const CANDIDATE_POOL: PoolCandidate[] = [
  // 서울 - 도심/주요
  { id: 'seoul-1', name: '강남역 인근', lat: 37.4979, lng: 127.0276, basePrice: 15000, tags: ['2호선', '신분당선', '테헤란로'] },
  { id: 'seoul-2', name: '마포 합정동', lat: 37.5494, lng: 126.9142, basePrice: 9500, tags: ['홍대인근', '2-6호선', '한강공원'] },
  { id: 'seoul-3', name: '용산 이태원', lat: 37.5345, lng: 126.9941, basePrice: 13000, tags: ['6호선', '중심지', '문화다양성'] },
  { id: 'seoul-4', name: '송파 잠실', lat: 37.5133, lng: 127.1001, basePrice: 16000, tags: ['2호선', '석촌호수', '인프라최상'] },
  { id: 'seoul-5', name: '성수동', lat: 37.5446, lng: 127.0560, basePrice: 12000, tags: ['카페거리', '수인분당선', '신흥부촌'] },
  { id: 'seoul-6', name: '여의도', lat: 37.5216, lng: 126.9241, basePrice: 17000, tags: ['금융지구', '5-9호선', '공세권'] },
  { id: 'seoul-7', name: '양천 목동', lat: 37.5264, lng: 126.8641, basePrice: 11000, tags: ['학원가', '5호선', '안전한동네'] },
  { id: 'seoul-8', name: '노원 상계동', lat: 37.6555, lng: 127.0628, basePrice: 6500, tags: ['4-7호선', '가성비', '등산'] },
  { id: 'seoul-9', name: '강서 마곡', lat: 37.5601, lng: 126.8252, basePrice: 10500, tags: ['9호선', 'LG사이언스', '평지'] },
  { id: 'seoul-10', name: '영등포 당산', lat: 37.5342, lng: 126.9016, basePrice: 8500, tags: ['2-9호선', '교통요지', '한강인접'] },
  { id: 'seoul-11', name: '종로 광화문', lat: 37.5704, lng: 126.9768, basePrice: 14000, tags: ['도심직주근접', '역사유적', '5호선'] },
  { id: 'seoul-12', name: '서초 방배', lat: 37.4813, lng: 126.9975, basePrice: 13500, tags: ['서초학군', '내방역', '조용한'] },
  { id: 'seoul-13', name: '동작 사당', lat: 37.4765, lng: 126.9816, basePrice: 9000, tags: ['2-4호선', '교통허브', '등산로'] },
  { id: 'seoul-14', name: '광진 건대', lat: 37.5404, lng: 127.0692, basePrice: 8800, tags: ['대학가', '2-7호선', '활기찬'] },
  { id: 'seoul-15', name: '성북 길음', lat: 37.6034, lng: 127.0250, basePrice: 7500, tags: ['4호선', '뉴타운', '경사로'] },
  { id: 'seoul-16', name: '은평 연신내', lat: 37.6190, lng: 126.9210, basePrice: 6000, tags: ['3-6호선', 'GTX호재', '산세권'] },
  { id: 'seoul-17', name: '관악 신림', lat: 37.4844, lng: 126.9297, basePrice: 5500, tags: ['2호선', '청년인구', '가성비'] },
  { id: 'seoul-18', name: '동대문 청량리', lat: 37.5814, lng: 127.0489, basePrice: 8200, tags: ['환승거점', '개발호재', '평지'] },

  // 경기
  { id: 'gyeonggi-1', name: '분당 정자동', lat: 37.3614, lng: 127.1114, basePrice: 12500, tags: ['카페거리', '신분당선', '명품인프라'] },
  { id: 'gyeonggi-2', name: '분당 서현동', lat: 37.3850, lng: 127.1235, basePrice: 11000, tags: ['서현역', '수인분당', '정주여건'] },
  { id: 'gyeonggi-3', name: '수지 죽전', lat: 37.3321, lng: 127.1102, basePrice: 7800, tags: ['수인분당', '단국대', '자연친화'] },
  { id: 'gyeonggi-4', name: '수원 광교', lat: 37.2977, lng: 127.0694, basePrice: 11500, tags: ['호수공원', '신분당선', '신도시'] },
  { id: 'gyeonggi-5', name: '일산 정발산', lat: 37.6595, lng: 126.7733, basePrice: 7000, tags: ['3호선', '호수공원', '저밀도'] },
  { id: 'gyeonggi-6', name: '안양 평촌', lat: 37.3943, lng: 126.9568, basePrice: 9200, tags: ['학원가', '4호선', '살기좋은'] },
  { id: 'gyeonggi-7', name: '과천 중앙동', lat: 37.4293, lng: 126.9897, basePrice: 15500, tags: ['준강남', '4호선', '관악산'] },
  { id: 'gyeonggi-8', name: '하남 미사', lat: 37.5645, lng: 127.1873, basePrice: 9800, tags: ['5호선', '한강공원', '신축위주'] },
  { id: 'gyeonggi-9', name: '남양주 다산', lat: 37.6121, lng: 127.1654, basePrice: 7200, tags: ['신도시', '공원많음', '정온한'] },
  { id: 'gyeonggi-10', name: '김포 풍무', lat: 37.6124, lng: 126.7326, basePrice: 5800, tags: ['골드라인', '평지', '가성비'] },
  { id: 'gyeonggi-11', name: '판교 백현동', lat: 37.3948, lng: 127.1111, basePrice: 18000, tags: ['현대백화점', '신분당선', 'IT허브'] },

  // 인천
  { id: 'incheon-1', name: '연수 송도', lat: 37.3851, lng: 126.6434, basePrice: 8500, tags: ['국제도시', '해안권', '센트럴파크'] },
  { id: 'incheon-2', name: '서구 청라', lat: 37.5303, lng: 126.6521, basePrice: 7500, tags: ['호수공원', '계획도시', '조용한'] },
  { id: 'incheon-3', name: '부평역 인근', lat: 37.4895, lng: 126.7248, basePrice: 5200, tags: ['1호선', '인천1호선', '번화가'] },
];
