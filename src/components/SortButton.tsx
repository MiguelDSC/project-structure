import { useEffect, useState } from "react";

type SortButtonProps = {
  selectSort: (isDownward: boolean) => void;
};

function SortButton(props: SortButtonProps) {
  const [toggle, setToggle] = useState(false);
  const [direction, setDirection] = useState("");

  useEffect(() => {
    props.selectSort(toggle);
    if (toggle) {
      setDirection("transform rotate-180");
    } else {
      setDirection("transform rotate-0");
    }
  }, [toggle]);

  const onClickHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex mt-1 items-center">
      <p className="text-sm mr-2">Name</p>
      <button className={direction + ""} onClick={onClickHandler}>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 48 48"
          focusable="false"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h48v48H0V0z"></path>
          <path d="M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z"></path>
        </svg>
      </button>
    </div>
  );
}

export default SortButton;
