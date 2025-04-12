import { ReactElement, useEffect, useState } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App(): ReactElement {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState <boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (

    <h1>Loading Posts...</h1>
    );
  }

  if (error) {
    return (
      <div>
        <h1 style={{ textAlign: 'center',  width: '100%' }}>Data Fetching Failed</h1>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ol style={{ textAlign: 'center',listStylePosition: 'inside', width: '100%',}}>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
