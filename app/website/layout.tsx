const Layout = ({
  children,
  about,
  contact,
}: {
  children: React.ReactNode;
  about: React.ReactNode;
  contact: React.ReactNode;
}) => {
  return (
    <div>
      <div>{about}</div>
      <div>{contact}</div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;