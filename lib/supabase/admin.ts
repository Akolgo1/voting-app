import { Database } from "../types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createAdmin = () => {
  	const cookieStore = cookies();

  	return createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SERVICE_ROLE!,
		{
		cookies: {
			getAll() {
				return cookieStore.getAll()
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
			},
		},
		}
	)
};