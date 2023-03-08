import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SidebarSample = () => {
  const router = useRouter();

  return (
    <aside className="hidden lg:col-start-1 lg:col-end-2 lg:fixed lg:w-sidebar lg:grid lg:inset-y-0">
      <div className="flex flex-col flex-grow h-full overflow-y-auto scrollbar-hide pt-14 text-lightgray bg-darkgray">
        <div className="pr-6 pl-b7">
          <p className="pb-8 text-xl font-bold pl-b4 bg-darkgray">Dashboard</p>
          <div className="flex flex-col flex-1 mt-5">
            <nav className="flex-1 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                  <a
                    className={classNames(
                      router.pathname.startsWith(item.href)
                        ? "bg-com1 text-white"
                        : "text-com2 hover:bg-com1",
                      "group flex items-center pl-b4 py-3.5 rounded-xl space-x-3"
                    )}
                  >
                    <div className="w-5 h-5 border-2 border-white rounded-full p-[3px]">
                      <div
                        className={classNames(
                          router.pathname.startsWith(item.href) && "bg-white",
                          "w-full h-full rounded-full"
                        )}
                      ></div>
                    </div>
                    <span>{item.name}</span>
                  </a>
                </Link>
              ))}
            </nav>
          </div>

          <button
            type="button"
            className="my-b6 flex items-center gap-x-2.5 align-middle pl-b4"
            onClick={() => {
              // signOut();
            }}
          >
            {/* <ArrowCircleRightIcon className="w-5 h-5" /> */}
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarSample;
