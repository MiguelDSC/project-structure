function Workspace() {
  return (
    <div className="flex flex-row-reverse mt-10 mb-6">
      <div className="w-48 px-2 py-2 border rounded-sm flex justify-center items-center">
        <svg
          className="mr-2"
          stroke="currentColor"
          fill="currentColor"
          viewBox="0 0 24 24"
          height="14"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
        <p className="text-sm">Select workspace</p>
        <svg
          stroke="currentColor"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="icon__Icon-zowch7-0 egTEBn ml-4"
          height="22px"
          width="22px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10l5 5 5-5z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Workspace;
