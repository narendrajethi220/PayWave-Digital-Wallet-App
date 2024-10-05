const Balance = ({ value }) => {
  const formattedBalance = value ? value.toFixed(3) : "10,000.000";
  return (
    <div className="flex mt-4 ml-4">
      <div className="font-bold text-lg text-blue-800">Your balance:</div>
      <div className="font-semibold ml-4 text-lg">
        <span className="text-md font-medium">Rs</span> {formattedBalance}
      </div>
    </div>
  );
};
export default Balance;
