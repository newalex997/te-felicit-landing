export const ErrorContainer = ({ error }: { error: string[] | string }) => {
  return (
    <div className="wrapper style3-alt error">
      {Array.isArray(error) ? (
        error.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};
