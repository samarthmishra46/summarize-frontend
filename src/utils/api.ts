import { SummaryResponse } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Or your deployed backend URL

export const summarizeVideo = async (videoUrl: string): Promise<SummaryResponse> => {
  try {
    console.log("📤 Sending video URL to backend:", videoUrl);

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: videoUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Unknown server error');
    }

    return {
      summary: data.response,
      videoTitle: "Summary Generated",
      videoUrl,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("❌ Error fetching summary:", error.message);
    throw error;
  }
  console.log("getting video URL to backend:", videoUrl);

};
