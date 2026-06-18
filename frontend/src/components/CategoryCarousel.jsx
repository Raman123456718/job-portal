import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='my-10 px-4'>
            <Carousel className="w-full max-w-xl mx-auto relative">
                <CarouselContent className="-ml-2 md:-ml-3">
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-2 md:pl-3 basis-1/2 sm:basis-1/2 md:basis-1/3"
                        >
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full w-full font-semibold border-gray-200 text-gray-600 bg-white hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer py-5 px-6 text-sm"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="absolute left-[-40px] border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 shadow-sm" />
                <CarouselNext className="absolute right-[-40px] border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 shadow-sm" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;