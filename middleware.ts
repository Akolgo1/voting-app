import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
	const { response, user } = await updateSession(request);
	const { pathname } = request.nextUrl;
	const { searchParams } = new URL(request.url);

	if (
		!user &&
		(pathname.startsWith("/create") ||
			pathname === "/profile" ||
			pathname.startsWith("/edit"))
	) {
		return NextResponse.redirect(new URL("/", request.url));
	} else if (pathname.startsWith("/profile")) {
		if (searchParams.get("id") !== user?.id) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	} else if (pathname.startsWith("/edit")) {
		if (searchParams.get("user") !== user?.id) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	return response;
}

export const config = {
	matcher: ["/profile", "/create", "/edit/:path*", "/", "/vote/:path*"],
};
