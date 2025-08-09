export async function fetchUserProgress(userId, accessToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-progress/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      })
  
      if (!res.ok) {
        throw new Error("Failed to fetch user progress")
      }
  
      const data = await res.json()
      console.log(data)
      return data.data ?? []
    } catch (error) {
      console.error("fetchUserProgress error:", error)
      return []
    }
  }
  