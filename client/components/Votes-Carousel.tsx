import FavLang from './FavLang'
import Slider, { CustomArrowProps } from 'react-slick'
import LeastFavLang from './Least-Fav-Lang.tsx'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const PrevArrow = ({ onClick }: CustomArrowProps) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      width: '50px',
      height: '50px',
      backgroundColor: '#ffffff',
      border: '2px solid #3b82f6',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px -1px rgba(30, 64, 175, 0.1)',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1e40af'
      ;(e.currentTarget as HTMLButtonElement).style.color = 'white'
    }}
    onMouseLeave={(e) => {
      ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'
      ;(e.currentTarget as HTMLButtonElement).style.color = '#1e40af'
    }}
  >
    ‹
  </button>
)

const NextArrow = ({ onClick }: CustomArrowProps) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      width: '50px',
      height: '50px',
      backgroundColor: '#ffffff',
      border: '2px solid #3b82f6',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px -1px rgba(30, 64, 175, 0.1)',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1e40af'
      ;(e.currentTarget as HTMLButtonElement).style.color = 'white'
    }}
    onMouseLeave={(e) => {
      ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'
      ;(e.currentTarget as HTMLButtonElement).style.color = '#1e40af'
    }}
  >
    ›
  </button>
)

function Carousel() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <FavLang />
        </div>
        <div>
          <LeastFavLang />
        </div>
      </Slider>
    </div>
  )
}

export default Carousel
