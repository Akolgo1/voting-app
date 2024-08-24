import { useQuery } from "@tanstack/react-query";
import { sortObject } from "../utils";
import { IComment } from "../types";
import { createClient } from "../supabase/client";

export function useGetVote(id: string) {
	const supabase = createClient();

	return useQuery({
		queryKey: ["vote-" + id],
		queryFn: async () => {
			const { data } = await supabase
				.from("vote")
				.select("*,vote_options(*),vote_log(*)")
				.eq("id", id)
				.single();

			const voteOptions = sortObject(
				data?.vote_options?.options as { [key: string]: number }
			);
			const totalVote = Object.values(voteOptions).reduce(
				(acc, value) => acc + value,
				0
			);

			return {
				voteOptions,
				totalVote,
				voteLog: data?.vote_log[0],
				isExpired: data?.end_date! < new Date().toISOString(),
			};
		},
		staleTime: Infinity,
	});
}

export function useUser() {
	const supabase = createClient();
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const { data: { user }} = await supabase.auth.getUser();
			return { user: user };
		},
		staleTime: Infinity,
	});
}

export function useGetAdminStatus(userID: string) {
	const supabase = createClient();
	return useQuery({
		queryKey: ["admin-status"],
		queryFn: async () => {
			const { data } = await supabase.from("users").select('is_admin').eq('id', userID).single();
			return data
		},
	});
}

export function useComment(voteId: string) {
	const supabase = createClient();

	return useQuery({
		queryKey: ["vote-comment-" + voteId],
		queryFn: async () => {
			return [] as IComment[];
		},
		staleTime: Infinity,
	});
}
