import React from 'react';
import { motion } from 'framer-motion';

const Learn = ({ darkMode }) => {
  // Sample video data - you can replace with your own videos
  const videos = [
    {
      id: 1,
      title: "Introduction to Mental Health",
      thumbnail: "https://img.youtube.com/vi/tY8NY6CMDFA/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=tY8NY6CMDFA",
    },
    {
      id: 2,
      title: "Rights and Responsibilities of Children",
      thumbnail: "https://img.youtube.com/vi/TafvHxXFzUM/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=TafvHxXFzUM",
    },
    {
      id: 3,
      title: "What are child rights and why are they important?",
      thumbnail: "https://img.youtube.com/vi/HCYLdtug8sk/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=HCYLdtug8sk",
    },
    {
      id: 4,
      title: "What are Human Rights?",
      thumbnail: "https://img.youtube.com/vi/WJsUfck01Js/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=WJsUfck01Js",
    },
    {
      id: 5,
      title: "What Is Democracy?",
      thumbnail: "https://img.youtube.com/vi/f-feDZRxJKw/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=f-feDZRxJKw",
    },
    // Add more videos as needed
  ];

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <h1 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Learning Resources
      </h1>
      <div className="flex flex-col space-y-6">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg shadow-lg overflow-hidden w-full max-w-4xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex flex-row">
              <div className="w-1/3">
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </a>
              </div>
              
              <div className="w-2/3 p-6">
                <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {video.title}
                </h2>
                {video.id === 1 ? (
                  <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-4`}>
                    <p>Mental health is just as important as physical health, especially for children, as it forms the foundation of their emotional and social well-being.</p>
                  </div>
                ) : (
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {video.description}
                  </p>
                )}
                {video.id === 2 ? (
                  <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-4`}>
                    <p>Children have specific rights that ensure their safety, development, and well-being. These rights are recognized internationally by frameworks such as the United Nations Convention on the Rights of the Child (UNCRC).</p>
                  </div>
                ) : (
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {video.description}
                  </p>
                )}
                {video.id === 3 ? (
                  <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-4`}>
                    <p>Child rights are a set of fundamental entitlements and freedoms granted to all individuals under the age of 18 to ensure their survival, development, protection, and participation in society.</p>
                  </div>
                ) : (
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {video.description}
                  </p>
                )}
                {video.id === 4 ? (
                  <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-4`}>
                    <p>Human rights are the basic rights and freedoms that belong to every person, regardless of nationality, race, gender, religion, or any other status.</p>
                  </div>
                ) : (
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {video.description}
                  </p>
                )}
                {video.id === 5 ? (
                  <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-4`}>
                    <p>Democracy is a system of government where power lies with the people, who either directly participate in decision-making or elect representatives to make decisions on their behalf.</p>
                  </div>
                ) : (
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {video.description}
                  </p>
                )}
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Watch Video
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Learn;