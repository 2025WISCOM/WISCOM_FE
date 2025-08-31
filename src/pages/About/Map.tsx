import MapSection from '../../components/about/map/MapSection'
import MapInfo from '../../components/about/map/MapInfo'
import NavBar from '../../components/about/NavBar'

const Map = () => {
  return (
    <div className="font-[Pretendard] min-h-screen flex flex-col">
      <NavBar />
      <MapSection />
      <MapInfo />
    </div>
  )
}

export default Map
