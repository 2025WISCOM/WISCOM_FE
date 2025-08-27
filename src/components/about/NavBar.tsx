import { useState } from 'react'

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('Introduction')
  const tabs = ['Introduction', 'Congratulation', 'Developer', 'Map']

  return (
    <nav className="static flex justify-center border-b border-[#B19D87] text-[#42372C] px-1">
      <ul className="flex space-x-6 text-sm">
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-1 transition-colors duration-200 pb-2
              ${
                activeTab === tab
                  ? 'border-b-[5px] border-[#8F7860] font-medium text-[#42372C]'
                  : 'text-[#B19D87]'
              }`}
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
