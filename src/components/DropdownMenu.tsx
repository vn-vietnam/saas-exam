import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Menu,
	User2Icon,
	DollarSignIcon,
	SettingsIcon,
	KeyboardIcon,
	GroupIcon,
	LogOutIcon,
	LogInIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function DropdownMenuWrapper({ session }: { session: Session }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Menu />
				</Button>
			</DropdownMenuTrigger>
			{!session ? (
				<DropdownMenuContent className="w-48">
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							Blog
							<DropdownMenuShortcut>
								<DollarSignIcon />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							Settings
							<DropdownMenuShortcut>
								<SettingsIcon />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							Keyboard shortcuts
							<DropdownMenuShortcut>
								<KeyboardIcon />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>

					<DropdownMenuSeparator />
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
						<DropdownMenuItem>
							Profile
							<DropdownMenuShortcut>
								{/* <User2Icon /> */}
								<Image
									src={session?.user?.image || "/user.png"}
									alt="User Avatar"
									width={25}
									height={25}
								/>
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							Billing
							<DropdownMenuShortcut>
								<DollarSignIcon />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							Settings
							<DropdownMenuShortcut>
								<SettingsIcon />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							Keyboard shortcuts
							<DropdownMenuShortcut>
								<KeyboardIcon />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>Team</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem>Email</DropdownMenuItem>
									<DropdownMenuItem>Message</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>More...</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuItem>
							New Team
							<DropdownMenuShortcut>
								<GroupIcon />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem>GitHub</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuItem disabled>API</DropdownMenuItem>
					<DropdownMenuSeparator />
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
