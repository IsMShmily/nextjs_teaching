const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>global Template</div>
      {children}
    </div>
  );
};

export default Template;
