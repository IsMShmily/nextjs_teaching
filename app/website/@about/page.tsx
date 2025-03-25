const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const About = async () => {
  await sleep(2000);
  return <div>About</div>;
};

export default About;
