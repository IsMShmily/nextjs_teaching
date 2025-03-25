import { Suspense } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const PostFeed = async () => {
  await sleep(1000);
  return <div>PostFeed</div>;
};

const Weather = async () => {
  await sleep(2000);
  return <div>Weather</div>;
};

const User = async () => {
  await sleep(3000);
  return <div>User</div>;
};

export default function Home() {
  return (
    <div className="border-2 border-yellow-500 w-100 h-100">
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
      <Suspense fallback={<p>Loading user...</p>}>
        <User />
      </Suspense>
    </div>
  );
}
