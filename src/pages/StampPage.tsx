import { useState } from 'react'
import BoothStamp from '../components/stamp/BoothStamp'
import FloorPlan from '../components/stamp/FloorPlan'
import Navbar from '../components/stamp/NavBar'

const StampPage = () => {
  const [selectedMenu, setSelectedMenu] = useState<'stamp' | 'floor'>('stamp')
  return (
    <>
      <Navbar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      {selectedMenu === 'stamp' && <BoothStamp />}
      {selectedMenu === 'floor' && <FloorPlan />}
    </>
  )
}

export default StampPage
