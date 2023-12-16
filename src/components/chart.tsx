'use client'
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Label, LabelProps } from 'recharts';
import io from 'socket.io-client';

const initialData = [
  {
    "user_id": 3,
    "photo": "a3.jpg",
    "fill": "#8dd1e1",
    "name": "Michael",
    "score": 16
  },
  {
    "user_id": 4,
    "photo": "a4.jpg",
    "fill": "#82ca9d",
    "name": "Sarah",
    "score": 15
  },
  {
    "user_id": 6,
    "photo": "a6.jpg",
    "fill": "#e94f37",
    "name": "Linda",
    "score": 14
  },
  {
    "user_id": 10,
    "photo": "a10.jpg",
    "fill": "#955e42",
    "name": "William",
    "score": 13
  },
  {
    "user_id": 1,
    "photo": "a1.jpg",
    "fill": "#8884d8",
    "name": "John",
    "score": 10
  },
  {
    "user_id": 5,
    "photo": "a5.jpg",
    "fill": "#a4de6c",
    "name": "David",
    "score": 6
  },
  {
    "user_id": 9,
    "photo": "a9.jpg",
    "fill": "#83a6ed",
    "name": "Emily",
    "score": 6
  },
  {
    "user_id": 7,
    "photo": "a7.jpg",
    "fill": "#ffc658",
    "name": "Megan",
    "score": 6
  },
  {
    "user_id": 2,
    "photo": "a2.jpg",
    "fill": "#99c1b9",
    "name": "Jane",
    "score": 5
  },
  {
    "user_id": 8,
    "photo": "a8.jpg",
    "fill": "#e1ad01",
    "name": "Robert",
    "score": 4
  }
]
interface CustomXAxisTickProps {
  x?: number;
  y?: number;
  payload?: any;
}

const Chart = () => {
  const [data, setData] = useState(initialData);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const CustomXAxisTick: React.FC<CustomXAxisTickProps> = ({ x, y, payload }) => {
    const employeeData = data[payload.value];
    return (
      <g transform={`translate(${x},${y})`}>
        <clipPath id={`avatarClip-${payload.value}`}>
          <circle cx={-28} cy={0} r={28} />
        </clipPath>
        <image
          x={-58}
          y={-30}
          width={58}
          height={58}
          xlinkHref={`/face/${employeeData.photo}`}
          clipPath={`url(#avatarClip-${payload.value})`}
        />
      </g>
    );
  };

  const renderCustomizedLabel = (props: any, bFillWhite: boolean = true) => {
    const { content, ...rest } = props
    return <Label {...rest} fontSize="16" fill={bFillWhite ? "#FFFFFF" : "#6d7e86"} fontWeight="Bold" />
  };
  useEffect(() => {
    const socket = io('http://localhost:3000')
    socket.on('connect', () => {
      setIsSocketConnected(true);
    });
    socket.on('realTimeData', (newData) => {
      setData(newData)
    })
    socket.on('disconnect', () => {
      setIsSocketConnected(false);
    });
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <div className="flex items-center">
        {isSocketConnected && (
          <>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute "></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="text-xs ml-2 text-muted-foreground">Connected</div>
          </>
        )}
        {!isSocketConnected && (
          <>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="text-xs ml-2 text-muted-foreground">Disconnected</div>
          </>
        )}
        {/* Render the rest of your component */}
      </div>
      <ResponsiveContainer width="100%" height="100%" aspect={4.0 / 3.0}>
        <BarChart
          layout='vertical'
          width={800}
          height={500}
          data={data}
          margin={{ top: 5, right: 30, bottom: 5, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          {/* <Tooltip /> */}
          <XAxis type='number' orientation={"top"} />
          <Bar dataKey="score" fill="#ff6f31" >
            <LabelList dataKey="name" position="insideRight" content={renderCustomizedLabel} />
            <LabelList dataKey="score" position="right" content={(props) => renderCustomizedLabel(props, false)}
            />
          </Bar>
          <YAxis type="category" tick={<CustomXAxisTick />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart