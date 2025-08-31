interface NavbarProps {
  selectedMenu: 'stamp' | 'floor'
  setSelectedMenu: React.Dispatch<React.SetStateAction<'stamp' | 'floor'>>
}

const Navbar = ({ selectedMenu, setSelectedMenu }: NavbarProps) => {
  const tabs = [
    { label: 'Booth Stamp', value: 'stamp' },
    { label: 'Floor Plan', value: 'floor' },
  ] as const

  return (
    <nav className="border-b border-[#B19D87] px-[16px]">
      <ul className="flex justify-between">
        {tabs.map((tab) => (
          <li
            key={tab.label}
            className={`pb-[10px] w-1/2 text-center cursor-pointer ${selectedMenu === tab.value ? 'text-[12px] font-medium leading-[16px] text-[#42372C] border-b border-b-[4px] border-[#8F7860]' : 'text-[15px] font-normal leading-[24px] text-[#B19D87]'}`}
            onClick={() => setSelectedMenu(tab.value)}
          >
            <div>{tab.label}</div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
