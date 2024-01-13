import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

type TStatus = React.HTMLAttributes<HTMLDivElement> & {
  status: boolean,
  wthLabel?: boolean,
  toolTips?: boolean
}

const IconStatus = ({ status, wthLabel = false, toolTips = false, className, ...props }: TStatus): React.ReactNode => {
  const statusArr = [
    {
      text: "Active",
      value: true,
      icon: Icons.checkCircle,
      color: 'text-green-500'
    },
    {
      text: "Non Active",
      value: false,
      icon: Icons.circleOff,
      color: 'text-rose-600'
    },
  ]
  const SelectedStatus = statusArr.find(val => val.value === status)
  const divSelectedStatus = SelectedStatus && (<div className="flex">
    <SelectedStatus.icon aria-hidden="true" className={cn(SelectedStatus?.color, "h-5 w-5")} />
    <div {...props} className={cn(className, " ml-2")}>{wthLabel ? SelectedStatus?.text : null}</div>
  </div>)
  return (SelectedStatus &&
    toolTips ?
    (<TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"pasive"} size={"plain"}>
            {divSelectedStatus}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {SelectedStatus?.text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>) :
    <div>
      {divSelectedStatus}
    </div>
  )
}
export default IconStatus