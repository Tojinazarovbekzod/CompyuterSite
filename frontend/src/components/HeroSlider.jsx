import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    title: 'Build Your Ultimate Gaming Rig',
    subtitle: 'High-performance desktops, custom cooling, and premium finishes.',
    cta: 'Shop new drops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Workstations for Creators',
    subtitle: 'Silent power, fast storage, and refined design for content pros.',
    cta: 'Discover workstations',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Next-gen Laptops & Monitors',
    subtitle: 'Ultra-slim performance machines built for productivity and play.',
    cta: 'Explore laptops',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
  },
]

function HeroSlider() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/20 bg-slate-50 px-5 py-8 shadow-xl shadow-slate-200/10 dark:border-slate-800 dark:bg-slate-950">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
        pagination={{ clickable: true }}
        loop
        className="relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div className="space-y-6 lg:max-w-xl">
                <p className="text-sm uppercase tracking-[0.35em] text-pink-600">Premium collection</p>
                <h1 className="text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">{slide.title}</h1>
                <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">{slide.subtitle}</p>
                <button type="button" onClick={() => navigate('/products')} className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:bg-pink-700">
                  {slide.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl shadow-slate-900/30">
                <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pointer-events-none absolute inset-y-1/2 left-4 right-4 flex items-center justify-between px-2 sm:px-4">
        <button type="button" className="hero-prev pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/90 text-slate-900 shadow-lg shadow-slate-900/10 transition hover:bg-pink-600 hover:text-white dark:border-slate-700 dark:bg-slate-950 dark:text-white">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button type="button" className="hero-next pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/90 text-slate-900 shadow-lg shadow-slate-900/10 transition hover:bg-pink-600 hover:text-white dark:border-slate-700 dark:bg-slate-950 dark:text-white">
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export default HeroSlider
