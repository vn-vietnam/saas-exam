import {
	BookOpen,
	Bot,
	Frame,
	LifeBuoy,
	Map,
	PieChart,
	Send,
	Settings2,
	SquareTerminal,
} from "lucide-react";

export const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		image: "/user.png",
	},
	navMain: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
					url: "#",
				},
			],
		},
		{
			title: "Models",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General",
					url: "#",
				},
				{
					title: "Team",
					url: "#",
				},
				{
					title: "Billing",
					url: "#",
				},
				{
					title: "Limits",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
};

export const components: { title: string; href: string; description: string }[] = [
	{
	  title: "Alert Dialog",
	  href: "/docs/primitives/alert-dialog",
	  description:
		"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
	  title: "Hover Card",
	  href: "/docs/primitives/hover-card",
	  description:
		"For sighted users to preview content available behind a link.",
	},
	{
	  title: "Progress",
	  href: "/docs/primitives/progress",
	  description:
		"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
	  title: "Scroll-area",
	  href: "/docs/primitives/scroll-area",
	  description: "Visually or semantically separates content.",
	},
	{
	  title: "Tabs",
	  href: "/docs/primitives/tabs",
	  description:
		"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
	  title: "Tooltip",
	  href: "/docs/primitives/tooltip",
	  description:
		"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
  ]