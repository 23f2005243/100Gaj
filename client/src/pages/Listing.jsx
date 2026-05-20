import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';
import { useSelector } from "react-redux";

import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

const Listing = () => {

    SwiperCore.use([Navigation]);

    const params = useParams();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const [liked, setLiked] = useState(false);

    const { currentUser } = useSelector((state) => state.user);
    console.log(listing);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const { fetchJson } = await import("../utils/fetchJson.js");
                const data = await fetchJson(`/api/listing/get/${params.listingId}`);
                if (!data) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setListing(data);
                setLoading(false);
                setError(false);

            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };


        fetchListing();

    }, [params.listingId]);

    return (
        <main className="min-h-screen bg-slate-50">
            {loading && (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-light-blue-500"></div>
                </div>
            )}
            {error && (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <p className="text-2xl text-red-600 mb-2">Something went wrong!</p>
                        <p className="text-slate-500">Please try again later</p>
                    </div>
                </div>
            )}

            {listing && !loading && !error && (
                <div>
                    {/* Image Slider with Overlay */}
                    <div className="relative">
                        <Swiper navigation>
                            {listing.imageUrls.map((url) => (
                                <SwiperSlide key={url}>
                                    <div
                                        className="h-[60vh] md:h-[70vh]"
                                        style={{
                                            background: `url(${url}) center no-repeat`,
                                            backgroundSize: "cover",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Action Buttons */}
                        <div className="absolute top-24 md:top-32 right-4 flex flex-col gap-3 z-10">
                            <div 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="cursor-pointer bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
                            >
                                <FaShare className="text-slate-600" />
                            </div>
                            
                        </div>

                        {copied && (
                            <p className="absolute top-36 md:top-40 right-4 z-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-float">
                                Link Copied!
                            </p>
                        )}

                        {/* Property Type Badge */}
                        <div className="absolute bottom-8 left-4 z-10">
                            <span className={`px-6 py-3 rounded-xl font-semibold shadow-lg ${
                                listing.type === 'rent' 
                                    ? 'bg-blue-200 text-slate-700' 
                                    : 'bg-orange-200 text-slate-700'
                            }`}>
                                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </span>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="max-w-6xl mx-auto p-4 md:p-6 -mt-10 relative z-20">
                        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-2">
                                        {listing.name}
                                    </h1>
                                    <p className="flex items-center gap-2 text-slate-600">
                                        <FaMapMarkerAlt className="text-light-orange-500" />
                                        {listing.address}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl md:text-4xl font-bold text-light-blue-600">
                                        ₹ {''}
                                        {listing.offer
                                            ? listing.discountPrice.toLocaleString('en-US')
                                            : listing.regularPrice.toLocaleString('en-US')}
                                    </p>
                                    {listing.type === 'rent' && (
                                        <p className="text-slate-500">/ month</p>
                                    )}
                                </div>
                            </div>

                            {/* Discount Badge */}
                            {listing.offer && (
                                <div className="inline-flex items-center gap-2 bg-green-200 text-slate-700 px-4 py-2 rounded-lg mb-6">
                                    <span className="font-bold">Save ₹ {(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')}</span>
                                </div>
                            )}

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl text-center hover:shadow-md transition-all">
                                    <FaBed className="w-6 h-6 text-light-blue-500 mx-auto mb-2" />
                                    <p className="font-bold text-slate-800">
                                        {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl text-center hover:shadow-md transition-all">
                                    <FaBath className="w-6 h-6 text-light-blue-500 mx-auto mb-2" />
                                    <p className="font-bold text-slate-800">
                                        {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl text-center hover:shadow-md transition-all">
                                    <FaParking className="w-6 h-6 text-light-blue-500 mx-auto mb-2" />
                                    <p className="font-bold text-slate-800">
                                        {listing.parking ? 'Parking' : 'No Parking'}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl text-center hover:shadow-md transition-all">
                                    <FaChair className="w-6 h-6 text-light-blue-500 mx-auto mb-2" />
                                    <p className="font-bold text-slate-800">
                                        {listing.furnished ? 'Furnished' : 'Unfurnished'}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-800 mb-3">Description</h2>
                                <p className="text-slate-600 leading-relaxed">{listing.description}</p>
                            </div>

                            {/* Contact Button */}
                            {currentUser && listing.userRef !== currentUser._id && !contact && (
                                <button
                                    onClick={() => setContact(true)}
                                    className="w-full bg-blue-200 text-slate-700 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.01] transition-all text-lg"
                                >
                                    Contact Landlord
                                </button>
                            )}

                            {!currentUser && !contact && (
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-center">
                                    <p className="text-yellow-800">Please sign in to contact the landlord</p>
                                </div>
                            )}

                            {contact && <Contact listing={listing} />}
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export default Listing;
