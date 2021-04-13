const HeaderWrapper = ({ children }) => {
  return (
    <div className="fixed z-50 w-screen flex justify-between items-center px-10 bg-black shadow-2xl">
      {children}
    </div>
  );
};

export default HeaderWrapper;
