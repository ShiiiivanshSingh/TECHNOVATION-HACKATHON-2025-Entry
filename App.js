function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">YourLogo</div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </nav>



      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Hello Fellow Stalker. There nothing here for you :). btw thx for checking my profile lol or you just stalking my hakathon project? cheeck out my other repos as well i guess then
              <span className="text-blue-600"> holaa</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Team ID: SAP 1176
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
              Get Started
            </button>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-6">
                {/* Placeholder for image or illustration */}
                <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                  <span className="text-gray-400">Your Image Here</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-8">
        <div className="text-center text-gray-500">
          sh1vansh
        </div>
      </footer>
    </div>
  );
}

export default App;
