import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleBookParcel = () => {
    // Check if user is logged in and is a customer
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.id && user.role === "customer") {
      navigate("/customer/dashboard/book-parcel");
    } else {
      // Redirect to login if not logged in or not a customer
      navigate("/login");
    }
  };

  const handleTrackParcel = () => {
    // Check if user is logged in and is a customer
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.id && user.role === "customer") {
      navigate("/customer/dashboard/track-parcel");
    } else {
      // Redirect to login if not logged in or not a customer
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-6xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
              FastTrack Courier
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your Parcel, Our Responsibility. Fast, Safe and Reliable Delivery
              Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn btn-accent btn-lg"
                onClick={handleBookParcel}
              >
                📦 Book Parcel
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={handleTrackParcel}
              >
                🔍 Track Parcel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Track Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Quick Tracking
            </h2>
            <p className="text-lg text-base-content opacity-70">
              Track your parcel location using your tracking number
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body">
                <div className="form-control">
                  <div className="join w-full">
                    <input
                      type="text"
                      placeholder="Enter tracking number..."
                      className="input input-bordered join-item flex-1 text-lg"
                    />
                    <button
                      className="btn btn-primary join-item"
                      onClick={handleTrackParcel}
                    >
                      🔍 Track Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Our Services
            </h2>
            <p className="text-lg text-base-content opacity-70">
              All types of delivery services in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="card-title justify-center text-2xl mb-2">
                  Express Delivery
                </h3>
                <p className="text-base-content opacity-70">
                  Delivery anywhere in Dhaka within 24 hours
                </p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-primary btn-sm">Learn More</button>
                </div>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body text-center">
                <div className="text-6xl mb-4">🛡️</div>
                <h3 className="card-title justify-center text-2xl mb-2">
                  Safe Transportation
                </h3>
                <p className="text-base-content opacity-70">
                  Complete parcel security and insurance facility
                </p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-primary btn-sm">Learn More</button>
                </div>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body text-center">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="card-title justify-center text-2xl mb-2">
                  Affordable Pricing
                </h3>
                <p className="text-base-content opacity-70">
                  Highest quality service at competitive prices
                </p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-primary btn-sm">Learn More</button>
                </div>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body text-center">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="card-title justify-center text-2xl mb-2">
                  Real-Time Tracking
                </h3>
                <p className="text-base-content opacity-70">
                  24/7 online tracking and SMS updates
                </p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-primary btn-sm">Learn More</button>
                </div>
              </div>
            </div>

            {/* Service Card 5 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body text-center">
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="card-title justify-center text-2xl mb-2">
                  Business Solutions
                </h3>
                <p className="text-base-content opacity-70">
                  Special services for e-commerce and business organizations
                </p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-primary btn-sm">Learn More</button>
                </div>
              </div>
            </div>

            {/* Service Card 6 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="card-title justify-center text-2xl mb-2">
                  Nationwide Network
                </h3>
                <p className="text-base-content opacity-70">
                  Delivery service to all districts and sub-districts of
                  Bangladesh
                </p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-primary btn-sm">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary text-primary-content">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Success Statistics</h2>
            <p className="text-lg opacity-90">
              Our customer trust and service quality
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-lg opacity-90">Daily Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-lg opacity-90">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">64</div>
              <div className="text-lg opacity-90">Districts Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              How It Works
            </h2>
            <p className="text-lg text-base-content opacity-70">
              Deliver your parcel in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-primary text-primary-content rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3">Book Your Parcel</h3>
              <p className="text-base-content opacity-70">
                Book your parcel online or by phone. Provide complete
                information.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary text-secondary-content rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold mb-3">Pickup Service</h3>
              <p className="text-base-content opacity-70">
                Our team will collect the parcel from your address.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-accent text-accent-content rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold mb-3">Delivery Complete</h3>
              <p className="text-base-content opacity-70">
                Parcel will be delivered to destination on scheduled time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Customer Reviews
            </h2>
            <p className="text-lg text-base-content opacity-70">
              Customer experiences with our service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                      M
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Mohammad Rahim</h4>
                    <p className="text-sm opacity-70">Dhaka</p>
                  </div>
                </div>
                <p className="text-base-content opacity-80">
                  "Excellent service! On-time delivery and great customer
                  service. I always use this service."
                </p>
                <div className="rating rating-sm mt-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
                      F
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Fatema Khatun</h4>
                    <p className="text-sm opacity-70">Chattogram</p>
                  </div>
                </div>
                <p className="text-base-content opacity-80">
                  "I use it regularly for my online business. Customers are
                  happy and parcels arrive safely."
                </p>
                <div className="rating rating-sm mt-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-content flex items-center justify-center">
                      A
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Ahmed Hasan</h4>
                    <p className="text-sm opacity-70">Sylhet</p>
                  </div>
                </div>
                <p className="text-base-content opacity-80">
                  "Fast and reliable service. Real-time tracking feature is
                  amazing. Definitely recommend."
                </p>
                <div className="rating rating-sm mt-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get Started Today
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Contact us for your parcel delivery needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              📞 Call Now: 01×××××××××
            </button>
            <button className="btn btn-outline btn-lg text-white hover:text-gray-800">
              💬 Live Chat
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 text-base-content py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">FastTrack Courier</h3>
              <p className="opacity-70 mb-4">
                Bangladesh's fastest and most reliable courier service.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-2xl hover:text-primary">
                  📘
                </a>
                <a href="#" className="text-2xl hover:text-primary">
                  📷
                </a>
                <a href="#" className="text-2xl hover:text-primary">
                  🐦
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 opacity-70">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary"
                    onClick={handleBookParcel}
                  >
                    Book Parcel
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary"
                    onClick={handleTrackParcel}
                  >
                    Track Parcel
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Check Rate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Find Branch
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 opacity-70">
                <li>
                  <a href="#" className="hover:text-primary">
                    Express Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Business Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    E-commerce Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    International Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 opacity-70">
                <li>📍 Dhaka, Bangladesh</li>
                <li>📞 01×××××××××</li>
                <li>📧 info@fasttrack.com</li>
                <li>🕒 24/7 Customer Service</li>
              </ul>
            </div>
          </div>

          <div className="divider"></div>

          <div className="text-center opacity-70">
            <p>&copy; 2024 FastTrack Courier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
