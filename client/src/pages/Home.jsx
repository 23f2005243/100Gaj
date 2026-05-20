import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import RealEstateBackground from '../components/RealEstateBackground';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <RealEstateBackground variant="home" />
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl animate-[float_3s_ease-in-out_infinite]'>
          Find your next <span className='text-light-blue-500'>perfect</span>
          <br />
          place with <span className='gradient-text'>ease</span>
        </h1>
        <div className='text-gray-500 text-xs sm:text-sm bg-white/60 p-4 rounded-xl backdrop-blur-sm shadow-md'>
          100 GajEstate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-light-orange-500 font-bold hover:text-light-orange-400 hover:scale-105 transition-all duration-300 inline-block w-max'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px] hover:scale-[1.01] transition-transform duration-500'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className='bg-white/70 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-light-blue-600'>Recent offers</h2>
              <Link className='text-sm text-light-orange-500 hover:text-light-orange-400 hover:translate-x-2 transition-all duration-200' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className='bg-white/70 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-light-blue-600'>Recent places for rent</h2>
              <Link className='text-sm text-light-orange-500 hover:text-light-orange-400 hover:translate-x-2 transition-all duration-200' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className='bg-white/70 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-light-blue-600'>Recent places for sale</h2>
              <Link className='text-sm text-light-orange-500 hover:text-light-orange-400 hover:translate-x-2 transition-all duration-200' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
