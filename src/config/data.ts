import {
	BookOpen,
	Frame,
	LifeBuoy,
	Map,
	PieChart,
	Send,
	Settings2,
	Book,
	BookCopy,
} from "lucide-react";

export const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		image: "/user.png",
	},
	navMain: [
		{
			title: "Courses",
			url: "/dashboard/courses",
			icon: BookOpen,
			isActive: true,
			items: [
				{
					title: "TOEIC",
					url: "/dashboard/courses/toeic",
				},
				{
					title: "VSTEP",
					url: "/dashboard/courses/vstep",
				},
				{
					title: "University Entrance",
					url: "/dashboard/courses/university-entrance",
				},
			],
		},
		{
			title: "Exams",
			url: "/dashboard",
			icon: Book,
			items: [
				{
					title: "TOEIC",
					url: "/dashboard/toeic",
				},
				{
					title: "VSTEP",
					url: "/dashboard/vstep",
				},
				{
					title: "University Entrance",
					url: "/dashboard/university-entrance",
				},
			],
		},
		{
			title: "Documentation",
			url: "/dashboard/documents",
			icon: BookCopy,
			items: [
				{
					title: "Books",
					url: "/dashboard/documents/books",
				},
				{
					title: "Grammar",
					url: "/dashboard/documents/grammar",
				},
				{
					title: "Vocabulary",
					url: "/dashboard/documents/vocabulary",
				},
				{
					title: "Reading",
					url: "/dashboard/documents/reading",
				},
				{
					title: "Listening",
					url: "/dashboard/documents/listening",
				},
				{
					title: "Speaking",
					url: "/dashboard/documents/speaking",
				},
			],
		},
		// {
		// 	title: "Settings",
		// 	url: "#",
		// 	icon: Settings2,
		// 	items: [
		// 		{
		// 			title: "General",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Team",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Billing",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Limits",
		// 			url: "#",
		// 		},
		// 	],
		// },
	],
	navSecondary: [
		{
			title: "Support",
			url: "/dashboard/support",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "/dashboard/feedback",
			icon: Send,
		},
	],
	// projects: [
	// 	{
	// 		name: "Design Engineering",
	// 		url: "#",
	// 		icon: Frame,
	// 	},
	// 	{
	// 		name: "Sales & Marketing",
	// 		url: "#",
	// 		icon: PieChart,
	// 	},
	// 	{
	// 		name: "Travel",
	// 		url: "#",
	// 		icon: Map,
	// 	},
	// ],
};

export const components: {
	title: string;
	href: string;
	description: string;
}[] = [
	{
		title: "Grammar for University Entrance",
		href: "/tips",
		description:
			"Grammar is a crucial aspect of the University Entrance exam. This section provides a comprehensive guide to the grammar rules and structures that you need to know for success.",
	},
	{
		title: "Vocabulary Essential for University Entrance",
		href: "/tips",
		description:
			"Vocabulary is a key component of the University Entrance exam. This section provides a comprehensive guide to the vocabulary that you need to know for success.",
	},
	{
		title: "Reading Skills for University Entrance",
		href: "/tips",
		description:
			"Reading is a crucial aspect of the University Entrance exam. This section provides a comprehensive guide to the reading skills that you need to know for success.",
	},
	{
		title: "Grammar for VSTEP Success",
		href: "/tips",
		description:
			"Grammar is a crucial aspect of the VSTEP exam. This section provides a comprehensive guide to the grammar rules and structures that you need to know for success.",
	},
	{
		title: "Test-Taking Strategies for All Exams",
		href: "/tips",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Listening Tips for TOEIC",
		href: "/tips",
		description:
			"Listening is a crucial aspect of the TOEIC exam. This section provides a comprehensive guide to the listening skills that you need to know for success.",
	},
];
