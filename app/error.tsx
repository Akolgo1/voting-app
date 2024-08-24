"use client";

import Image from "next/image";

export default function Error() {
	return (
		<div className="flex items-center flex-col h-full space-y-10">
			<Image src="/404.png" alt="404" height={512} width={512} />

			<h1>Try to Refresh</h1>
		</div>
	);
}
