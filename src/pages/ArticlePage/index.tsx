import { BookmarkIcon, HeartIcon, MessageCircleIcon, ShareIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import NavBarComponent from '../../components/NavBar';
import React, { useEffect } from 'react';
import { getArticleByID } from '../../lib/redux/feature/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/redux';
import moment from 'moment';
import { marked } from 'marked';

interface RouteParams {
  articleId : string
}

const ArticlePage : React.FC
 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articleId } = useParams<RouteParams>()
  const { detail_articles } = useSelector((state: RootState) => state.articles );


  useEffect(()=>{
    loadDetail();
  },[])

  const loadDetail = async () => {
    try {
      await dispatch(getArticleByID(articleId as string));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBarComponent></NavBarComponent>
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 mt-10">
        <article className="flex-grow max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">{detail_articles?.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex justify-center items-center overflow-hidden h-11 w-11 bg-secondary rounded-[100px]">
              {detail_articles?.author.name}
            </div>
            <div>
              <p className="font-semibold">{detail_articles?.author.name}</p>
              <p className="text-sm text-muted-foreground">
                Posted on{" "}
                {moment(detail_articles?.published_at).format("MMM D, YYYY")} •
                5 min read
              </p>
            </div>
          </div>
          <img
            src={`${import.meta.env.VITE_BASE_API}${
              detail_articles?.cover.url
            }`}
            alt="Article cover"
            className="w-full rounded-lg mb-6"
          />
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: marked(detail_articles?.blocks[0].body ?? ''),
              }}
            ></div>
            {/* <p>
              Tailwind CSS has revolutionized the way we approach web design and
              development. Its utility-first approach allows for rapid
              prototyping and consistent designs across projects. In this
              article, we'll explore how to create responsive layouts using
              Tailwind CSS...
            </p>
            <h2>Getting Started with Tailwind CSS</h2>
            <p>
              To begin, you'll need to install Tailwind CSS in your project. You
              can do this via npm:
            </p>
            <pre className="my-10">
              <code className="bg-primary p-4 rounded-md my-4">
                npm install tailwindcss
              </code>
            </pre>
            <p>
              Once installed, you can start using Tailwind's utility classes in
              your HTML...
            </p> */}
            {/* More article content would go here */}
          </div>
          <div className="flex items-center justify-between mt-8 pt-4 border-t">
            <div className="flex space-x-4">
              <button variant="ghost" size="sm">
                <HeartIcon className="mr-2 h-4 w-4" />
                Like
              </button>
              <button variant="ghost" size="sm">
                <MessageCircleIcon className="mr-2 h-4 w-4" />
                Comment
              </button>
            </div>
            <div className="flex space-x-4">
              <button variant="ghost" size="sm">
                <BookmarkIcon className="mr-2 h-4 w-4" />
                Save
              </button>
              <button variant="ghost" size="sm">
                <ShareIcon className="mr-2 h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </article>

        <aside className="w-full md:w-64 space-y-6">
          <div className="bg-primary p-4 rounded-lg">
            <h2 className="font-semibold mb-2">About the Author</h2>
            <p className="text-sm">
              John Doe is a frontend developer with 5 years of experience in
              building responsive web applications.
            </p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">More from DevArticles</h2>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm hover:underline">
                  10 JavaScript Tips for Better Code
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:underline">
                  Introduction to React Hooks
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:underline">
                  CSS Grid vs Flexbox: When to Use Which?
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
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
          </div>
        </aside>
      </main>

      <footer className="bg-primary mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-2">DevArticles</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Community</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Code of Conduct
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contributors
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Forums
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Social</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Subscribe</h3>
              <p className="text-sm mb-2">
                Stay updated with our latest articles and news.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none"
                />
                <button type="submit" className="rounded-l-none">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            © 2023 DevArticles. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default ArticlePage
