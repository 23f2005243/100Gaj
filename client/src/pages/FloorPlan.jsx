import { useState } from 'react';
import { FaRuler, FaBed, FaBath, FaHome, FaParking, FaTree, FaEdit, FaMagic, FaDownload, FaSpinner } from 'react-icons/fa';

const FloorPlan = () => {
  const [formData, setFormData] = useState({
    plotWidth: 30,
    plotLength: 40,
    bedrooms: 2,
    bathrooms: 1,
    hasGarden: false,
    hasParking: false,
    hasHall: true,
    hasKitchen: true,
    otherRequirements: '',
  });

  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [id]: checked,
      });
    } else if (type === 'number') {
      setFormData({
        ...formData,
        [id]: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setGeneratedPlan(null);

      const res = await fetch('/api/floorplan/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setGeneratedPlan(data.imageUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-200 rounded-2xl mb-6 shadow-lg animate-float">
          <FaMagic className="w-10 h-10 text-slate-700" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          AI Floor Plan <span className="text-light-orange-400">Generator</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Enter your plot details and requirements to generate a stunning AI-powered floor plan designed just for you
        </p>
      </div>

      <main className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Plot Dimensions */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-light-orange-500 rounded-xl flex items-center justify-center">
                <FaRuler className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Plot Dimensions (feet)</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-2">Width</label>
                <input
                  type="number"
                  id="plotWidth"
                  min="10"
                  max="200"
                  value={formData.plotWidth}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-light-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-2">Length</label>
                <input
                  type="number"
                  id="plotLength"
                  min="10"
                  max="200"
                  value={formData.plotLength}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-light-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Rooms */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-light-blue-500 rounded-xl flex items-center justify-center">
                <FaBed className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Rooms</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bedrooms</label>
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bathrooms</label>
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <FaHome className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Amenities</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-3 p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/10 hover:border-light-orange-500/50">
                <input
                  type="checkbox"
                  id="hasHall"
                  checked={formData.hasHall}
                  onChange={handleChange}
                  className="w-5 h-5 accent-light-orange-500"
                />
                <span className="text-white text-sm">Living Hall</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/10 hover:border-light-orange-500/50">
                <input
                  type="checkbox"
                  id="hasKitchen"
                  checked={formData.hasKitchen}
                  onChange={handleChange}
                  className="w-5 h-5 accent-light-orange-500"
                />
                <span className="text-white text-sm">Kitchen</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/10 hover:border-light-orange-500/50">
                <input
                  type="checkbox"
                  id="hasGarden"
                  checked={formData.hasGarden}
                  onChange={handleChange}
                  className="w-5 h-5 accent-light-orange-500"
                />
                <span className="text-white text-sm flex items-center gap-1"><FaTree /> Garden</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/10 hover:border-light-orange-500/50">
                <input
                  type="checkbox"
                  id="hasParking"
                  checked={formData.hasParking}
                  onChange={handleChange}
                  className="w-5 h-5 accent-light-orange-500"
                />
                <span className="text-white text-sm flex items-center gap-1"><FaParking /> Parking</span>
              </label>
            </div>
          </div>

          {/* Other Requirements */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <FaEdit className="text-white" />
              </div>
              <label className="text-xl font-semibold text-white">
                Additional Requirements
              </label>
            </div>
            <textarea
              id="otherRequirements"
              placeholder="Enter any additional requirements like pooja room, balcony, study room, etc."
              value={formData.otherRequirements}
              onChange={handleChange}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-24 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative overflow-hidden bg-orange-200 text-slate-700 p-4 rounded-xl uppercase hover:opacity-95 disabled:opacity-80 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Generating Floor Plan...
                </>
              ) : (
                <>
                  <FaMagic />
                  Generate Floor Plan
                </>
              )}
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {error && (
            <p className="text-red-400 text-center text-lg bg-red-900/20 p-4 rounded-xl border border-red-500/30">{error}</p>
          )}
        </form>

        {/* Generated Floor Plan */}
        {generatedPlan && (
          <div className="mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl animate-float">
            <h2 className="text-2xl font-semibold text-center mb-6 text-white flex items-center justify-center gap-3">
              <span className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <FaMagic className="text-white" />
              </span>
              Your Generated Floor Plan
            </h2>
            <div className="border-4 border-white/30 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={generatedPlan}
                alt="Generated Floor Plan"
                className="w-full h-auto"
              />
            </div>
            <div className="mt-6 text-center">
              <a
                href={generatedPlan}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 hover:scale-105 transition-all font-semibold shadow-lg"
              >
                <FaDownload />
                Download Floor Plan
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FloorPlan;
