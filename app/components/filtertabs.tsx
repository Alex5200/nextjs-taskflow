

const FilterTabs = () => {
    return(
        <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button className="px-4 py-2 font-medium text-sm border-b-2 border-blue-500 text-blue-600 dark:text-blue-400">
                Все
            </button>
            <button className="px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Активные
            </button>
            <button className="px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Завершенные
            </button>
        </div>
        )
}
export default FilterTabs