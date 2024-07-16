'use client';

import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";
import { differenceInDays, parseISO, addDays, formatISO9075 } from 'date-fns';

export default function Chart({data}) {
    const xLabelKey = Object.keys(data[0]).find(key => key !== 'date');

    const dataWithoutGaps = [];
  data.forEach((value, index) => {
    const date = value.date;
    dataWithoutGaps.push({
      date,
      [xLabelKey]: value?.[xLabelKey] || 0,
    });
    const nextDate = data?.[index + 1]?.date;
    if (date && nextDate) {
      const daysBetween = differenceInDays(
        parseISO(nextDate),
        parseISO(date)
      );
      if (daysBetween > 0) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBetween = formatISO9075(
            addDays(parseISO(date), i)
          ).split(' ')[0];
          dataWithoutGaps.push({
            date: dateBetween,
            [xLabelKey]: 0,
          })
        }
      }
    }
  });

    return (
        <div>
            <ResponsiveContainer width="100%" height={200}>
            <LineChart width={730} height={250} data={dataWithoutGaps}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid horizontal={false} strokeWidth="2" stroke="#f5f5f5" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill:'#aaa'}} axisLine={false} tickLine={false} tickMargin={10} />
            <YAxis tick={{ fontSize: 12, fill:'#aaa'}} axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip />
            <Line type="monotone" dataKey={xLabelKey} stroke="#09f" strokeWidth="3" />
            </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
