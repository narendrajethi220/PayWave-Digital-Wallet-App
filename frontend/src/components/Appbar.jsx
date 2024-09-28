const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between ">
      <div className=" flex flex-col justify-center h-full ml-4 font-semibold">
        PayWave App
      </div>
      <div className="flex  ">
        <div className="flex flex-col justify-center h-full mr-3 font-medium">
          Hello
        </div>
        <div className="rounded-full h-8 w-8 bg-slate-200 flex justify-center mt-3 mr-2">
          <div className="flex flex-col justify-center h-full text-l font-medium">
            U
          </div>
        </div>
      </div>
    </div>
  );
};
export default Appbar;
