"use client";
import AuthComponent from "@/app/auth/components/AuthComponent";
import React from "react";
import Vote from "./Vote";
import Chat from "./Chat";
import { useUser } from "@/lib/hook";
import Pressence from "./Pressence";

export default function VoteWrapper({ id }: { id: string }) {
	const { isFetching, data } = useUser();
	if (isFetching) {
		return <div className=" h-70vh"></div>;
	}

	if (!data?.data.user?.id) {
		return <AuthComponent />;
	}

	return (
		<div className="space-y-5">
			<Pressence id={id} />
			<div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-10 ">
				<Vote id={id} />
				<Chat />
			</div>
		</div>
	);
}
