import { Columns3, List, ShieldPlus, TrendingDown, TrendingUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface DropdownFiltersProductsProps {
  setViewType: (type: 'list' | 'grid') => void
  setSelectedSort: (sort: 'highPrice' | 'lowPrice' | 'highCoverage' | 'popular') => void
  selectedSort: 'highPrice' | 'lowPrice' | 'highCoverage' | 'popular'
}

const DropdownFiltersProducts = ({ setViewType, setSelectedSort, selectedSort }: DropdownFiltersProductsProps) => {
  const { t } = useTranslation(['products'])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleListView = () => {
    setViewType('list')
    setIsDropdownOpen(false)
  }

  const handleGridView = () => {
    setViewType('grid')
    setIsDropdownOpen(false)
  }

  const handleCheapestFirst = () => {
    setSelectedSort('lowPrice')
    setIsDropdownOpen(false)
  }

  const handleHighestCoverageFirst = () => {
    setSelectedSort('highCoverage')
    setIsDropdownOpen(false)
  }

  const handleMostExpensiveFirst = () => {
    setSelectedSort('highPrice')
    setIsDropdownOpen(false)
  }

  const handleMostPopularFirst = () => {
    setSelectedSort('popular')
    setIsDropdownOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative text-left hidden md:flex">
      <div>
        <button
          type="button"
          className="px-4 py-1 rounded-md inline-flex w-full justify-center gap-x-2 text-sm/12 align-middle font-medium text-gray-600 hover:text-gray-900 bg-zinc-100 border"
          onClick={toggleDropdown}
        >
          {t('label-filters')}
          <svg
            className={`-mr-1 w-5 h-5 text-gray-600 hover:text-gray-900 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-10 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5" role="menu">
          <div className="py-1">
            <button
              type="button"
              className="w-full flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-200"
              onClick={handleListView}
              onKeyDown={e => e.key === 'Enter' && handleListView()}
            >
              <List className="w-4 h-4" />
              {t('label-view-as-list')}
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-200"
              onClick={handleGridView}
              onKeyDown={e => e.key === 'Enter' && handleGridView()}
            >
              <Columns3 className="w-4 h-4" />
              {t('label-view-as-grid')}
            </button>
            <hr className="border-gray-200" />
            <button
              type="button"
              onClick={handleCheapestFirst}
              className={`flex w-full items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 ${selectedSort === 'lowPrice' ? 'font-bold bg-gray-300' : ''}`}
              onKeyDown={e => e.key === 'Enter' && handleCheapestFirst()}
            >
              <TrendingDown className="w-3 h-3" />
              {t('label-cheapest-first')}
            </button>
            <button
              type="button"
              onClick={handleHighestCoverageFirst}
              className={`flex w-full items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 ${selectedSort === 'highCoverage' ? 'font-bold bg-gray-300' : ''}`}
              onKeyDown={e => e.key === 'Enter' && handleHighestCoverageFirst()}
            >
              <ShieldPlus className="w-4 h-4" />
              {t('label-highest-coverage-first')}
            </button>
            <button
              type="button"
              className={`flex w-full items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 ${selectedSort === 'popular' ? 'font-bold bg-gray-300' : ''}`}
              role="menuitem"
              onClick={handleMostPopularFirst}
              onKeyDown={e => e.key === 'Enter' && handleMostPopularFirst()}
            >
              <List className="w-4 h-4" />
              {t('label-most-popular-first')}
            </button>
            <button
              type="button"
              onClick={handleMostExpensiveFirst}
              className={`flex w-full items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 ${selectedSort === 'highPrice' ? 'font-bold bg-gray-300' : ''}`}
              onKeyDown={e => e.key === 'Enter' && handleMostExpensiveFirst()}
            >
              <TrendingUp className="w-4 h-4" />
              {t('label-most-expensive-first')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownFiltersProducts
