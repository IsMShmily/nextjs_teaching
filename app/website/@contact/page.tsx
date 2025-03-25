const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const Contact = async () => {
  await sleep(5000);
  return <div>Contact</div>;
};

export default Contact;
