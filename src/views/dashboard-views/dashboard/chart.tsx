import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import UserService from 'services/UserService';
import { useLoading } from 'hooks/useLoading';

interface ChatSummaryData {
  id: number;
  text: string;
  status: number;
  transporter: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface GroupedData {
  yearMonth: string;
  date: number;
}

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ChatSummaryChart: React.FC = () => {
  const [chatSummary, setChatSummary] = useState<ChatSummaryData[]>([]);
  const [loading, withLoading] = useLoading();

  const getChatSummary = async () => {
    try {
      const summary = await withLoading(UserService.getUserChatSummary());
      setChatSummary(summary);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatSummary();
  }, []);

  const dataByYearMonth: Record<string, GroupedData> = chatSummary.reduce((acc, message) => {
    const createdAt = new Date(message.created_at);
    const yearMonth = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
    
    if (!acc[yearMonth]) {
      acc[yearMonth] = {
        yearMonth,
        date: 1,
      };
    } else {
      acc[yearMonth].date += 1;
    }
    
    return acc;
  }, {} as Record<string, GroupedData>); // Provide initial type for acc
  
  const chartData: GroupedData[] = Object.values(dataByYearMonth);

  return (
    <div className="cart-container p-5">
      <div className="row">
        <div className="col-md-8">
          <div className="bg-white">
            <LineChart width={700} height={500} data={chartData} margin={{ top: 40, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearMonth" tick={{ fontSize: 12 }} tickFormatter={(value) => {
                const [year, month] = value.split('-');
                return `${monthNames[parseInt(month) - 1]} ${year}`;
              }} />              
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', fontSize: 12 }} />
              <Legend />
              <Line type="monotone" dataKey="date" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8', r: 5 }} />
            </LineChart>
          </div>
        </div>
        <div className="col-md-4">
          <div className="alert alert-info">
            This is an effort which was created in order to bridge the existing 
            gap between the theory taught in the classroom and practice science, 
            Agriculture, Medicine, Engineering, Technology and other professional 
            programs in the Nigerian tertiary institutions. This program is aimed at 
            exposing the students to the use of various machines and equipment, 
            professional work methods and ways of safe-guarding the work areas in 
            industries as well as other organizations and parastatals. 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSummaryChart;
