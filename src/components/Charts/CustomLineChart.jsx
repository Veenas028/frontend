import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Dot,
} from 'recharts';

const CustomLineChart = ({ data }) => {
  // Alternate dot colors
  const getDotColor = (index) => (index % 2 === 0 ? '#875CF5' : '#cfbefb');

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.month}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{' '}
            <span className="text-sm font-medium text-gray-900">
              ${payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom dot
  const renderCustomDot = (props) => {
    const { cx, cy, index } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={getDotColor(index)}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#875CF5"
            strokeWidth={2}
            dot={renderCustomDot}
            activeDot={{ r: 6, fill: 'yellow', stroke: '#875CF5', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
