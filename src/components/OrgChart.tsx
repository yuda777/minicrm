'use client'
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import { UserWithPosition } from "@/types";
import { getHeadUser } from "@/app/_actions/user";
import { PositionColor } from "@/config/users";
import { BadgeVariant } from "@/components/ui/badge";
import ReactDOMServer from "react-dom/server";
function useDataOrgStrct() {
  const [data, setData] = React.useState<UserWithPosition[]>([]);
  const loadDataOrgStruct = async () => {
    try {
      const orgSt = await getHeadUser();
      setData(orgSt)
    } catch (error) {
      console.error("There was an error with the fetch operation:", error);
    }
  }
  React.useEffect(() => {
    loadDataOrgStruct();
  }, []);
  return {
    data
  }
}
function colorScheme(departementCode: string) {
  const color = (departementCode) ? PositionColor.find(job => job.id.includes(departementCode)) : null
  // const bv = (pc) ? pc.color ?? 'default' : 'default'
  return color?.color as BadgeVariant['variant']
}
const OrganizationalChart = ({ }) => {
  const { data } = useDataOrgStrct();
  const chart = new OrgChart();
  const d3Container = useRef<any>(null);

  useLayoutEffect(() => {
    if (data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth((d: any) => 200)
        .nodeHeight((d: any) => 120)
        .layout("left")
        .compact(false)
        .nodeContent(function (d: any, i, arr, state) {
          const color = {
            "bgLight": '#FFFFFF',
            "bgDark": "#1e293b",
            "txLight": '#1e293b',
            "txtDark": "#FFFFFF"
          }
          const colorPosition = colorScheme(d.data.departementCode)
          const imageDiffVert = 25 + 2
          return `
            <div style='width:${d.width}px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
              <div class="bg-[${color.bgLight}] dark:bg-[${color.bgDark}]" style="font-family: 'Inter', sans-serif;  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: 1px solid #E4E2E9">
                <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">
                  <a target="_blank" href="/list/${d.data.id}">#${d.data.id}</a>
                </div>
                <div class="bg-[${color.bgLight}] dark:bg-[${color.bgDark}]" style="margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" >
                </div>
                <div style="margin-top:${-imageDiffVert - 20}px;">   
                  <img src="/face/${d.data.photo}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />
                </div>
                <div class="text-[${color.txLight}] dark:text-[${color.txtDark}] " style="font-size:15px;margin-left:20px;margin-top:10px">  
                  ${d.data.userName} 
                </div>
                <div class="text-[${color.txLight}] dark:text-[${color.txtDark}] " style="margin-left:20px;margin-top:3px;font-size:10px;"> 
                  <span class=" px-2 bg-${colorPosition}-200 text-${colorPosition}-900 border border-${colorPosition}-700">${d.data.titleDesc}</span>
                </div>
              </div>
            </div>
          `;
        })
        .render()
      //.expandAll().fit();
    }
  }, [data]);

  return (
    <div className="w-full">
      <div ref={d3Container} className="w-full" />
      <div>
      </div>
    </div>
  )
}
const Cards = (d: any) => {
  const color = '#FFFFFF'
  const imageDiffVert = 25 + 2

  return (
    <div className={`w-[${d.width}px] h-[${d.height}px] pt-[${imageDiffVert - 2}px] px-[1px]`}>
      <div className={`font-inter bg-[${color}] dark:bg-[#1d283a] ml-[-1px] w-[${d.width - 2}px] h-[${d.height - imageDiffVert}px]  border dark:border-white`}>
        <div className={`flex justify-end mt-[5px] mr-[8px]`}>
          #${d.data.id}
        </div>
        <div className={`bg-[${color}] dark:bg-[#1d283a] mt-[${-imageDiffVert - 20}px] ml-[${15}px]  w-[50px] h-[50px]`} >
        </div>
        <div className={`mt-[${-imageDiffVert - 20}px]`}>
          <img src={`/face/${d.data.photo}`} className={`ml-[${20}px]  border w-[40px] h-[40px]`} />
        </div>
        <div className={`text-sm text-[#08011E] ml-[20px] mt-[10px]`}>
          ${d.data.userName}
        </div>
        <div className="text-[#716E7B] ml-[20px] mt-[3px] text-sm">
          ${d.data.titleDesc}
        </div>
      </div>
    </div>
  );
};
export default OrganizationalChart;

