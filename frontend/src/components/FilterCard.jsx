import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters, clearFilters } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        key: "location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        key: "industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary Range",
        key: "salary",
        array: ["0-6 LPA", "6-12 LPA", "12-25 LPA", "25+ LPA"]
    },
]

const FilterCard = () => {
    const dispatch = useDispatch();
    const { filters } = useSelector(store => store.job);

    const handleFilterChange = (key, value) => {
        dispatch(setFilters({ [key]: value }));
    }

    const handleClearFilters = () => {
        dispatch(clearFilters());
    }

    const hasActiveFilters = filters.location || filters.industry || filters.salary;

    return (
        <div className='w-full bg-white p-5 rounded-lg border border-gray-100 shadow-sm'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg text-gray-900'>Filter Jobs</h1>
                {hasActiveFilters && (
                    <Button 
                        onClick={handleClearFilters} 
                        variant="ghost" 
                        className="text-xs text-red-500 hover:text-red-700 h-8 px-2 font-medium"
                    >
                        Clear All
                    </Button>
                )}
            </div>
            <hr className='mt-3 mb-4 border-gray-100' />
            <div className='space-y-6'>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h2 className='font-semibold text-sm text-gray-700 mb-2'>{data.filterType}</h2>
                            <RadioGroup 
                                value={filters[data.key] || ''} 
                                onValueChange={(value) => handleFilterChange(data.key, value)}
                            >
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div key={itemId} className='flex items-center space-x-2 my-1.5 hover:translate-x-0.5 transition-transform duration-200'>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label 
                                                    htmlFor={itemId} 
                                                    className="text-sm font-medium text-gray-600 cursor-pointer"
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard