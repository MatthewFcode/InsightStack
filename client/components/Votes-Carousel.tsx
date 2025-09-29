// import FavLang from './FavLang'
// import Slider, { CustomArrowProps } from 'react-slick'
// import LeastFavLang from './Least-Fav-Lang.tsx'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

// const PrevArrow = ({ onClick }: CustomArrowProps) => (
//   <button
//     onClick={onClick}
//     style={{
//       position: 'absolute',
//       left: '10px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       zIndex: 2,
//       width: '50px',
//       height: '50px',
//       backgroundColor: '#ffffff',
//       border: '2px solid #3b82f6',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       boxShadow: '0 4px 6px -1px rgba(30, 64, 175, 0.1)',
//       transition: 'all 0.3s ease',
//     }}
//     onMouseEnter={(e) => {
//       ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1e40af'
//       ;(e.currentTarget as HTMLButtonElement).style.color = 'white'
//     }}
//     onMouseLeave={(e) => {
//       ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'
//       ;(e.currentTarget as HTMLButtonElement).style.color = '#1e40af'
//     }}
//   >
//     ‹
//   </button>
// )

// const NextArrow = ({ onClick }: CustomArrowProps) => (
//   <button
//     onClick={onClick}
//     style={{
//       position: 'absolute',
//       right: '10px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       zIndex: 2,
//       width: '50px',
//       height: '50px',
//       backgroundColor: '#ffffff',
//       border: '2px solid #3b82f6',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       boxShadow: '0 4px 6px -1px rgba(30, 64, 175, 0.1)',
//       transition: 'all 0.3s ease',
//     }}
//     onMouseEnter={(e) => {
//       ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1e40af'
//       ;(e.currentTarget as HTMLButtonElement).style.color = 'white'
//     }}
//     onMouseLeave={(e) => {
//       ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'
//       ;(e.currentTarget as HTMLButtonElement).style.color = '#1e40af'
//     }}
//   >
//     ›
//   </button>
// )

// function Carousel() {
//   const settings = {
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     prevSlider: <PrevArrow />,
//     nextSlider: <NextArrow />,
//   }

//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         <div>
//           <FavLang />
//         </div>
//         <div>
//           <LeastFavLang />
//         </div>
//       </Slider>
//     </div>
//   )
// }

// export default Carousel

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
      left: '5px', // Closer to edge on mobile
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      width: '40px', // Smaller for mobile
      height: '40px',
      backgroundColor: '#ffffff',
      border: '2px solid #3b82f6',
      borderRadius: '50%', // Circular for mobile
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px -1px rgba(30, 64, 175, 0.1)',
      transition: 'all 0.3s ease',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e40af',
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
      right: '5px', // Closer to edge on mobile
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      width: '40px', // Smaller for mobile
      height: '40px',
      backgroundColor: '#ffffff',
      border: '2px solid #3b82f6',
      borderRadius: '50%', // Circular for mobile
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px -1px rgba(30, 64, 175, 0.1)',
      transition: 'all 0.3s ease',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e40af',
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
    <div
      className="slider-container"
      style={{
        width: '100%',
        maxWidth: '70rem',
        margin: '2rem auto 0',
        padding: '0 10px', // Add padding for mobile
      }}
    >
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
