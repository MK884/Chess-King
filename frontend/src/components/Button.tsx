export const Button = ({
  onClick,
  children,
  style,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  style?: string;
}) => {
  return (
    <>
      <button
        className={`bg-[#6366f1] text-white py-3 my-4 w-full rounded-lg text-2xl font-semibold ${style}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
