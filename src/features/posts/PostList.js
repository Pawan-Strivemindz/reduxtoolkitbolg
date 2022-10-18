import { useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";
import { useState } from "react";
import PostsExcerpt from "./PostsExcerpt";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const [number, setNumber] = useState(1);
  const postPerPage = 10;
  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(posts.length / postPerPage); i++) {
    pageNumber.push(i);
  }
  const ChangePage = (pageNumber) => setNumber(pageNumber);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice(firstPost, lastPost)
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  return (
    <section>
      {content}
      <div style={{ textAlign: "center" }}>
        {number > 1 && (
          <button
            style={{
              marginRight: "10px",
              backgroundColor: "blue",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => setNumber(number - 1)}
          >
            Prev
          </button>
        )}

        {pageNumber.map((Elem) => {
          return (
            <>
              <button
                style={{
                  marginRight: "10px",
                  fontSize: "15px",
                  padding: "5px",
                  fontWeight: "bold",
                  backgroundColor: number === Elem ? "lightblue" : "",
                }}
                onClick={() => ChangePage(Elem)}
              >
                {Elem}
              </button>
            </>
          );
        })}
        {number < pageNumber.length && (
          <button
            style={{
              marginRight: "10px",
              backgroundColor: "blue",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => setNumber(number + 1)}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default PostList;
