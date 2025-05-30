import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Menu,
	SettingsIcon,
	KeyboardIcon,
	LightbulbIcon,
	LogOutIcon,
	LogInIcon,
	BookAIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function DropdownMenuWrapper({ session }: { session: Session }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<Menu />
				</Button>
			</DropdownMenuTrigger>
			{!session ? (
				<DropdownMenuContent className="w-48">
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link href="/blog">
								Blog
								<DropdownMenuShortcut>
									<BookAIcon />
								</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/tips">
								Tips and Tricks
								<DropdownMenuShortcut>
									<LightbulbIcon />
								</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/auth/signin">
							Log in
							<DropdownMenuShortcut>
								<LogInIcon />
							</DropdownMenuShortcut>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			) : (
				<DropdownMenuContent className="w-48">
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link href="/dashboard/profile">
								Profile
								<DropdownMenuShortcut>
									{/* <User2Icon /> */}
									<Image
										src={session?.user?.image || "/images/user.png"}
										alt="User Avatar"
										width={25}
										height={25}
									/>
								</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/dashboard">
								Dashboard
								<DropdownMenuShortcut>
									<SettingsIcon />
								</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/tips">
								Tips and Tricks
								<DropdownMenuShortcut>
									<LightbulbIcon />
								</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/blog">
								Blog
								<DropdownMenuShortcut>
									<KeyboardIcon />
								</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<div onClick={() => signOut({ redirect: true })}>
							Logout
							<DropdownMenuShortcut>
								<LogOutIcon />
							</DropdownMenuShortcut>
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			)}
		</DropdownMenu>
	);
}
