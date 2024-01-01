import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

type TStatus = React.HTMLAttributes<HTMLDivElement> & {
  status: boolean,
  wthLabel?: boolean
}

const IconStatus = ({ status, wthLabel = false, className, ...props }: TStatus): React.ReactNode => {
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
  return (SelectedStatus &&
    <>
      <span title={SelectedStatus?.text}>
        {/* <SelectedStatus.icon color={SelectedStatus.color} aria-labelledby="asf" /> */}
        <SelectedStatus.icon aria-hidden="true" className={cn(SelectedStatus?.color, "h-5 w-5")} />
      </span>
      <div {...props} className={cn(className, " ml-2")}>{wthLabel ? SelectedStatus?.text : null}</div>
    </>)
}
export default IconStatus