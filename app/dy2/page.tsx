const Dy2 = async ({
  searchParams,
}: {
  searchParams: Promise<{ theme: string }>;
}) => {
  const { theme } = await searchParams;
  console.log(theme);
  const url = (
    await (await fetch("https://api.thecatapi.com/v1/images/search", {})).json()
  )[0].url;
  return (
    <div>
      Dy2
      <img src={url} alt="cat" />
    </div>
  );
};

export default Dy2;
