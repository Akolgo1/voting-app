import React from "react";
import CloseForm from "../components/CloseForm";
import { redirect } from "next/navigation";
import VoteWrapper from "../components/VoteWrapper";
import Info from "../components/Info";
import { DEFAULT_DESCRIPTION } from "@/lib/constant";
import { createClient } from "@/lib/supabase/client";
import { getUrl } from "@/lib/utils";

export async function generateStaticParams() {
	const supabase = createClient();

	const { data: votes } = await supabase
		.from("vote")
		.select("id")
		.filter("end_date", "gte", new Date().toISOString())
		.limit(10);
	return votes as any;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
	const supabase = createClient();

	const { data } = await supabase
		.from("vote")
		.select("*,users(user_name,avatar_url)")
		.eq("id", params.id)
		.single();

	const url = getUrl();

	return {
		title: data?.title,
		authors: {
			name: data?.users?.user_name,
		},
		description: data?.description || DEFAULT_DESCRIPTION,
		openGraph: {
			description: data?.description || DEFAULT_DESCRIPTION,
			title: data?.title,
			url: url + "vote/" + data?.id,
			siteName: "Daily Vote",
			images:
				url +
				`og?author=${data?.users?.user_name}&author_url=${data?.users?.avatar_url}&title=${data?.title}`,
			type: "website",
		},
		keywords: ["daily vote", data?.users?.user_name, "dailywebcoding"],
	};
}

export default async function Page({ params }: { params: { id: string } }) {
	const supabase = createClient();

	const { data: vote } = await supabase
		.from("vote")
		.select("*")
		.eq("id", params.id)
		.single();

	if (!vote) {
		return redirect("/404");
	}

	return (
		<>
			<div className="w-full flex items-center justify-center  min-h-70vh">
				<div className="w-full space-y-20">
					<Info title={vote?.title} endDate={vote.end_date} />
					<VoteWrapper id={params.id} />
				</div>
			</div>
			<CloseForm />
		</>
	);
}
