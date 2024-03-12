/* eslint-disable @typescript-eslint/no-explicit-any */
import { GameDetailField } from '../../interface/gameInterface';


declare global {
    interface Window {
        kakao: any;
    }
}
const { kakao } = window;

// 지도 생성
export const displayMap = () => {
    const container = document.getElementById("map");

    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 7,
    };
    return new kakao.maps.Map(container, options);
};

export const displayZoomControls = (map: any) => {
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

}

export const displayAllGamesOnMap = (allGamesData: any, map: any, geocoder: any) => {

    return allGamesData?.data.map((match: GameDetailField) => {

        geocoder.addressSearch(
            match.court.address,
            function (result: any, status: boolean) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new window.kakao.maps.LatLng(
                        result[0].y,
                        result[0].x
                    );

                    const content = customInfoContent(match); // html element content
                    const overlayoption = displayCustomInfoWindow(map, coords, content); //display custom infobox
                    closeOverlay(content, overlayoption, map, match);

                    map.setCenter(coords);
                }
            }
        );
    });


}

export const onClickRelocateMapPosition = (geocoder: any, address: any, map: any) => {

    return geocoder.addressSearch(
        address,
        function (result: any, status: boolean) {
            if (status === kakao.maps.services.Status.OK) {
                new window.kakao.maps.LatLng(
                    result[0].y,
                    result[0].x
                );
                moveMapToLocation(map, result[0].y, result[0].x);
            }
        }
    );
}





export const moveMapToLocation = (map: any, latitude: any, longitude: any) => {
    const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
    map.setCenter(moveLatLon);
    console.log('relocation')

    return moveLatLon

};


export const displayCustomInfoWindow = (map: any, coords: any, content: any) => {

    const customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: coords,
        content: content,
    })

    customOverlay.setMap(map);



    return customOverlay
}

export const displayModalInfoWindow = (map: any, content: any) => {
    const centerCoords = map.getCenter();

    const customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: centerCoords,
        content: content,
    })
    customOverlay.setMap(map);
    return customOverlay
}


export const closeDisplayModalInfoWindow = (map: any, content: any) => {
    const customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        content: content,
    })

    kakao.maps.event.addListener(content, 'click', function () {
        customOverlay.setMap(null);
    });

    return customOverlay
}



export const closeOverlay = (customOverlay: any, customOverlayOption: any, map: any, match: any) => {
    const modalInfo = (match: any) => {
        return (
            '<div class="bg-white p-4 flex flex-col justify-around text-sm shadow-lg w-[244px] h-[192px] rounded-xl">' +
            '    <div class="flex justify-between">' +
            '        <p class="font-bold text-lg truncate">' + match.title + '</p>' +
            '        <button onclick=closeModalButton() class="text-md font-bold bg-[#9C99B0] p-1 w-5 h-5 rounded-full flex items-center justify-center">' +
            '            <p class="text-white">x</p>' +
            '        </button>' +
            '    </div>' +
            '    <div>' +
            '        <p style="white-space: normal;">' + match.court.address + ' ' + match.court.address_detail + '</p>' +
            '    </div>' +
            '    <a href="/games/detail/' + match.id + '" class="bg-[#4065F6] h-[40px] flex items-center justify-center text-white rounded-sm">' +
            '        참가하기' +
            '    </a>' +
            '</div>'
        );
    };

    customOverlay.addEventListener("click", () => {
        customOverlayOption.setMap(null);
        console.log('closed custom overlay')
        console.log('open modal')
        const openModalContent = modalInfo(match);
        displayModalInfoWindow(map, openModalContent);

    });

}



export const customInfoContent = (match: any) => {
    const div = document.createElement('div');

    div.setAttribute('key', match.id);
    div.classList.add('bg-white', 'w-[80px]', 'p-2', 'text-center', 'rounded-xl');
    const contentContainer = document.createElement('div'); // Create a container for the content
    div.appendChild(contentContainer);


    const p1 = document.createElement('p');
    p1.classList.add('text-[10px]', 'text-center', 'text-[#999]');
    p1.textContent = match.starttime.slice(0, -3);
    contentContainer.appendChild(p1);

    const p2 = document.createElement('p');
    p2.classList.add('text-[12px]', 'text-center', 'text-[#999]');
    p2.textContent = match.court.address_detail;
    contentContainer.appendChild(p2);

    const p3 = document.createElement('p');
    p3.classList.add('font-bold', 'text-[14px]');
    p3.textContent = `${match.fee.toLocaleString("ko-KR", { currency: "KRW" })}원`;
    contentContainer.appendChild(p3);
    return div;
}



export const closeModalPopup = (customOverlay: any) => {

    customOverlay.setMap(null);

    console.log('closed modal')



}