import { useNavigate } from 'react-router-dom'
import { FaGithub, FaInstagram } from 'react-icons/fa'

interface WorkHeaderProps {
  instagramUrl?: string
  githubUrl?: string
}

export default function WorkHeader({
  instagramUrl,
  githubUrl,
}: WorkHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 pt-2 pb-4">
      <div className="flex items-center justify-between">
        {/* Back */}
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="text-[#5A4A3C] hover:text-black transition cursor-pointer"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 오른쪽 아이콘들 */}
        <div className="flex items-center gap-3">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#56493A] hover:text-black transition"
              aria-label="Instagram"
            >
              <FaInstagram size={22} />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#56493A] hover:text-black transition"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
