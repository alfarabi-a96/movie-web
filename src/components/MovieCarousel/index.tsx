import React, { useRef, useEffect } from 'react'
import type { MovieListItem } from '../../types'
import { MovieCard } from '../MovieCard'
import './index.css'

interface MovieCarouselProps {
  movies: MovieListItem[]
  title: string
  onLoadMore?: () => void
  isLoading?: boolean
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  movies,
  title,
  onLoadMore,
  isLoading = false
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScroll =
        scrollContainerRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      })
    }
  }

  // Infinite scroll: Load more movies when scrolled 80% to the right
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      const scrollPercentage = (scrollLeft + clientWidth) / scrollWidth

      // Trigger load more when scrolled 80% to the right
      if (scrollPercentage > 0.8 && !isLoading && onLoadMore) {
        onLoadMore()
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [isLoading, onLoadMore])

  return (
    <section className='movie-carousel'>
      <h2 className='movie-carousel__title'>{title}</h2>

      <div className='movie-carousel__container'>
        <button
          className='movie-carousel__chevron movie-carousel__chevron--left'
          onClick={() => scroll('left')}
          aria-label='Scroll left'
        >
          &#10094;
        </button>

        <div
          className='movie-carousel__scroll-container'
          ref={scrollContainerRef}
        >
          <div className='movie-carousel__content' ref={contentRef}>
            {movies.map((movie) => (
              <div key={movie.id} className='movie-carousel__item'>
                <MovieCard movie={movie} />
              </div>
            ))}
            {isLoading && (
              <div className='movie-carousel__loading'>Loading...</div>
            )}
          </div>
        </div>

        <button
          className='movie-carousel__chevron movie-carousel__chevron--right'
          onClick={() => scroll('right')}
          aria-label='Scroll right'
        >
          &#10095;
        </button>
      </div>
    </section>
  )
}
