type SectionTitleProps = {
  title: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
};

function SectionLabel(props: SectionTitleProps) {
  return (
    <div className="flex items-center mb-4">
      <h2 className="mr-1 text-lg">
        {props.title} ({props.count})
      </h2>
      <button onClick={props.onClick}>
        <svg
          className={props.isActive ? "transform rotate-180" : ""}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path>
        </svg>
      </button>
    </div>
  );
}

export default SectionLabel;
