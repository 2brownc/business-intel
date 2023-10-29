import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


export function CategoryChart({ width, height, data }) {
  return (
    <AreaChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="credit" stroke="#177245" fill="#177245" />
      <Area type="monotone" dataKey="debit" stroke="#a52a2a" fill="#a52a2a" />
    </AreaChart>
  )
}