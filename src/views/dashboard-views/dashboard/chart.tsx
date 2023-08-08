import React, { useEffect, useState } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import UserService from 'services/UserService';
import { useLoading } from 'hooks/useLoading';
import AlertInfo from 'components/Dashboard/AlertInfo';

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
  message: number;
}

const defaultChartData =[
  {
    "id": 6,
    "text": "",
    "status": 1,
    "transporter": "SMS",
    "created_at": "2023-12-29T12:42:34.000Z",
    "updated_at": "2023-08-02T11:56:17.868Z",
    "deleted_at": null
  }
];

const ChatSummaryChart: React.FC = () => {
  const [chatSummary, setChatSummary] = useState<ChatSummaryData[]>(defaultChartData);
  const [loading, withLoading] = useLoading();

  const getChatSummary = async () => {
    try {
      const summary = await withLoading(UserService.getUserChatSummary());
      console.log(summary?.length)
      setChatSummary(summary?.length > 0 ? summary : defaultChartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatSummary();
  }, []);

  const dataByYearMonth: Record<string, GroupedData> = chatSummary.reduce((acc, message) => {
    const createdAt = new Date(message.created_at);
    const yearMonth = `${createdAt.getFullYear()}-${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2023, createdAt.getMonth(), 1))}`;
    
    if (!acc[yearMonth]) {
      acc[yearMonth] = {
        yearMonth,
        message: 1,
      };
    } else {
      acc[yearMonth].message += 1;
    }
    
    return acc;
  }, {} as Record<string, GroupedData>); // Provide initial type for acc
  
  const chartData: GroupedData[] = Object.values(dataByYearMonth);

  return (
    <div className="p-5 cart-container">
      <div className="row">
        <div className="col-md-8">
          <div className="bg-white">
            {
              loading && <h6 className="text-center p-5">Loading chart ...</h6>
            }
            {
              !loading &&
              <LineChart width={700} height={500} data={chartData} margin={{ top: 40, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="yearMonth" tick={{ fontSize: 12 }} />              
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', fontSize: 12 }} />
                <Legend />
                <Line type="monotone" dataKey="message" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8', r: 5 }} />
              </LineChart>
            }
          </div>
        </div>
        <div className="col-md-4">
          <AlertInfo />
        </div>
      </div>
    </div>
  );
};

export default ChatSummaryChart;
