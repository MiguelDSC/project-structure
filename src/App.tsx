import ProjectBar from "./components/Projects/ProjectBar";
import SideNavBar from "./components/Projects/SideNavBar";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="flex">
      <div className="min-w-[1/6]">
        <SideNavBar />
      </div>
      <ProjectBar />
      <div className="flex justify-center h-screen overflow-auto">
        <div className="w-4/5">
          <Projects />
        </div>
      </div>
    </div>
  );
}

export default App;
