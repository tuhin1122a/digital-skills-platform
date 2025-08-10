// utils/fetchRecentActivity.ts
export async function fetchRecentActivity(userId: string, token: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-activity/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // যদি তোমার API token auth নেয়
        },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch recent activity: ${res.statusText}`);
      }
  
      const data = await res.json();
  
      if (!data.success) {
        throw new Error(data.message || "Failed to load recent activity");
      }
  
      return data.data; // recent activity array
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      return [];
    }
  }
  