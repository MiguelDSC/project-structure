import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";

function BreadCrumbs() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav>
      <div className="flex">
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <Link className="flex" key={match.pathname} to={match.pathname}>
            {breadcrumb}
            <svg
              className=" a-s-fa-Ha-pa c-qd"
              width="22px"
              height="24px"
              viewBox="0 0 24 24"
              focusable="false"
              fill="currentColor"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default BreadCrumbs;
