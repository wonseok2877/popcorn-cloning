const AbsoluteDiv = (props) => {
  return (
    <div className="flex flex-col justify-evenly items-center text-center text-4xl opacity-0 absolute w-full h-full bg-opacity-0 bg-black hover:opacity-100 hover:bg-opacity-70 transition-all ease-in-out duration-500">
      {props.children}
    </div>
  );
};

export default AbsoluteDiv;
