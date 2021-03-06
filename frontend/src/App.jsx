import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import custom styles for our application
import "./css/App.css";

// Import pages

import Auth from "./services/Auth";
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/home/templates/HomePage";
import PostsPage from "./components/posts/templates/PostsPage";
import SinglePost from "./components/posts/templates/SinglePost";
import ThreadPage from "./components/chat/ThreadPage";
import NewGiverPost from "./components/posts/templates/NewGiverPost";
import NewRequestPost from "./components/posts/templates/NewRequestPost";
import Policy from "./components/policy/Policy";
import Api from "./api/Api";
import Modal from "./components/posts/templates/Modal";
import Nav from "./components/layout/Nav";
import MonetarySupport from './components/funding/MonetarySupport';


function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [category, useCategory] = useState([]);

  Auth.bindLoggedInStateSetter(setLoggedIn);

  //Fetches all the posts, to be used and filtered depending on functionality by App child components
  useEffect(() => {
    if (loggedIn) {
      const fetchPosts = async () => {
        const response = await Api.get(`/posts`);
        setPosts(response.data);
      };
      fetchPosts();
    }
  }, [loggedIn]);

  //Fetches the logged in user(includes user picture, name and email), to be used by App child components
  useEffect(() => {
    if (loggedIn) {
      Api.get("/user/me").then((response) => {
        const fetchedUser = response.data;
        const userToSet = fetchedUser.imageUrl
          ? fetchedUser
          : {
            ...fetchedUser,
            imageUrl:
              "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
          };
        Api.put("/user/me", userToSet).then((response) => {
          setUser(response.data);
        });
      });
    }
  }, [loggedIn]);

  //Fetches logged in user's posts, to be used and filtered depending on functionality by App child components
  useEffect(() => {
    if (loggedIn) {
      const fetchPosts = async () => {
        const posts = await Api.get("/posts").then((res) => res.data);
        //Filters posts posted only by the logged in user
        const userPosts = posts.filter(
          (post) => post.user.email === user.email
        );
        setUserPosts(userPosts);
      };
      fetchPosts();
    }
  }, [loggedIn, user, posts]);

  const loggedInRouter = (
    //React Router manages all the routes in the application
    <>
      <Router>
        {/* <Navbar onLogout={() => Auth.logout()} user={user} /> */}
        <Nav onLogout={() => Auth.logout()} user={user} setUser={setUser} />

        <div className="body-container">
          <Switch>
            {/* The route displays the application's homepage */}
            <Route path="/" exact>
              <HomePage userPosts={userPosts} />
            </Route>

            {/* Givewaways, skills and monetary support categories are displayed by
          the same component - PostsPage. PostsPage recieves one of the three category names
          as props. The category name props is used by PostsPage in order to
          display posts belonging to only of the three categories.
           */}
            <Route path="/posts/category/giveaways" exact>
              <PostsPage
                category={"giveaways"}
                posts={posts}
                loggedInUser={user}
              />
            </Route>

            <Route path="/posts/category/skills" exact>
              <PostsPage
                category={"skills"}
                posts={posts}
                loggedInUser={user}
              />
            </Route>
            <Route path="/posts/category/monetary-support" exact>
              <PostsPage
                category={"monetary-support"}
                posts={posts}
                loggedInUser={user}
              />
            </Route>

            <Route path="/donations" exact>
              <MonetarySupport />
            </Route>
            
            {/* This route is used to create new posts when user clicks on new post button
          displayed in the NavBar */}

            <Route exact path="/posts/give">
              <NewGiverPost setPosts={setPosts} user={user} posts={posts} />
            </Route>

            <Route exact path="/posts/request">
              <NewRequestPost setPosts={setPosts} user={user} />
            </Route>

            <Route exact path="/posts/">
              <Modal />
            </Route>

            {/* This route is used to display details of a single post. */}
            <Route
              path="/posts/:id"
              render={({ match }) => (
                <SinglePost
                  id={match.params.id}
                  setPosts={setPosts}
                  user={user}
                  posts={posts}
                />
              )}
            />
            <Route exact path="/policy">
              <Policy />
            </Route>
            {/* The functionality for the routes below is not implemented yet.
          Uncomment or remove if the routes are not needed.
          */}

            <Route path="/chat" exact>
              <ThreadPage loggedInUser={user} />
            </Route>

            <Route path="/chat/:id">
              <ThreadPage loggedInUser={user} />
            </Route>
          </Switch>
        </div>
      </Router>

    </>
  );

  // The first page displayed by the app is the login page.
  return loggedIn ? loggedInRouter : <LoginPage />;
}

export default App;
