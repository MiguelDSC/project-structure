function ProjectBar() {
  return (
    <div
      className="bg-dark-blue flex flex-col pt-12 w-1/3"
      style={{ backgroundColor: "#223659" }}
    >
      <div className="mx-6 pb-4">
        <h1 className="text-white text-2xl mb-3">Projects</h1>
        <button className="rounded-md text-white px-4 py-3 mb-6 bg-blue-400">
          + Create new project
        </button>
        <input
          className="rounded-3xl h-10 w-full px-4 text-sm"
          placeholder="Search projects"
        />
      </div>
      <div className="bg-white h-20 px-6 flex flex-col justify-center">
        <div className="flex justify-between w-full pt-6 mb-1">
          <div className="flex">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              color="#42d1f5"
              className="icon__Icon-zowch7-0 fBcPtn mr-2"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
            </svg>
            <div>
              <p>Introduction</p>
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
                <p className="text-sm w-20">0 published</p>
              </div>
            </div>
          </div>
          <p>14</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectBar;
