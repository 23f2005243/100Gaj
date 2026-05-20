import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaMoneyBillWave, FaHome, FaToggleOn, FaToggleOff, FaUndo } from 'react-icons/fa';

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc',
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    console.log(sidebardata);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (location.search) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'createdAt',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            setError(null);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            try {
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                if (!res.ok) {
                    throw new Error(`Server returned ${res.status}`);
                }
                const data = await res.json();
                if (!Array.isArray(data)) {
                    throw new Error('Unexpected API response');
                }
                if (data.length > 8) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
                setListings(data);
            } catch (fetchError) {
                console.error(fetchError);
                setError('Unable to load listings. Please make sure the backend is running.');
                setListings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [location.search]);

    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sale'
        ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleReset = () => {
        setSidebardata({
            searchTerm: '',
            type: 'all',
            parking: false,
            furnished: false,
            offer: false,
            sort: 'createdAt',
            order: 'desc',
        });
        navigate('/search');
    };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        try {
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            if (!res.ok) {
                throw new Error(`Server returned ${res.status}`);
            }
            const data = await res.json();
            if (!Array.isArray(data)) {
                throw new Error('Unexpected API response');
            }
            if (data.length < 9) {
                setShowMore(false);
            }
            setListings([...listings, ...data]);
        } catch (fetchError) {
            console.error(fetchError);
            setError('Unable to load more listings. Please check your backend connection.');
        }
    };

    // Toggle component
    const Toggle = ({ checked, onChange, label, id }) => (
        <div 
            onClick={() => onChange({ target: { id: id || label.toLowerCase(), checked: !checked, type: 'checkbox' } })}
            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                checked 
                    ? 'bg-blue-100 border border-blue-300' 
                    : 'bg-slate-100 border border-slate-200 hover:border-slate-300'
            }`}
        >
            <span className={`font-medium ${checked ? 'text-slate-800' : 'text-slate-600'}`}>{label}</span>
            {checked ? (
                <FaToggleOn className="w-6 h-6 text-light-blue-500" />
            ) : (
                <FaToggleOff className="w-6 h-6 text-slate-400" />
            )}
        </div>
    );

    // Type button component
    const TypeButton = ({ id, label, icon }) => (
        <button
            type="button"
            id={id}
            onClick={handleChange}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-medium transition-all duration-300 ${
                sidebardata.type === id
                    ? 'bg-blue-200 text-slate-700 shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
        >
            <span className="w-4 h-4" aria-hidden>{icon ? icon({}) : null}</span>
            {label}
        </button>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
            {/* Mobile Toggle */}
            <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-20 right-4 z-50 bg-light-blue-500 text-white p-3 rounded-full shadow-lg"
            >
                <FaFilter />
            </button>

            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-40 w-full md:w-80 transition-transform duration-300`}>
                <div className="p-7 border-b-2 md:border-r-2 md:border-b-0 md:min-h-screen bg-white shadow-xl md:shadow-none">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-blue-200 rounded-xl flex items-center justify-center">
                            <FaSearch className="text-slate-700" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Search Filters</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Search Term */}
                        <div>
                            <label className="whitespace-nowrap font-semibold text-slate-700 mb-2 block">
                                Search Term
                            </label>
                            <div className="relative">
                                <FaHome className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    id="searchTerm"
                                    placeholder="Search property..."
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent transition-all"
                                    value={sidebardata.searchTerm}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Property Type */}
                        <div>
                            <label className="font-semibold text-slate-700 mb-3 block">Property Type</label>
                            <div className="flex gap-2">
                                <TypeButton id="all" label="All" icon={FaHome} />
                                <TypeButton id="rent" label="Rent" icon={FaMoneyBillWave} />
                                <TypeButton id="sale" label="Sale" icon={FaHome} />
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="font-semibold text-slate-700 mb-3 block">Amenities</label>
                            <div className="flex flex-col gap-2">
                                <Toggle checked={sidebardata.parking} onChange={handleChange} label="Parking" id="parking" />
                                <Toggle checked={sidebardata.furnished} onChange={handleChange} label="Furnished" id="furnished" />
                                <Toggle checked={sidebardata.offer} onChange={handleChange} label="Special Offer" id="offer" />
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="font-semibold text-slate-700 mb-2 block">Sort By</label>
                            <select
                                onChange={handleChange}
                                value={`${sidebardata.sort}_${sidebardata.order}`}
                                id="sort_order"
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="regularPrice_desc">Price: High to Low</option>
                                <option value="regularPrice_asc">Price: Low to High</option>
                                <option value="createdAt_desc">Latest First</option>
                                <option value="createdAt_asc">Oldest First</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                            <button 
                                type="submit"
                                className="flex-1 bg-blue-200 text-slate-700 p-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
                            >
                                Search
                            </button>
                            <button 
                                type="button"
                                onClick={handleReset}
                                className="bg-slate-200 text-slate-600 p-3 rounded-xl hover:bg-slate-300 transition-all"
                            >
                                <FaUndo />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Results */}
            <div className="flex-1 p-4 md:p-7">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 bg-orange-200 rounded-xl flex items-center justify-center">
                        <FaHome className="text-slate-700" />
                    </span>
                    Listing results: <span className="text-light-blue-500">{listings.length}</span>
                </h1>

                <div className="flex flex-wrap gap-4">
                    {error && (
                        <div className="w-full bg-red-50 border border-red-200 p-6 rounded-xl text-center">
                            <p className="text-xl text-red-600">{error}</p>
                        </div>
                    )}
                    {!loading && !error && listings.length === 0 && (
                        <div className="w-full bg-white p-10 rounded-xl shadow text-center">
                            <p className="text-xl text-slate-600">No listings found!</p>
                            <p className="text-slate-500 mt-2">Try adjusting your search filters</p>
                        </div>
                    )}
                    {loading && (
                        <div className="w-full flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-light-blue-500"></div>
                        </div>
                    )}

                    {!loading && !error &&
                        listings &&
                        listings.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                        ))}

                    {showMore && !loading && (
                        <button
                            onClick={onShowMoreClick}
                            className="w-full bg-blue-200 text-slate-700 p-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.01] transition-all text-center"
                        >
                            Show More Listings
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
