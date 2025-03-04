import { NavLink, Outlet, useLocation } from "react-router";
import { useHash } from "./hooks/useHash";
import { Aside } from "./components/aside";
import { useEffect } from "react";

export const Layout = () => {
	const { hash, data } = useHash();
	const location = useLocation();

	useEffect(() => {
		const titleMap: Record<string, string> = {
			"/": "Home ",
			"/page2": "List ",
		};
		const newTitle = `${titleMap[location.pathname]} of ${data?.name ?? "Nobody :("}`;
		document.title = newTitle;
	}, [location.pathname, data?.name]);

	return (
		<div className="grid grid-cols-[4fr_1fr] bg-neutral-100 h-screen ">
			<main>
				<nav className="w-full bg-neutral-50 shadow-md sticky top-0 z-10 grid grid-cols-[auto_1fr] gap-4 items-center">
					<ul className="flex gap-4 p-4">
						<NavLink
							to={`/#${hash}`}
							className={({ isActive }) =>
								isActive ? "text-red-500" : "text-black"
							}
						>
							Page 1
						</NavLink>
						<NavLink
							to={`/page2#${hash}`}
							className={({ isActive }) =>
								isActive ? "text-red-500" : "text-black"
							}
						>
							Page 2
						</NavLink>
					</ul>

					<p className="w-full text-center">Hash: {hash ?? "none"}</p>
				</nav>
				<div className="p-8 prose">
					<Outlet />
				</div>
			</main>
			<Aside />
		</div>
	);
};
