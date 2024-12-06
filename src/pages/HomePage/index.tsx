import { Link } from "react-router-dom";
import NavBarComponent from "../../components/NavBar"
import {
  BookmarkIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/redux";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../lib/redux/feature/articleSlice";


const HomePage = () => {
  const [currentPage,setCurrentPage] = useState<number>(1)
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state : RootState) => state.articles);


  useEffect(()=>{
    loadArticle();
  },[currentPage])

  const loadArticle = async ()=>{
    try {
      await dispatch(fetchArticles(currentPage));
    } catch (error) {
      console.log(error)
    }
  }

  const nextPage = ()=>{
    setCurrentPage(currentPage+1)
  }
  return (
    <>
      <NavBarComponent></NavBarComponent>
      <div className="container mx-auto">
        <div className="w-full my-10 flex justify-center flex-col items-center border-b pb-10">
          <h1 className="text-3xl uppercase text-white font-bold text-center">
            Welcome to the Blog
          </h1>
          <h4 className="text-center mt-10 w-1/2">
            Explore tutorials, tips, and comprehensive guides to master HTML,
            CSS, JavaScript, React, and the latest technologies. Perfect for
            beginners and those looking to level up their skills!
          </h4>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Article</h2>
          <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://g-8bhzzzpn2pk.vusercontent.net/placeholder.svg?height=400&width=800"
              alt="Featured article cover"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                <Link to={""} className="hover:underline">
                  The Future of Web Development: What to Expect in 2024
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore the upcoming trends and technologies that will shape the
                web development landscape in the coming year.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex justify-center items-center overflow-hidden h-11 w-11 bg-secondary rounded-[100px]">
                    Alif
                  </div>
                  <span className="text-sm font-medium">John Doe</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  10 min read
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((data, i) => (
              <article
                key={i}
                className="bg-primary rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={`${import.meta.env.VITE_BASE_API}${data.cover.url}`}
                  alt={`Article ${i} cover`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link
                      to={`/article/${data.documentId}`}
                      className="hover:underline"
                    >
                      {data.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {data.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex justify-center items-center overflow-hidden h-11 w-11 bg-secondary rounded-[100px]">
                        <img
                          src={`${import.meta.env.VITE_BASE_API}${
                            data.author.avatar?.url
                          }`}
                          alt={`Article ${i} cover`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{data.author.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      5 min read
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              className="bg-primary text-white focus:outline-none py-2 px-6 rounded-md shadow-md"
              onClick={() => {
                nextPage();
              }}
            >
              Load More Articles
            </button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Trending Topics</h2>
          <div className="flex flex-wrap gap-4">
            {[
              "JavaScript",
              "React",
              "Node.js",
              "TypeScript",
              "CSS",
              "Web Performance",
              "Accessibility",
              "DevOps",
            ].map((topic) => (
              <Link
                key={topic}
                to={`/topic/${topic.toLowerCase().replace(" ", "-")}`}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                {topic}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Join Frontendalif?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <TrendingUpIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Get the latest insights and trends in web development from
                industry experts.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <ZapIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learn Faster</h3>
              <p className="text-muted-foreground">
                Access high-quality tutorials and articles to accelerate your
                learning journey.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <BookmarkIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save for Later</h3>
              <p className="text-muted-foreground">
                Bookmark articles and create your personal learning path for
                continuous growth.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Never Miss an Article</h2>
          <div className="bg-secondary p-8 rounded-lg">
            <p className="text-lg mb-4">
              Subscribe to our newsletter and stay up to date with the latest
              web development trends and tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex bg-white rounded-md h-[3rem] w-[16rem] p-4 text-primary"
              />
              <button
                className="bg-white text-primary px-4 rounded-md"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-primary mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Frontendalif-Blog</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="#" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Community</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="#" className="hover:underline">
                    Code of Conduct
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Contributors
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Forums
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Social</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="#" className="hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="#" className="hover:underline">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Podcast
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-4 text-center text-sm text-muted-foreground">
            © 2023 frontendalif. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage