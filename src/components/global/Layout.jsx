import SidebarSample from "./SidebarSample";

const Layout = ({ children }) => {
  return (
    <div className="lg:grid lg:grid-cols-layout">
      <SidebarSample />
      <div className="flex flex-col flex-1 overflow-hidden lg:col-start-2 lg:col-end-3">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
