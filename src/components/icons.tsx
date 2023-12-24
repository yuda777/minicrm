import {
	AlarmClock,
	AlertTriangle,
	ArrowDown,
	ArrowUp,
	BarChart3,
	CalendarDays,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ChevronsUpDown,
	ChevronUp,
	Circle,
	Copy,
	CreditCard,
	Crop,
	DollarSign,
	Download,
	Edit,
	Eye,
	ExternalLink,
	EyeOff,
	FileTerminal,
	FileUp,
	Filter,
	Footprints,
	HardHat,
	Image,
	Loader2,
	LogOut,
	Menu,
	MessageSquare,
	Minus,
	Moon,
	MoreHorizontal,
	MoreVertical,
	Network,
	Package,
	Plus,
	PlusCircle,
	RefreshCw,
	Search,
	Send,
	Settings,
	Shirt,
	ShoppingBag,
	ShoppingCart,
	Sliders,
	SlidersHorizontal,
	Star,
	SunMedium,
	Trash,
	Twitter,
	UploadCloud,
	User,
	UsersRound,
	HeartHandshake,
	Volume2,
	VolumeX,
	Wallet,
	X,
	type LucideIcon,
	type LucideProps,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
	sun: SunMedium,
	moon: Moon,
	star: Star,
	twitter: Twitter,
	close: X,
	spinner: Loader2,
	chevronLeft: ChevronLeft,
	chevronRight: ChevronRight,
	chevronsLeft: ChevronsLeft,
	chevronsRight: ChevronsRight,
	chevronUp: ChevronUp,
	chevronDown: ChevronDown,
	chevronUpDown: ChevronsUpDown,
	arrowUp: ArrowUp,
	arrowDown: ArrowDown,
	menu: Menu,
	verticalThreeDots: MoreVertical,
	horizontalThreeDots: MoreHorizontal,
	verticalSliders: Sliders,
	horizontalSliders: SlidersHorizontal,
	circle: Circle,
	check: Check,
	add: Plus,
	addCircle: PlusCircle,
	remove: Minus,
	view: Eye,
	hide: EyeOff,
	trash: Trash,
	edit: Edit,
	crop: Crop,
	reset: RefreshCw,
	send: Send,
	copy: Copy,
	downlaod: Download,
	warning: AlertTriangle,
	search: Search,
	filter: Filter,
	fileup: FileUp,
	network: Network,
	alarm: AlarmClock,
	calendar: CalendarDays,
	user: User,
	terminal: FileTerminal,
	settings: Settings,
	logout: LogOut,
	volumne: Volume2,
	volumneMute: VolumeX,
	message: MessageSquare,
	billing: CreditCard,
	wallet: Wallet,
	dollarSign: DollarSign,
	cart: ShoppingCart,
	product: Package,
	store: ShoppingBag,
	chart: BarChart3,
	upload: UploadCloud,
	placeholder: Image,
	clothing: Shirt,
	customer: HeartHandshake,
	shoes: Footprints,
	accessories: HardHat,
	externalLink: ExternalLink,
	excel: (props: LucideProps) => (
		<svg enableBackground="new 0 0 30 30" height="30px" id="Layer_1" version="1.1" viewBox="0 0 30 30" width="30px" xmlns="http://www.w3.org/2000/svg" {...props}><g>
			<path clipRule="evenodd" d="M28.705,7.506l-5.461-6.333l-1.08-1.254H9.262   c-1.732,0-3.133,1.403-3.133,3.136V7.04h1.942L8.07,3.818c0.002-0.975,0.786-1.764,1.758-1.764l11.034-0.01v5.228   c0.002,1.947,1.575,3.523,3.524,3.523h3.819l-0.188,15.081c-0.003,0.97-0.79,1.753-1.759,1.761l-16.57-0.008   c-0.887,0-1.601-0.87-1.605-1.942v-1.277H6.138v1.904c0,1.912,1.282,3.468,2.856,3.468l17.831-0.004   c1.732,0,3.137-1.41,3.137-3.139V8.966L28.705,7.506" fill="#434440" fillRule="evenodd" /><path d="M20.223,25.382H0V6.068h20.223V25.382 M1.943,23.438h16.333V8.012H1.943" fill="#08743B" /><polyline fill="#08743B" points="15.73,20.822 12.325,20.822 10.001,17.538 7.561,20.822 4.14,20.822 8.384,15.486 4.957,10.817    8.412,10.817 10.016,13.355 11.726,10.817 15.242,10.817 11.649,15.486 15.73,20.822  " /></g>
		</svg>
	),
	logo: (props: LucideProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<circle cx="7" cy="15" r="2" />
			<circle cx="17" cy="15" r="2" />
			<path d="M3 9a2 1 0 0 0 2 1h14a2 1 0 0 0 2 -1" />
		</svg>
	),
	logo2: (props: LucideProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" version="1.1"
			viewBox="0 0 50 50"
			{...props}
		>
			<metadata id="CorelCorpID_0Corel-Layer" />
			<circle fill="#F58634" cx="26" cy="25" r="18" />
			<path fill="#F58634" d="M44 36c0,-1 1,-1 2,-1 1,0 1,1 1,2l0 0c-1,1 -2,2 -2,3 -1,1 -2,2 -3,3 -4,4 -9,6 -16,6l0 0c-6,0 -12,-3 -16,-7 -5,-4 -7,-10 -7,-17l0 0 0 0c0,-6 2,-12 7,-16 4,-5 10,-7 16,-7l0 0 0 0c4,0 7,0 10,2 1,0 1,1 2,1 4,2 7,5 9,9 0,0 0,1 -1,2 -1,0 -2,0 -2,-1 -2,-3 -4,-5 -7,-7 -1,-1 -2,-1 -2,-1 -3,-1 -6,-2 -9,-2l0 0 0 0c-5,0 -10,2 -14,6 -4,4 -6,9 -6,14l0 0 0 0c0,6 2,11 6,15 4,3 9,6 14,6l0 0c6,0 11,-2 14,-6 1,-1 2,-1 2,-2 1,-1 1,-2 2,-2l0 0 0 0z" />
			<path fill="black" d="M24 43c0,0 0,0 0,0 -2,0 -3,0 -4,0 0,-1 0,-1 0,-2 0,0 -1,-1 -1,-1 0,0 0,-1 1,-1 0,0 0,-1 0,-1 0,-1 0,-1 0,-1 0,0 0,0 0,0 0,-1 0,-1 0,-2 1,0 1,-1 1,-1 0,-1 0,-1 0,-2 0,0 0,0 0,-1 0,0 1,-1 1,-2 0,0 0,0 0,0 0,0 0,0 0,0 0,-1 0,-1 0,-1 0,0 0,-1 0,-1 0,0 0,-1 0,-1 0,0 0,0 0,0 1,-1 1,-2 1,-3 0,0 0,-1 0,-1 0,0 0,-1 0,-1 0,0 0,0 0,1 0,0 0,0 0,0 -1,0 -1,0 -1,1 0,-1 0,-1 1,-1 0,-1 0,-1 0,-1 0,0 0,0 0,0 0,0 0,0 -1,0 0,-1 0,0 0,-1 0,0 -1,1 -1,1 0,0 0,0 0,0 0,0 -1,1 -2,1 1,-1 1,-1 1,-1 0,0 1,0 1,0 0,-1 0,-1 1,-1 0,0 0,0 0,0 0,-1 0,-1 0,-1 0,-1 0,-1 0,-1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,-1 0,-1 0,-1 0,0 0,0 0,0 0,0 0,0 0,0 -1,0 -1,0 -1,0 0,0 0,0 0,1 0,0 0,0 0,0 0,0 1,0 1,0 0,0 -1,0 -1,0 0,0 0,0 0,0 0,0 0,0 -1,-1 0,0 0,0 1,0 0,0 0,0 0,0 0,-1 0,-1 0,-1 0,1 0,1 0,1 0,0 0,0 0,0 0,0 1,0 1,-1 0,0 0,0 0,0 -1,0 -1,0 -1,0 0,0 0,0 -1,0 0,0 0,0 0,-1 0,0 0,1 0,1 0,-1 0,-1 0,-1 0,0 -1,0 -1,0 0,0 -1,0 -1,0 0,0 0,0 0,0 0,1 0,1 0,1 -1,0 -1,0 -1,0 0,0 0,0 -1,0 0,0 0,0 0,0 -1,0 -1,0 -1,1 0,0 -1,0 0,1 0,0 0,0 0,0 0,1 0,2 1,2 0,1 0,1 0,2 0,0 0,0 0,0 0,1 -1,1 -2,2 0,0 -1,0 -1,0 0,0 0,0 0,0 0,-1 -1,-2 -1,-2 0,0 0,-1 0,-1 0,0 0,0 0,0 0,-1 -1,-1 -1,-1 0,-1 0,-1 0,-2 -1,0 -1,-1 -1,-1 0,-1 1,-1 1,-1 0,-1 0,-1 1,-1 0,-1 0,-1 1,-2 0,0 0,0 0,0 1,-1 3,-1 4,-2 1,0 2,-1 3,-1 0,0 0,-1 1,-1 0,0 0,0 0,0 0,0 0,0 1,0 0,0 1,0 1,-1 0,0 0,0 0,0 0,1 0,1 1,1 0,0 0,0 0,0 0,0 -1,0 -1,0 0,0 0,1 0,1 1,0 1,0 1,0 0,0 0,0 0,1 0,0 1,0 1,0 0,0 0,0 0,0 -1,-1 -1,-1 -1,-1 0,-1 0,-1 0,-1 0,0 0,0 0,0 -1,-1 0,-1 0,-1 1,0 1,0 1,-1 0,0 0,0 1,0 0,0 0,0 0,0 1,0 2,0 3,1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 1,0 1,1 0,0 0,0 0,0 0,1 0,1 0,2 0,0 0,0 0,1 0,0 0,0 0,1 0,0 0,1 0,1 0,0 0,0 0,1 -1,0 0,0 -1,0 0,1 0,1 0,1 0,0 0,0 0,0 0,0 0,1 0,1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,1 0,1 0,0 1,0 1,0 0,0 0,0 0,0 1,0 1,1 1,1 0,0 0,0 0,0 1,0 1,1 2,1 0,0 0,0 0,0 0,0 0,1 0,1 -1,-1 -1,-1 -1,-1 0,0 0,-1 -1,-1 0,0 -1,-1 -2,-1 0,0 0,0 0,0 0,0 0,0 -1,0 0,0 0,0 0,0 0,0 0,0 0,0 0,1 0,1 0,1 0,0 0,0 0,0 0,0 0,0 0,1 0,0 1,0 1,0 0,1 0,1 0,1 0,0 -1,0 -1,0 0,0 -1,0 -2,0 0,0 1,0 1,0 1,0 1,0 1,0 0,0 0,1 0,1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,1 0,1 0,0 0,0 0,1 0,0 0,0 0,0 0,0 0,0 0,1 0,0 0,0 0,1 0,0 0,0 -1,1 0,0 0,1 0,2 0,0 0,0 0,0 0,0 0,0 0,0 0,1 0,1 0,1 0,0 0,1 0,1 0,0 0,1 -1,1 0,0 0,0 0,0 0,1 0,1 0,1 1,0 1,0 2,0 0,-1 0,0 1,0 0,0 0,0 -1,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 -1,0 -1,0 0,0 0,0 0,0 0,0 0,0 0,1 1,0 1,-1 1,-1 0,1 1,1 1,0 0,0 0,0 0,0 1,0 1,0 1,0 0,0 0,0 0,0 1,0 1,-1 2,-1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,1 0,1 0,1 0,0 -1,0 -1,0 0,1 -1,1 -1,1 0,0 0,0 0,0 -1,0 -1,0 -1,1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 -1,0 0,0 0,0 0,0 0,0 -1,0 -1,0 0,0 -1,0 -1,0 0,0 0,0 0,0 0,0 1,1 2,0 0,0 0,0 0,1 1,0 1,-1 2,-1 0,0 0,0 1,0 0,-1 0,-1 1,-1 0,0 0,0 0,0 1,0 1,-1 2,-1 0,0 1,0 1,-1 1,0 1,0 1,0 0,0 0,0 1,0 0,-1 0,-1 -1,-1 0,0 0,0 0,-1 0,0 0,0 0,-1 0,0 0,-1 -1,-1 0,-1 0,-2 0,-2 0,0 1,0 1,0 1,-1 1,-1 1,-1 1,0 1,0 2,0 0,0 0,1 0,1 0,1 1,1 1,2 0,0 0,0 0,0 0,0 0,1 0,1 0,0 1,0 1,1 0,1 1,1 1,2 0,1 0,1 0,1 0,0 -1,1 -1,1 0,0 0,0 0,0 0,1 -2,1 -3,2 -1,0 -1,1 -2,1 0,0 0,0 -1,0 0,1 0,1 -1,1 0,0 0,0 -1,0 -1,1 -2,1 -3,2 0,0 -1,0 -2,1 -1,0 -1,0 -2,0 0,1 0,1 0,1 -1,0 -2,0 -2,0zm2 -5c0,0 0,0 -1,0 0,0 1,-1 1,-1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 1,0 1,0 1,0 0,0 0,0 0,0 0,0 0,0 -1,0 0,0 0,0 0,0 0,1 0,1 0,1zm2 -2c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm-1 -1c0,0 0,0 -1,0 1,0 1,0 1,0 0,0 0,0 0,0zm1 0c0,0 -1,0 -1,0 1,0 1,0 1,0 0,0 0,0 0,0zm1 0c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm3 0c0,0 0,0 0,0 0,-1 0,-1 0,-1 0,1 0,1 0,1zm0 -1c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm-1 0c0,0 0,0 0,0 0,0 0,0 0,0 0,0 1,0 1,0 -1,0 -1,0 -1,0 0,0 0,0 0,0zm2 0c-1,0 -1,0 -1,0 0,-1 0,-1 1,-1 0,0 0,0 0,0 0,1 0,1 0,1zm1 -1c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm-1 0c0,0 0,0 0,-1 1,0 1,0 2,0 0,0 0,-1 1,0 0,0 0,0 0,0 -1,0 -1,0 -1,0 0,0 0,0 0,0 0,0 0,0 0,0 -1,0 -1,0 -2,1 0,0 0,0 0,0 0,0 0,0 0,0zm8 -4c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm-5 -3c0,0 0,0 0,0 0,0 0,-1 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm-19 0c0,0 0,-1 0,-1 0,0 1,0 1,0 0,0 1,0 1,0 0,0 0,0 0,0 0,0 -1,0 -1,1 0,0 0,0 -1,0zm13 0c0,-1 0,-1 0,-1 0,-1 0,-1 0,0 0,0 1,0 1,0 0,0 0,0 0,0 -1,0 -1,1 -1,1zm-10 -1c0,0 0,0 0,0 0,0 0,-1 0,-1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 1,0 1,1 -1,0 -1,0 -1,0zm7 -2c0,-1 0,-1 0,-1 0,0 -1,0 -1,0 0,0 0,0 0,0 0,0 0,0 1,0 0,0 0,0 0,1 0,0 0,0 0,0zm-5 0c0,-1 -1,-1 0,-1 0,0 0,0 0,0 0,0 0,0 0,1zm7 -1c0,0 0,0 0,0 0,0 0,0 0,0 1,0 1,0 1,0 0,0 0,0 -1,0zm-11 0c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm1 0c0,0 0,0 0,0 0,0 0,0 0,0zm-2 -1c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm5 0c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm1 0c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm-6 -1c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm9 -1c0,0 0,0 0,0 0,0 0,-1 0,-1 0,0 0,0 0,0 0,1 0,1 0,1 0,0 0,0 0,0 0,0 0,0 0,0zm1 -1c0,0 0,0 0,0 0,0 0,0 -1,0 0,0 0,0 0,0 0,0 0,0 0,0 1,0 1,0 1,-1 0,0 0,0 1,1 0,0 0,0 -1,0zm1 -1c0,0 0,0 0,-1 0,0 0,0 -1,1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,-1 0,-1 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 -1,0 -1,0 -1,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 1,0 1,0 0,0 0,0 0,0 0,-1 0,-1 1,-1 0,0 0,0 0,0 0,1 1,1 1,1 0,0 0,0 0,0 0,0 0,0 -1,0 0,0 0,0 0,0 0,0 1,1 0,1zm-2 -1c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm1 0c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 1,0 0,0 0,0 -1,0 0,0 0,0 0,0zm-1 -1c0,0 0,0 0,0 0,0 0,0 0,0 0,0 1,0 1,0 0,0 0,0 0,0 -1,0 -1,0 -1,0 0,0 0,0 0,0zm1 -1c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm-2 -2c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm1 -2c0,0 0,-1 0,-1 0,0 0,0 0,0 0,0 0,-1 0,-1 1,1 1,1 0,2 0,0 0,0 0,0zm0 -1c0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0zm-5 0c0,-1 0,-1 1,-1 0,0 0,0 0,0 0,0 -1,1 -1,1z" />
		</svg>
	),
	logo_complete: (props: LucideProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="450px" height="156px" version="1.1"
			viewBox="0 0 450 156"
			{...props}
		>
			<g id="Layer_x0020_1">
				<path fill="#373435" d="M341 32l0 0 0 0c-4,0 -8,2 -11,5 -2,2 -4,6 -4,9l0 0 0 1c0,3 2,7 4,9 3,3 7,5 11,5l0 0 0 0c4,0 7,-2 10,-5 3,-2 4,-6 4,-10l0 0 0 0c0,-3 -1,-7 -4,-9 -3,-3 -6,-5 -10,-5zm63 -8c0,-5 4,-9 10,-9 5,0 9,4 9,9l0 74c0,5 -4,9 -9,9 -6,0 -10,-4 -10,-9l0 -74zm-244 36l0 -17 0 0c0,-3 -2,-5 -4,-7 -2,-2 -5,-4 -8,-4l0 0 0 0c-3,0 -6,2 -8,4 -2,2 -3,4 -3,7l0 0 0 17 23 0zm-23 38c0,5 -4,9 -9,9 -5,0 -10,-4 -10,-9l0 -29 0 -26 0 0c0,-8 4,-15 9,-20 6,-5 13,-8 21,-8l0 0 0 0c9,0 16,3 21,8 6,5 9,12 9,20l0 0 0 26 0 29c0,5 -4,9 -9,9 -5,0 -9,-4 -9,-9l0 -20 -23 0 0 20zm-112 -66c-6,0 -10,-4 -10,-8 0,-5 4,-9 10,-9l51 0c7,0 11,8 8,13l-40 62 35 0c5,0 9,4 9,8 0,5 -4,9 -9,9l-52 0c-7,0 -12,-8 -8,-13l40 -62 -34 0zm327 44l19 16c4,3 4,9 1,12 -3,4 -9,4 -13,1l-33 -28 0 21c0,5 -4,9 -9,9 -6,0 -10,-4 -10,-9l0 -50c0,-1 0,-2 1,-3 0,-8 4,-15 9,-21 6,-6 15,-9 24,-9l0 0 0 0c9,0 17,3 23,9 6,6 10,14 10,22l0 0 0 0c0,9 -4,17 -10,23 -3,3 -7,6 -12,7z" />
				<path fill="#F58634" d="M202 3l80 0c5,0 9,4 9,9l0 134c0,5 -4,10 -9,10l-80 0c-5,0 -10,-5 -10,-10l0 -134c0,-5 5,-9 10,-9z" />
				<g id="_2095064203184">
					<path fill="#F58634" d="M351 120l0 0c4,0 8,2 11,4 3,3 4,7 4,11l0 0 0 0c0,4 -1,8 -4,11 -3,2 -7,4 -11,4l0 0 0 0c-4,0 -8,-2 -11,-4 -3,-3 -5,-7 -5,-11l0 0 0 0c0,-4 2,-8 5,-11 3,-2 7,-4 11,-4l0 0zm0 7l0 0 0 0c-2,0 -5,1 -6,2 -1,2 -2,4 -2,6l0 0 0 0c0,2 1,4 2,6 1,1 4,2 6,2l0 0 0 0c2,0 4,-1 6,-2 1,-2 2,-4 2,-6l0 0 0 0c0,-2 -1,-4 -2,-6 -2,-1 -4,-2 -6,-2z" />
					<path fill="#F58634" d="M303 146c0,2 -1,4 -3,4 -2,0 -4,-2 -4,-4l0 -14 0 0c0,-3 1,-6 3,-8 2,-3 5,-4 9,-4l0 0 0 0c3,0 6,1 8,3 2,-2 5,-3 8,-3l0 0 0 0c3,0 6,1 9,4 2,2 3,5 3,8l0 0 0 14c0,2 -2,4 -4,4 -2,0 -3,-2 -3,-4l0 -14 0 0c0,-2 -1,-3 -2,-4 0,0 -2,-1 -3,-1l0 0 0 0c-1,0 -2,1 -3,1 -1,1 -1,2 -1,4l0 0 0 14c0,2 -2,4 -4,4 -2,0 -4,-2 -4,-4l0 -14 0 0c0,-2 0,-3 -1,-4 -1,0 -2,-1 -3,-1l0 0 0 0c-1,0 -3,1 -3,1 -1,1 -2,2 -2,4l0 0 0 14z" />
					<path fill="#F58634" d="M404 131l14 0c0,0 -1,-1 -1,-2l0 0c-2,-1 -4,-2 -6,-2l0 0 0 0c-2,0 -4,1 -6,2l0 0c-1,1 -1,2 -1,2zm19 8l-19 0c0,0 0,1 1,2 2,1 4,2 6,2l0 0 0 0c1,0 2,0 3,-1 0,0 0,0 0,0 1,0 2,0 2,-1 2,-1 4,-1 5,1 2,1 1,3 0,5 -1,0 -3,1 -4,2 0,0 0,0 -1,0 -1,1 -3,1 -5,1l0 0 0 0c-4,0 -8,-2 -11,-4 -3,-3 -5,-7 -5,-11l0 0 0 0c0,-4 2,-8 5,-11l0 0c3,-2 7,-4 11,-4l0 0 0 0c4,0 8,2 11,4l0 0c3,3 4,7 4,11l0 0c0,2 -1,4 -3,4z" />
					<path fill="#F58634" d="M380 120l0 0c3,0 6,1 8,2l0 -10c0,-2 2,-4 4,-4 2,0 4,2 4,4l0 21c0,1 0,1 0,1 0,0 0,1 0,1l0 0 0 0c0,4 -2,8 -5,11 -3,2 -7,4 -11,4l0 0 0 0c-4,0 -8,-2 -11,-4l0 0c-3,-3 -4,-7 -4,-11l0 0 0 0c0,-4 1,-8 4,-11l0 0c3,-2 7,-4 11,-4l0 0zm0 7l0 0 0 0c-2,0 -4,1 -6,2l0 0c-1,2 -2,4 -2,6l0 0 0 0c0,2 1,4 2,6l0 0c2,1 4,2 6,2l0 0 0 0c2,0 4,-1 6,-2 1,-2 2,-4 2,-6l0 0 0 0c0,-2 -1,-4 -2,-6 -2,-1 -4,-2 -6,-2z" />
				</g>
				<path fill="#FEFEFE" d="M227 52l30 0 0 -28c0,-5 4,-9 9,-9 5,0 9,4 9,9l0 74c0,5 -4,9 -9,9 -5,0 -9,-4 -9,-9l0 -28 -30 0 0 28c0,5 -4,9 -9,9 -5,0 -9,-4 -9,-9l0 -74c0,-5 4,-9 9,-9 5,0 9,4 9,9l0 28z" />
			</g>
		</svg >
	),
	nextjs: (props: LucideProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
			<path
				fill="currentColor"
				d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
			/>
		</svg>
	),
	gitHub: (props: LucideProps) => (
		<svg viewBox="0 0 438.549 438.549" {...props}>
			<path
				fill="currentColor"
				d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
			></path>
		</svg>
	),
	google: ({ ...props }: LucideProps) => (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fab"
			data-icon="discord"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 488 512"
			{...props}
		>
			<path
				fill="currentColor"
				d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
			></path>
		</svg>
	),
	facebook: ({ ...props }: LucideProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" {...props}>
			<path
				fill="currentColor"
				d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
			/>
		</svg>
	),
	discord: ({ ...props }: LucideProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
			<path
				fill="currentColor"
				d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
			/>
		</svg>
	),
	hy: ({ ...props }: LucideProps) => (
		<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
			width="70.000000pt" height="80.000000pt" viewBox="0 0 154.000000 263.000000"
			preserveAspectRatio="xMidYMid meet" {...props}>

			<g transform="translate(0.000000,263.000000) scale(0.085000,-0.085000)"
				fill="#FFFFFF" stroke="none">
				<path d="M377 2619 c-119 -28 -236 -122 -287 -231 -47 -102 -51 -156 -48 -740
3 -526 3 -537 24 -565 11 -15 38 -34 60 -42 34 -12 44 -11 76 2 68 29 72 45
78 283 l5 212 31 38 c54 68 77 79 158 79 83 0 124 -21 167 -83 22 -33 24 -47
30 -216 7 -191 17 -241 62 -319 35 -60 128 -144 189 -172 105 -48 242 -51 342
-10 l37 16 -3 -209 c-3 -209 -3 -209 -31 -250 -32 -49 -89 -81 -160 -89 -97
-11 -144 -92 -102 -173 29 -55 95 -72 194 -49 174 40 303 182 331 364 7 45 10
260 8 607 -3 526 -3 537 -24 565 -11 15 -38 34 -60 42 -34 12 -44 11 -76 -2
-68 -29 -72 -45 -78 -282 l-5 -212 -27 -36 c-50 -65 -84 -82 -164 -82 -80 0
-122 21 -165 83 -22 33 -24 47 -30 216 -7 191 -17 241 -62 319 -35 60 -128
144 -189 172 -105 48 -242 51 -342 10 l-37 -16 3 209 c3 209 3 209 31 250 32
49 89 81 160 89 97 11 144 92 102 173 -28 55 -100 72 -198 49z"/>
			</g>
		</svg>
	),
	defaultUser: ({ ...props }: LucideProps) => (
		<svg height="50px" width="50px"
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 53 53" {...props}>
			<path
				fill="#E7ECED" d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53
	c6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322
	c0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546
	c0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126
	c-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24
	C20.296,39.899,19.65,40.986,18.613,41.552z"/>
			<g fill="#556080">
				<path d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76
		c0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.633
		c-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977
		s9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53
		c-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233
		c0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z"/>
			</g>
		</svg>
	)
}
