const ServerPage = async () => {
  // 获取一张随机图片
  const randomImage = await fetch("https://api.thecatapi.com/v1/images/search");
  const imageData = await randomImage.json();
  const imageUrl = imageData[0].url;

  return (
    <div>
      <img src={imageUrl} className="w-100" alt="random cat" />
    </div>
  );
};

export default ServerPage;
