document.addEventListener('DOMContentLoaded', function() {
    // 양구군청 인근 중심 좌표
    const centerLatLng = [38.1066, 127.9904];

    // 지도 생성 및 설정
    const map = L.map('map').setView(centerLatLng, 14);

    // OpenStreetMap 타일 레이어 추가
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 18개 모범 음식점 데이터 (위도/경도는 데모용 임의 좌표)
    const restaurants = [
        { name: "감람원", menu: "삼계탕", lat: 38.105, lng: 127.991 },
        { name: "광치막국수", menu: "막국수", lat: 38.108, lng: 127.989 },
        { name: "꽃보다 소 양구점", menu: "숯불구이", lat: 38.107, lng: 127.992 },
        { name: "도촌삼계탕", menu: "삼계탕", lat: 38.104, lng: 127.988 },
        { name: "도촌막국수식당", menu: "막국수", lat: 38.109, lng: 127.994 },
        { name: "돈 갈비", menu: "숯불구이", lat: 38.106, lng: 127.985 },
        { name: "모범떡볶이", menu: "떡볶이", lat: 38.103, lng: 127.993 },
        { name: "비비큐·우쿠야", menu: "치킨, 돈까스", lat: 38.105, lng: 127.995 },
        { name: "샤브향", menu: "고기류 샤브", lat: 38.108, lng: 127.987 },
        { name: "소나무함흥냉면막국수", menu: "냉면", lat: 38.102, lng: 127.990 },
        { name: "시래정", menu: "시래기정식", lat: 38.110, lng: 127.991 },
        { name: "양구수산횟집", menu: "민물회, 매운탕", lat: 38.107, lng: 127.984 },
        { name: "오래드림고원", menu: "식육", lat: 38.101, lng: 127.994 },
        { name: "이가돈가", menu: "숯불구이", lat: 38.106, lng: 127.996 },
        { name: "장수오골계", menu: "오골계구이, 탕류", lat: 38.104, lng: 127.986 },
        { name: "청참치", menu: "참치회, 바다회", lat: 38.109, lng: 127.988 },
        { name: "최가네", menu: "숯불구이", lat: 38.105, lng: 127.989 },
        { name: "회마을", menu: "바다회, 매운탕", lat: 38.103, lng: 127.992 },
    ];

    // 각 음식점 위치에 마커 및 팝업 생성
    restaurants.forEach((restaurant) => {
        const marker = L.marker([restaurant.lat, restaurant.lng]).addTo(map);

        const popupContent = `
            <div style="padding: 5px; color: #333; font-family: 'Noto Sans KR', sans-serif; min-width: 150px;">
                <h4 style="margin: 0 0 5px 0; font-size: 16px; color: #3182CE;">${restaurant.name}</h4>
                <p style="margin: 0; font-size: 13px;">🍽️ <b>주메뉴:</b> ${restaurant.menu}</p>
            </div>
        `;
        marker.bindPopup(popupContent);
    });
});
