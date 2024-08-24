"use client";
import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function AuthComponent() {
	const supabase = createClient()
	const handleLoginWithOAuth = async() => {
		const { data, error} = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: location.origin + "/auth/callback?next=" + location.pathname,
			},
		});

		if (data.url)
			redirect(data.url);
	};

	return (
		<div className="flex items-center justify-center text-gray-200 h-96 border border-dashed border-zinc-500">
			<div className="space-y-5 text-center ">
				<h1 className="text-3xl font-bold">Login to Vote</h1>
				<form>
					<Button
						formAction={handleLoginWithOAuth}
						className="flex items-center gap-2 mx-auto"
					>
						<GitHubLogoIcon /> Login with Github
					</Button>
				</form>
			</div>
		</div>
	);
}
