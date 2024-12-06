import { Link } from "react-router-dom"
import NavBarComponent from "../../components/NavBar"

export default function NotFoundPage() {
  return (
    <div>
    <div className="min-h-screen bg-bgDark flex flex-col items-center justify-center text-center px-4">
      <div className="bg-primary p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-6xl font-bold text-white mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-white mb-8">Oops! The page you're looking for seems to have vanished into the digital void.</p>
        
        <div className="mb-8">
          <form className="flex">
            <input
              type="text"
              placeholder="Search for articles..."
              className="flex-grow px-4 py-2 rounded-l-md border border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              title="submit"
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
        
        <p className="text-white mb-8">
          Or try navigating back to our homepage or checking out our latest articles.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={"/"}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Back to Homepage
          </Link>
          <Link
          to={""}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Latest Articles
          </Link>
        </div>
      </div>
      
      <footer className="mt-8 text-sm text-gray-500">
        <p>© 2024 frontendalif. All rights reserved.</p>
      </footer>
    </div>
    </div>
  )
}