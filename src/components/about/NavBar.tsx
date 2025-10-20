import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Introduction', path: '/about/introduction' },
  { label: 'Congratulation', path: '/about/congratulation' },
  { label: 'Developer', path: '/about/developer' },
  { label: 'Map', path: '/about/map' },
]

const NavBar = () => {
  return (
    <nav className="static flex justify-center border-b border-[#B19D87] text-[#42372C] px-3">
      <ul className="flex space-x-3.5 text-sm max-[400px]:space-x-2.5 max-[400px]:text-xs">
        {tabs.map((tab) => (
          <li key={tab.path} className="pb-[10px]">
            <NavLink
              to={tab.path}
              className={({ isActive }) =>
                `cursor-pointer px-1 transition-colors duration-200 pb-2
                 ${
                   isActive
                     ? 'border-b-[5px] border-[#8F7860] font-medium text-[#42372C]'
                     : 'text-[#B19D87]'
                 }`
              }
              end
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
