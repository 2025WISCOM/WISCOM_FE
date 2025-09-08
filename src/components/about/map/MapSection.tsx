const MapSection = () => {
  return (
    <div className="w-full max-w-[320px] px-7 items-center py-3">
      <div
        style={{
          font: 'normal normal 400 12px/normal dotum, sans-serif',
          width: '320px',
          height: '252px',
          color: '#333',
          position: 'relative',
        }}
      >
        <div style={{ height: '220px' }}>
          <a
            href="https://map.kakao.com/?urlX=510590.00000000175&urlY=1154375&itemId=1631941533&q=%EC%84%9C%EC%9A%B8%EC%B0%BD%EC%97%85%ED%97%88%EB%B8%8C%20%EC%B0%BD%EB%8F%99&srcid=1631941533&map_type=TYPE_MAP&from=roughmap"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="map"
              src="http://t1.daumcdn.net/roughmap/imgmap/737c017f3e69d8abd9e49c7609e571d4ce78faaf2696c5fb28688704123b9dff"
              width="318"
              height="218"
              style={{ border: '1px solid #ccc' }}
              alt="창동창업허브 지도"
            />
          </a>
        </div>
        <div
          style={{
            overflow: 'hidden',
            padding: '7px 11px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '0 0 2px 2px',
            backgroundColor: 'rgb(249, 249, 249)',
          }}
        >
          <a
            href="https://map.kakao.com"
            target="_blank"
            rel="noreferrer"
            style={{ float: 'left' }}
          >
            <img
              src="//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png"
              width="72"
              height="16"
              alt="카카오맵"
              style={{ display: 'block', width: '72px', height: '16px' }}
            />
          </a>
          <div
            style={{
              float: 'right',
              position: 'relative',
              top: '1px',
              fontSize: '11px',
            }}
          >
            <a
              target="_blank"
              rel="noreferrer"
              href="https://map.kakao.com/?from=roughmap&srcid=1631941533&confirmid=1631941533&q=%EC%84%9C%EC%9A%B8%EC%B0%BD%EC%97%85%ED%97%88%EB%B8%8C%20%EC%B0%BD%EB%8F%99&rv=on"
              style={{
                float: 'left',
                height: '15px',
                paddingTop: '1px',
                lineHeight: '15px',
                color: '#000',
                textDecoration: 'none',
              }}
            >
              로드뷰
            </a>
            <span
              style={{
                width: '1px',
                margin: '0 8px 0 9px',
                height: '11px',
                position: 'relative',
                top: '2px',
                borderLeft: '1px solid #d0d0d0',
                float: 'left',
              }}
            />
            <a
              target="_blank"
              rel="noreferrer"
              href="https://map.kakao.com/?from=roughmap&eName=%EC%84%9C%EC%9A%B8%EC%B0%BD%EC%97%85%ED%97%88%EB%B8%8C%20%EC%B0%BD%EB%8F%99&eX=510590.00000000175&eY=1154375"
              style={{
                float: 'left',
                height: '15px',
                paddingTop: '1px',
                lineHeight: '15px',
                color: '#000',
                textDecoration: 'none',
              }}
            >
              길찾기
            </a>
            <span
              style={{
                width: '1px',
                margin: '0 8px 0 9px',
                height: '11px',
                position: 'relative',
                top: '2px',
                borderLeft: '1px solid #d0d0d0',
                float: 'left',
              }}
            />
            <a
              target="_blank"
              rel="noreferrer"
              href="https://map.kakao.com?map_type=TYPE_MAP&from=roughmap&srcid=1631941533&itemId=1631941533&q=%EC%84%9C%EC%9A%B8%EC%B0%BD%EC%97%85%ED%97%88%EB%B8%8C%20%EC%B0%BD%EB%8F%99&urlX=510590.00000000175&urlY=1154375"
              style={{
                float: 'left',
                height: '15px',
                paddingTop: '1px',
                lineHeight: '15px',
                color: '#000',
                textDecoration: 'none',
              }}
            >
              지도 크게 보기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapSection
