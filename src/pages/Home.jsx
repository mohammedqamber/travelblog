import React from 'react'
import { useSelector } from 'react-redux'


function Home() {

   
  const user = useSelector(state => state.userData)

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#506081] to-[#354f86] text-gray-900">

          {user && <div className='bg-navbarBg text-gray-400'><i>Welcome, {user.name} !</i></div> }

          <header className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://img.veenaworld.com/wp-content/uploads/2023/01/shutterstock_2044050407.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
              <h1 className="text-5xl font-bold mb-4">Welcome to Travel Wonders</h1>
              <p className="text-xl">Discover new destinations, experiences, and stories from around the world</p>
            </div>
          </header>
    
          <main className="px-8 py-12">
            <section className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Featured Blog Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src="https://example.com/blog1.jpg" alt="Blog Post 1" className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-3">Exploring the Wonders of Japan</h3>
                    <p className="text-gray-700 mb-4">Join us on an unforgettable journey through the Land of the Rising Sun.</p>
                    <a href="#" className="text-blue-500 hover:underline">Read More</a>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src="https://example.com/blog2.jpg" alt="Blog Post 2" className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-3">A Weekend in Paris</h3>
                    <p className="text-gray-700 mb-4">Discover the charm and romance of Paris in just two days.</p>
                    <a href="#" className="text-blue-500 hover:underline">Read More</a>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src="https://example.com/blog3.jpg" alt="Blog Post 3" className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-3">Adventures in the Australian Outback</h3>
                    <p className="text-gray-700 mb-4">Experience the rugged beauty and unique wildlife of Australia.</p>
                    <a href="#" className="text-blue-500 hover:underline">Read More</a>
                  </div>
                </div>
              </div>
            </section>
    
            <section className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Latest Travel Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-semibold mb-3">Packing Essentials for Every Trip</h3>
                  <p className="text-gray-700 mb-4">Make sure you're always prepared with our ultimate packing list.</p>
                  <a href="#" className="text-blue-500 hover:underline">Read More</a>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-semibold mb-3">How to Travel on a Budget</h3>
                  <p className="text-gray-700 mb-4">Explore the world without breaking the bank with these tips.</p>
                  <a href="#" className="text-blue-500 hover:underline">Read More</a>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-semibold mb-3">Top 10 Travel Apps You Need</h3>
                  <p className="text-gray-700 mb-4">Enhance your travel experience with these must-have apps.</p>
                  <a href="#" className="text-blue-500 hover:underline">Read More</a>
                </div>
              </div>
            </section>
          </main>
    
          <footer className="bg-gray-800 text-white p-6 text-center">
            <p>&copy; 2024 Your Travel Blog. All rights reserved.</p>
          </footer>
        </div>
      );
}

export default Home
