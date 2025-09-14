import FavLang from './FavLang'
import Slider from 'react-slick'
import LeastFavLang from './Least-Fav-Lang.tsx'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Carousel() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
  }

  return (
    <Slider {...settings}>
      <FavLang />
      <LeastFavLang />
    </Slider>
  )
}

export default Carousel
